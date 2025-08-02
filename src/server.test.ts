// tests/createServer.test.ts
import request from "supertest";
import { Application } from "express";
import createServer from "./server";
import { Request, Response } from "express";
// Mock dependencies to isolate the server setup logic for this test
jest.mock("./routes/api-routes", () => {
	const express = require("express");
	const router = express.Router();
	router.get("/test-route", (req: Request, res: Response) =>
		res.status(200).send("API Route OK")
	);
	return router;
});

jest.mock("./utils/health-monitor", () => ({
	healthMonitor: {
		getHealthStatus: jest.fn().mockResolvedValue({ db: "connected" }),
	},
}));

describe("Server Creation", () => {
	let app: Application;

	beforeAll(() => {
		// Create the server instance once for all tests in this suite
		app = createServer();
	});

	// Test 1: Health Check Endpoint
	describe("GET /health", () => {
		it("should return a 200 status and a health status object", async () => {
			const response = await request(app).get("/health");

			expect(response.status).toBe(200);
			expect(response.body.status).toBe("ok");
			expect(response.body.db).toBe("connected"); // From our mock
		});
	});

	// Test 2: Route Mounting
	describe("Route Mounting", () => {
		it("should mount apiRoutes under /api", async () => {
			const response = await request(app).get("/api/test-route");

			expect(response.status).toBe(200);
			expect(response.text).toBe("API Route OK");
		});

		it("should return 404 for routes that are not defined", async () => {
			const response = await request(app).get("/non-existent-route");

			expect(response.status).toBe(404);
		});
	});

	// Test 3: Swagger Documentation
	describe("GET /api-docs", () => {
		it("should return swagger UI page", async () => {
			const response = await request(app).get("/api-docs/");

			// Swagger UI redirects, so we expect a 301
			expect(response.status).toBe(301);
		});
	});

	// Test 4: Error Handling Middleware
	describe("Error Handling", () => {
		it("should use the error handling middleware for errors", async () => {
			// To test the global error handler, we inject a temporary route that throws an error.
			const tempApp = createServer();
			tempApp.get("/error", () => {
				throw new Error("A test error occurred");
			});

			const response = await request(tempApp).get("/error");

			expect(response.status).toBe(500);
			expect(response.text).toBe("INTERNAL SERVER ERROR");
		});
	});
});
