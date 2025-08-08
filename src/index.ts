import config from "./config/server-config";
import createServer from "./server";
import mongoose from "mongoose";
import connectDB from "./db";
import logger from "./utils/logger";
import { validateEnv } from "./utils/validate-env";

validateEnv(process.env);
const app = createServer();

const server = app.listen(config.port, async () => {
	logger.info("Connecting to DB....");
	await connectDB();
	logger.info(
		`Server running on port ${config.port} in ${config.environment} mode`,
	);
	logger.warning(
		"For more information, visit the API documentation at /api-docs",
	);
});

const shutdown = async (exitCode: number, err?: Error) => {
	if (err) {
		logger.error(`Fatal error: ${err.message}`);
		logger.error(err.stack || "");
	}

	logger.info("Shutdown signal received: closing HTTP server");

	server.close(async () => {
		try {
			await mongoose.connection.close();
			logger.info("MongoDB connection closed");
		} catch (dbErr) {
			logger.error("Error closing MongoDB:", dbErr);
		}

		logger.info("HTTP server closed!");
		process.exit(exitCode);
	});
};

// ---- Graceful shutdown signals ----
process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));

// ---- Fatal error handlers ----
process.on("uncaughtException", (err) => {
	shutdown(1, err);
});

process.on("unhandledRejection", (reason: any) => {
	const error = reason instanceof Error ? reason : new Error(String(reason));
	shutdown(1, error);
});
