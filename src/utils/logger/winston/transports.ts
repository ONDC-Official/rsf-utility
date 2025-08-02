import winston, { transports } from "winston";
import { devFormat, lokiFormat as jsonFormat } from "./format";

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
			})
		);
	} else {
		loggerTransports.push(new transports.Console({ format: devFormat }));
		loggerTransports.push(
			new transports.File({
				filename: "logs/development.log",
				format: jsonFormat,
			})
		);
	}
	return loggerTransports;
}
