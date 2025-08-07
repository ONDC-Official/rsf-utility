import dotenv from "dotenv";
dotenv.config();

const config = {
	JWT_SECRET: process.env.JWT_SECRET || "test-token-secret",
	CLIENT_ID: process.env.CLIENT_ID || "test-client",
};

export default config;
