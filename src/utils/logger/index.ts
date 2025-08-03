import "dotenv/config";
import clc from "cli-color";
import { isAxiosError } from "axios";
import { createLogger } from "./winston/logger";
import winston from "winston";
import { correlationIdMiddleware } from "./middleware/correlation-middleware";
import { console } from "inspector";

class AutomationLogger {
	private static instance: AutomationLogger | undefined;
	public logger: winston.Logger;
	loggingColors: {
		info: string;
		error: string;
		debug: string;
		warning: string;
	} = {
		info: clc.green("[INFO]"),
		error: clc.red("[ERROR]"),
		debug: clc.blue("[DEBUG]"),
		warning: clc.yellow("[WARNING]"),
	};
	constructor() {
		console.log("Initializing AutomationLogger...");
		AutomationLogger.instance = this;
		if (!process.env.SERVICE_NAME) {
			console.warn(
				"SERVICE_NAME environment variable is not set. Defaulting to 'default-service'. This may lead to confusion in log aggregation. \n"
			);
		}
		if (!process.env.LOG_LEVEL) {
			console.warn(
				"LOG_LEVEL environment variable is not set. Defaulting to 'info'. This may lead to missing debug logs. \n"
			);
		}
		if (!process.env.NODE_ENV) {
			throw new Error(
				"NODE_ENV environment variable is not set. This is required to determine the logging environment. \n"
			);
		}
		if (process.env.NODE_ENV !== "production") {
			console.warn(
				"Running in non-production environment. Logs may not be sent to Grafana Loki. \n"
			);
		}
		this.logger = createLogger({
			serviceName: process.env.SERVICE_NAME || "main-service",
		});
	}
	static getInstance(): AutomationLogger {
		if (!AutomationLogger.instance) {
			AutomationLogger.instance = new AutomationLogger();
		}
		AutomationLogger.instance.logger.info("AutomationLogger instance created");
		return AutomationLogger.instance;
	}

	/**
	 * Recursively removes keys containing 'private_key' or 'privateKey' from an object.
	 * This method is case-insensitive.
	 * @param obj The object to sanitize.
	 * @returns A new object with sensitive keys removed.
	 */
	private _sanitizeObject(obj: any): any {
		if (obj === null || typeof obj !== "object") {
			return obj;
		}

		if (Array.isArray(obj)) {
			return obj.map((item) => this._sanitizeObject(item));
		}

		const sanitizedObj: { [key: string]: any } = {};
		for (const key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				const lowerCaseKey = key.toLowerCase();
				if (
					lowerCaseKey.includes("private_key") ||
					lowerCaseKey.includes("privatekey")
				) {
					continue; // Skip sensitive key
				}
				sanitizedObj[key] = this._sanitizeObject(obj[key]);
			}
		}
		return sanitizedObj;
	}

	info(message: string, ...args: any[]) {
		const sanitizedArgs = args.map((arg) => this._sanitizeObject(arg));

		const processedArgs = sanitizedArgs.map((arg, index) => {
			if (typeof arg === "string") {
				return { [`message_${index + 2}`]: arg };
			}
			return arg;
		});
		message = this.getFormattedMessage(message, "info", ...processedArgs);
		this.logger.info(message, ...processedArgs);
	}

	error(message: string, meta?: any, error?: unknown) {
		// Use original meta to find correlationId before it's sanitized
		message = this.getFormattedMessage(message, "error", meta);
		let logObject: any = { ...meta };

		if (isAxiosError(error)) {
			logObject = {
				...logObject,
				stack: error.stack,
				axios_error: {
					code: error.code,
					request: {
						method: error.config?.method,
						url: error.config?.url,
					},
					response: {
						status: error.response?.status,
						statusText: error.response?.statusText,
						data: error.response?.data,
					},
				},
			};
		} else if (error instanceof Error) {
			logObject = {
				...logObject,
				error: error.message,
				stack: error.stack,
			};
		} else if (error !== undefined && error !== null) {
			logObject = {
				...logObject,
				error,
			};
		}

		// Sanitize the final constructed object before logging
		const sanitizedLogObject = this._sanitizeObject(logObject);

		this.logger.error(message, sanitizedLogObject);
	}

	debug(message: string, ...args: any[]) {
		const sanitizedArgs = args.map((arg) => this._sanitizeObject(arg));

		const processedArgs = sanitizedArgs.map((arg, index) => {
			if (typeof arg === "string") {
				return { [`debug_${index + 1}`]: arg };
			}
			return arg;
		});
		message = this.getFormattedMessage(message, "debug", ...processedArgs);
		this.logger.debug(message, ...processedArgs);
	}

	warning(message: string, ...args: any[]) {
		const sanitizedArgs = args.map((arg) => this._sanitizeObject(arg));

		const processedArgs = sanitizedArgs.map((arg, index) => {
			if (typeof arg === "string") {
				return { [`warning_${index + 1}`]: arg };
			}
			return arg;
		});
		message = this.getFormattedMessage(message, "warning", ...processedArgs);
		this.logger.warn(message, ...processedArgs);
	}

	child(scope: string, meta?: any): AutomationLogger {
		// Sanitize metadata before attaching it to the child logger
		const sanitizedMeta = this._sanitizeObject(meta);

		const winstonChild = this.logger.child({ scope: scope, ...sanitizedMeta });
		const childLogger = Object.create(this);
		childLogger.logger = winstonChild;
		return childLogger;
	}

	startTimer(): winston.Profiler {
		return this.logger.startTimer();
	}

	getCorrelationIdMiddleware() {
		return correlationIdMiddleware;
	}

	getFormattedMessage(
		message: string,
		level: "info" | "error" | "debug" | "warning",
		...args: any[]
	): string {
		let correlationId =
			args
				.filter((a) => a)
				.find((arg) => typeof arg === "object" && arg?.correlationId)
				?.correlationId || undefined;
		if (typeof correlationId === "string") {
			correlationId = clc.magenta(`[C-ID: ${correlationId}]`);
		}
		message = `${this.loggingColors[level]} ${
			correlationId ? `${correlationId}` : ""
		} ${message}`;
		return message;
	}
}

export default AutomationLogger.getInstance();
