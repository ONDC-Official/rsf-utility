import os from "os";
import fs from "fs";
import { promisify } from "util";
import promClient from "prom-client";
import logger from "./logger";
import mongoose, { mongo } from "mongoose";

const readFile = promisify(fs.readFile);

export const systemCpuUsage = new promClient.Gauge({
	name: "system_cpu_usage_percent",
	help: "System CPU usage percentage",
});

export const systemMemoryUsage = new promClient.Gauge({
	name: "system_memory_usage_percent",
	help: "System memory usage percentage",
});

export const systemDiskUsage = new promClient.Gauge({
	name: "system_disk_usage_percent",
	help: "System disk usage percentage",
	labelNames: ["mount_point"],
});

export const networkConnections = new promClient.Gauge({
	name: "network_connections_total",
	help: "Total number of network connections",
	labelNames: ["state"],
});

export const dbHealthStatus = new promClient.Gauge({
	name: "db_health_status",
	help: "Database health status (1 = up, 0 = down)",
});

export const dbLatencyGauge = new promClient.Gauge({
	name: "db_response_time_ms",
	help: "Database response time in milliseconds",
});

export class HealthMonitor {
	private monitoringInterval: NodeJS.Timeout | null = null;

	constructor() {
		this.startMonitoring();
	}

	private async getCPUUsage(): Promise<number> {
		const cpus = os.cpus();
		let totalIdle = 0;
		let totalTick = 0;

		cpus.forEach((cpu) => {
			for (const type in cpu.times) {
				totalTick += cpu.times[type as keyof typeof cpu.times];
			}
			totalIdle += cpu.times.idle;
		});

		return ((totalTick - totalIdle) / totalTick) * 100;
	}

	private getMemoryUsage(): number {
		const totalMem = os.totalmem();
		const freeMem = os.freemem();
		return ((totalMem - freeMem) / totalMem) * 100;
	}

	// private async getDiskUsage(): Promise<{ [mountPoint: string]: number }> {
	// 	try {
	// 		const { execSync } = require("child_process");
	// 		const output = execSync("df -h").toString();
	// 		const lines = output.split("\n").slice(1);
	// 		const diskUsage: { [mountPoint: string]: number } = {};

	// 		lines.forEach((line: string) => {
	// 			const parts = line.split(/\s+/);
	// 			if (parts.length >= 6) {
	// 				const mountPoint = parts[5];
	// 				//@ts-ignore
	// 				const usagePercent = parseInt(parts[4].replace("%", ""));
	// 				if (!isNaN(usagePercent) && mountPoint.startsWith("/")) {
	// 					diskUsage[mountPoint] = usagePercent;
	// 				}
	// 			}
	// 		});

	// 		return diskUsage;
	// 	} catch (error) {
	// 		logger.error("Failed to get disk usage", { error });
	// 		return {};
	// 	}
	// }

	private async collectMetrics(): Promise<void> {
		try {
			const cpuUsage = await this.getCPUUsage();
			const memoryUsage = this.getMemoryUsage();
			// const diskUsage = await this.getDiskUsage();

			systemCpuUsage.set(cpuUsage);
			systemMemoryUsage.set(memoryUsage);

			// Object.entries(diskUsage).forEach(([mountPoint, usage]) => {
			// 	systemDiskUsage.set({ mount_point: mountPoint }, usage);
			// });

			// ✅ MongoDB health check
			try {
				const mongoCondition = this.checkMongoHealth();
				logger.debug(`MongoDB health status: ${mongoCondition}`);
				dbHealthStatus.set(mongoCondition === "Connected" ? 1 : 0);
			} catch (dbError: any) {
				dbHealthStatus.set(0);
				dbLatencyGauge.set(0);
				logger.error("MongoDB health check failed", {
					error: dbError?.message,
					stack: dbError?.stack,
				});
			}

			logger.debug("Health metrics collected", {
				cpu: cpuUsage.toFixed(2),
				memory: memoryUsage.toFixed(2),
			});
		} catch (error) {
			logger.error("Failed to collect health metrics", {}, error);
		}
	}

	public checkMongoHealth() {
		const state = mongoose.connection.readyState;

		switch (state) {
			case 0:
				return "Disconnected";
			case 1:
				return "Connected";
			case 2:
				return "Connecting";
			case 3:
				return "Disconnecting";
			default:
				return "Unknown";
		}
	}

	public startMonitoring(intervalMs: number = 30000): void {
		if (this.monitoringInterval) {
			clearInterval(this.monitoringInterval);
		}

		this.monitoringInterval = setInterval(() => {
			this.collectMetrics();
		}, intervalMs);

		this.collectMetrics();
		logger.info("Health monitoring started", { intervalMs });
	}

	public stopMonitoring(): void {
		if (this.monitoringInterval) {
			clearInterval(this.monitoringInterval);
			this.monitoringInterval = null;
			logger.info("Health monitoring stopped");
		}
	}

	public async getHealthStatus(): Promise<any> {
		const dbValue = (await dbHealthStatus.get()).values?.[0]?.value;
		const dbLatency = (await dbLatencyGauge.get()).values?.[0]?.value;

		return {
			status: dbValue === 1 ? "ok" : "error",
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
			environment: process.env.NODE_ENV || "development",
			cpu: await this.getCPUUsage(),
			memory: process.memoryUsage(),
			db: {
				healthy: dbValue === 1,
				latencyMs: dbLatency ?? null,
			},
		};
	}
}

export const healthMonitor = new HealthMonitor();
