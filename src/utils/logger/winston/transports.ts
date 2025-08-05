import winston, { transports } from "winston";
import { devFormat, lokiFormat as jsonFormat } from "./format";
import DailyRotateFile from "winston-daily-rotate-file";
import LokiTransport from "winston-loki";

export default function getLoggerTransports(): winston.transport[] {
	// Determine the environment
	const isProduction = process.env.NODE_ENV === "production";

	// Create transports based on the environment
	const loggerTransports: winston.transport[] = [];

	if (isProduction) {
		loggerTransports.push(new transports.Console({ format: jsonFormat }));
		loggerTransports.push(
			new transports.File({
				filename: "logs/combined.log",
				format: jsonFormat,
			}),
		);
		loggerTransports.push(
			new LokiTransport({
				// URL of your Grafana Loki instance
				host: process.env.LOKI_HOST || "http://localhost:3100",
				// Crucial: Send logs as JSON for parsing
				json: true,
				// Format must also be JSON
				// format: winston.format.json(),
				format: jsonFormat,
				// Replace the timestamp to ensure Loki accepts it
				replaceTimestamp: true,
				onConnectionError: (err) =>
					console.error("Error connecting to Loki:", err),
			}),
		);
	} else {
		loggerTransports.push(new transports.Console({ format: devFormat }));
		loggerTransports.push(
			new DailyRotateFile({
				filename: "logs/development-%DATE%.log",
				datePattern: "YYYY-MM-DD",
				zippedArchive: false,
				maxFiles: "1d", // Keep only the last 1 days' files
				format: jsonFormat,
			}),
		);
	}
	return loggerTransports;
}
