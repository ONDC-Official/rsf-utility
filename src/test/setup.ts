import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load the default .env file
dotenv.config({ path: ".env.test" });

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const mongoUri = mongoServer.getUri();
	await mongoose.connect(mongoUri);
});

afterAll(async () => {
	await mongoose.disconnect();
	await mongoServer.stop();
});

afterEach(async () => {
	// Clean up database between tests
	// const collections = mongoose.connection.collections;
	// for (const key in collections) {
	// 	await collections[key].deleteMany({});
	// }
});

// // Mock logger to prevent console spam during tests
jest.mock("../utils/logger", () => ({
	info: jest.fn(),
	error: jest.fn(),
	debug: jest.fn(),
	warning: jest.fn(),
	child: jest.fn().mockReturnThis(),
}));
