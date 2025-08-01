import config from "./config/server-config";

import createServer from "./server";
import mongoose from "mongoose";
import connectDB from "./db";
import logger from "./utility/logger";

const app = createServer();

const server = app.listen(config.port, async () => {
	logger.info("Connecting to DB")
	await connectDB();
	logger.info(
		`Server running on port ${config.port} in ${config.environment} mode`
	);
});
// Graceful Shutdown
process.on("SIGTERM", () => {
	logger.info("SIGTERM signal received: closing HTTP server");
	server.close(async () => {
		await mongoose.connection.close();
		logger.info("HTTP server closed");
		logger.info("MongoDB connection closed");
		process.exit(0); // Exit after closing server
	});
});
process.on("SIGINT", () => {
	logger.info("SIGINT signal received: closing HTTP server");
	server.close(async () => {
		await mongoose.connection.close();
		logger.info("HTTP server closed");
		logger.info("MongoDB connection closed");
		process.exit(0); // Exit after closing server
	});
});
