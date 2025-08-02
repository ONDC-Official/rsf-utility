import winston from "winston";
import { inspect } from "util";

// Destructure format from winston
const { combine, timestamp, printf, colorize, errors, splat, json } =
	winston.format;

// Define custom colors for log levels
const customColors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white",
};

winston.addColors(customColors);

/**
 * -----------------------------------------------------------------------
 * Development Logger Format
 * -----------------------------------------------------------------------
 * This format is designed for maximum readability during local development.
 * - Colorized output to quickly identify log levels.
 * - Timestamp for tracking when events occurred.
 * - Full stack traces for errors.
 * - Pretty-prints objects and arrays for easy inspection.
 */
export const devFormat = combine(
	colorize({ all: true }),
	timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
	splat(),
	errors({ stack: true }),
	printf((info) => {
		const { timestamp, level, message, stack, scope, ...meta } = info;
		const metaString = Object.entries(meta)
			.map(([key, value]) => {
				if (typeof value === "object") {
					return `${key}: ${inspect(value, { colors: true, depth: Infinity })}`;
				}
				return `${key}: ${value}`;
			})
			.join("\n");

		// Colorize the 'scope' key if present
		let scopeString = "";
		if (scope) {
			// Use ANSI escape code for cyan (36m) as a "cool" color
			scopeString = `\x1b[36mscope: ${scope}\x1b[0m\n`;
		}

		// Handle errors with stack traces
		if (stack) {
			return `----------\n${timestamp} ${message}\n${scopeString}${metaString}\n${stack}`;
		}

		return `----------\n${timestamp} ${message}\n${scopeString}${metaString}`;
	})
);

export const lokiFormat = combine(
	timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
	splat(),
	json(),
	errors({ stack: true })
);
