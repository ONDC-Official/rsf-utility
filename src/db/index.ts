import mongoose from "mongoose";
import config from "./config";
import logger from "../utility/logger";

const connectDB = async () => {
	try {
		await mongoose.connect(config.mongoURI);
		logger.info("MongoDB connected successfully");
	} catch (err) {
		logger.error("MongoDB connection failed:", err);
	}
};

export default connectDB;
