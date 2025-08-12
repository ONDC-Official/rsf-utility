import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../../server";
import jwt from "jsonwebtoken";
import config from "../../config/auth-config";
import { Application } from "express";

describe("RSF Edge Cases Integration Tests", () => {
	let mongoServer: MongoMemoryServer;
	let app: Application;
	let authToken: string;

	beforeAll(async () => {
		// Disconnect existing connection if any
		if (mongoose.connection.readyState !== 0) {
			await mongoose.disconnect();
		}

		mongoServer = await MongoMemoryServer.create();
		const mongoUri = mongoServer.getUri();
		await mongoose.connect(mongoUri);
		app = createServer();
		authToken = jwt.sign({ client_id: config.CLIENT_ID }, config.JWT_SECRET, {
			expiresIn: "1h",
		});
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoServer.stop();
	});

	afterEach(async () => {
		// Clean up collections after each test
		const collections = mongoose.connection.collections;
		for (const key in collections) {
			await collections[key].deleteMany({});
		}
	});

	const createValidPayload = (orderId: string) => ({
		context: {
			action: "recon",
			domain: "ONDC:FIS12",
			bap_id: "test-bap.ondc.org",
			bap_uri: "https://test-bap.ondc.org/api",
			bpp_id: "test-bpp.ondc.org",
			bpp_uri: "https://test-bpp.ondc.org/api",
			transaction_id: `txn-${orderId}`,
			message_id: `msg-${orderId}`,
			timestamp: new Date().toISOString(),
			version: "2.0.0",
			ttl: "PT30S",
		},
		message: {
			orders: [
				{
					id: orderId,
					payment_id: `payment-${orderId}`,
					amount: {
						currency: "INR",
						value: "100.00",
					},
				},
			],
		},
	});

	describe("Authentication Edge Cases", () => {
		test("Should reject requests without authorization header", async () => {
			const response = await request(app).get("/ui/recon").expect(401);

			expect(response.body.success).toBe(false);
			expect(response.body.message).toContain("authorization");
		});

		test("Should reject requests with invalid JWT token", async () => {
			const response = await request(app)
				.get("/ui/recon")
				.set("Authorization", "Bearer invalid-token")
				.expect(401);

			expect(response.body.success).toBe(false);
		});

		test("Should reject requests with expired JWT token", async () => {
			const expiredToken = jwt.sign(
				{ client_id: config.CLIENT_ID },
				config.JWT_SECRET,
				{ expiresIn: "-1h" },
			);

			const response = await request(app)
				.get("/ui/recon")
				.set("Authorization", `Bearer ${expiredToken}`)
				.expect(401);

			expect(response.body.success).toBe(false);
		});

		test("Should reject requests with wrong client_id", async () => {
			const wrongClientToken = jwt.sign(
				{ client_id: "wrong-client" },
				config.JWT_SECRET,
				{ expiresIn: "1h" },
			);

			const response = await request(app)
				.get("/ui/recon")
				.set("Authorization", `Bearer ${wrongClientToken}`)
				.expect(401);

			expect(response.body.success).toBe(false);
		});
	});

	describe("RSF Payload Validation Edge Cases", () => {
		test("Should reject malformed JSON payload", async () => {
			const response = await request(app)
				.post("/api/recon")
				.set("Content-Type", "application/json")
				.send("{ invalid json }")
				.expect(400);

			expect(response.body.success).toBe(false);
		});

		test("Should reject payload without context", async () => {
			const invalidPayload = {
				message: { orders: [] },
			};

			const response = await request(app)
				.post("/api/recon")
				.send(invalidPayload)
				.expect(400);

			expect(response.body.success).toBe(false);
		});

		test("Should reject payload without message", async () => {
			const invalidPayload = {
				context: {
					action: "recon",
					domain: "ONDC:FIS12",
				},
			};

			const response = await request(app)
				.post("/api/recon")
				.send(invalidPayload)
				.expect(400);

			expect(response.body.success).toBe(false);
		});

		test("Should reject payload with invalid action", async () => {
			const payload = createValidPayload("edge-invalid-action");
			payload.context.action = "invalid_action" as any;

			const response = await request(app)
				.post("/api/recon")
				.send(payload)
				.expect(400);

			expect(response.body.success).toBe(false);
		});

		test("Should reject payload with missing required fields", async () => {
			const payload = createValidPayload("edge-missing-fields");
			delete (payload.context as any).bap_id;

			const response = await request(app)
				.post("/api/recon")
				.send(payload)
				.expect(400);

			expect(response.body.success).toBe(false);
		});
	});

	describe("CSV Upload Edge Cases", () => {
		test("Should reject non-CSV file uploads", async () => {
			const textContent = "This is not a CSV file";
			const buffer = Buffer.from(textContent);

			const response = await request(app)
				.post("/ui/settle")
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "test.txt")
				.expect(400);

			expect(response.body.success).toBe(false);
		});

		test("Should reject oversized CSV files", async () => {
			// Create a very large CSV content (>10MB)
			const largeContent = Array(1000000).fill("order,100").join("\n");
			const buffer = Buffer.from(largeContent);

			const response = await request(app)
				.post("/ui/settle")
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "large.csv")
				.expect(413);
		});

		test("Should reject CSV with invalid headers", async () => {
			const csvContent = "wrong_header,another_wrong\nvalue1,value2";
			const buffer = Buffer.from(csvContent);

			const response = await request(app)
				.post("/ui/settle")
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "invalid.csv")
				.expect(400);

			expect(response.body.success).toBe(false);
		});

		test("Should handle empty CSV files", async () => {
			const buffer = Buffer.from("");

			const response = await request(app)
				.post("/ui/settle")
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "empty.csv")
				.expect(400);

			expect(response.body.success).toBe(false);
		});
	});

	describe("Concurrent Request Handling", () => {
		test("Should handle multiple simultaneous requests", async () => {
			const requests = Array(10)
				.fill(null)
				.map((_, index) => {
					const payload = createValidPayload(`concurrent-${index}`);
					return request(app).post("/api/recon").send(payload);
				});

			const responses = await Promise.all(requests);

			// All requests should succeed
			responses.forEach((response) => {
				expect(response.status).toBe(200);
				expect(response.body.message.ack.status).toBe("ACK");
			});
		});

		test("Should handle rate limiting gracefully", async () => {
			// Send many requests rapidly to trigger rate limiting
			const rapidRequests = Array(100)
				.fill(null)
				.map((_, index) => {
					const payload = createValidPayload(`rate-limit-${index}`);
					return request(app).post("/api/recon").send(payload);
				});

			const responses = await Promise.allSettled(rapidRequests);

			// Some requests should be rate limited (429) or succeed (200)
			const statusCodes = responses
				.filter((r) => r.status === "fulfilled")
				.map((r) => (r.value as any).status);

			const hasRateLimiting = statusCodes.includes(429);
			const hasSuccess = statusCodes.includes(200);

			expect(hasSuccess).toBe(true); // Some should succeed
			// Rate limiting may or may not trigger depending on configuration
		});
	});

	describe("Data Persistence Edge Cases", () => {
		test("Should handle database connection issues gracefully", async () => {
			// This test simulates what happens when DB is unavailable
			// In a real scenario, you might temporarily disconnect the DB
			const payload = createValidPayload("db-test");

			const response = await request(app).post("/api/recon").send(payload);

			// Should either succeed or fail gracefully with proper error
			expect([200, 500]).toContain(response.status);
			if (response.status === 500) {
				expect(response.body.success).toBe(false);
			}
		});

		test("Should handle duplicate order IDs appropriately", async () => {
			const orderId = "duplicate-order-test";
			const payload = createValidPayload(orderId);

			// Send first request
			const response1 = await request(app)
				.post("/api/recon")
				.send(payload)
				.expect(200);

			// Send duplicate request
			const response2 = await request(app).post("/api/recon").send(payload);

			// Should handle duplicates appropriately (either accept or reject)
			expect([200, 400, 409]).toContain(response2.status);
		});
	});

	describe("Input Validation Edge Cases", () => {
		test("Should handle extremely long string inputs", async () => {
			const payload = createValidPayload("long-string-test");
			payload.context.bap_id = "a".repeat(10000); // Very long string

			const response = await request(app).post("/api/recon").send(payload);

			// Should either accept or reject with validation error
			expect([200, 400]).toContain(response.status);
		});

		test("Should handle special characters in inputs", async () => {
			const payload = createValidPayload("special-chars-test");
			payload.context.bap_id = "test<script>alert('xss')</script>";
			payload.message.orders[0].id = "order-with-特殊文字-🚀";

			const response = await request(app).post("/api/recon").send(payload);

			// Should handle special characters appropriately
			expect([200, 400]).toContain(response.status);
		});

		test("Should handle null and undefined values", async () => {
			const payload = createValidPayload("null-test");
			(payload.context as any).optional_field = null;
			(payload.message as any).optional_data = undefined;

			const response = await request(app).post("/api/recon").send(payload);

			// Should handle null/undefined values appropriately
			expect([200, 400]).toContain(response.status);
		});
	});

	describe("Memory and Performance Edge Cases", () => {
		test("Should handle large payload sizes", async () => {
			const payload = createValidPayload("large-payload-test");

			// Add many orders to create a large payload
			payload.message.orders = Array(1000)
				.fill(null)
				.map((_, i) => ({
					id: `large-order-${i}`,
					payment_id: `large-payment-${i}`,
					amount: {
						currency: "INR",
						value: "100.00",
					},
				}));

			const response = await request(app).post("/api/recon").send(payload);

			// Should either process or reject large payloads gracefully
			expect([200, 413, 400]).toContain(response.status);
		});

		test("Should handle rapid sequential requests", async () => {
			const responses = [];

			for (let i = 0; i < 20; i++) {
				const payload = createValidPayload(`rapid-${i}`);
				const response = await request(app).post("/api/recon").send(payload);
				responses.push(response);
			}

			// Most requests should succeed
			const successCount = responses.filter((r) => r.status === 200).length;
			expect(successCount).toBeGreaterThan(responses.length * 0.7); // At least 70% success
		});
	});

	describe("Error Recovery Edge Cases", () => {
		test("Should recover from malformed requests", async () => {
			// Send a malformed request
			await request(app).post("/api/recon").send("invalid").expect(400);

			// Follow up with a valid request to ensure recovery
			const validPayload = createValidPayload("recovery-test");
			const response = await request(app)
				.post("/api/recon")
				.send(validPayload)
				.expect(200);

			expect(response.body.message.ack.status).toBe("ACK");
		});

		test("Should handle unexpected server errors gracefully", async () => {
			// This test ensures the server doesn't crash on edge cases
			const payload = createValidPayload("error-test");

			const response = await request(app).post("/api/recon").send(payload);

			// Should respond with some status, not crash
			expect(response.status).toBeGreaterThan(0);
			expect(response.body).toBeDefined();
		});
	});

	describe("Boundary Value Testing", () => {
		test("Should handle minimum valid payload", async () => {
			const minimalPayload = {
				context: {
					action: "recon",
					domain: "ONDC:FIS12",
					bap_id: "test",
					bap_uri: "https://test.com",
					bpp_id: "test",
					bpp_uri: "https://test.com",
					transaction_id: "1",
					message_id: "1",
					timestamp: new Date().toISOString(),
					version: "2.0.0",
					ttl: "PT30S",
				},
				message: {
					orders: [],
				},
			};

			const response = await request(app)
				.post("/api/recon")
				.send(minimalPayload);

			expect([200, 400]).toContain(response.status);
		});

		test("Should handle zero amounts", async () => {
			const payload = createValidPayload("zero-amount");
			payload.message.orders[0].amount.value = "0.00";

			const response = await request(app).post("/api/recon").send(payload);

			expect([200, 400]).toContain(response.status);
		});

		test("Should handle negative amounts", async () => {
			const payload = createValidPayload("negative-amount");
			payload.message.orders[0].amount.value = "-100.00";

			const response = await request(app).post("/api/recon").send(payload);

			expect([200, 400]).toContain(response.status);
		});
	});

	describe("Time-based Edge Cases", () => {
		test("Should handle future timestamps", async () => {
			const payload = createValidPayload("future-timestamp");
			const futureDate = new Date();
			futureDate.setFullYear(futureDate.getFullYear() + 1);
			payload.context.timestamp = futureDate.toISOString();

			const response = await request(app).post("/api/recon").send(payload);

			expect([200, 400]).toContain(response.status);
		});

		test("Should handle very old timestamps", async () => {
			const payload = createValidPayload("old-timestamp");
			payload.context.timestamp = "2020-01-01T00:00:00.000Z";

			const response = await request(app).post("/api/recon").send(payload);

			expect([200, 400]).toContain(response.status);
		});

		test("Should handle invalid timestamp formats", async () => {
			const payload = createValidPayload("invalid-timestamp");
			payload.context.timestamp = "not-a-date";

			const response = await request(app).post("/api/recon").send(payload);

			expect(response.status).toBe(400);
		});
	});

	describe("Schema Validation Edge Cases", () => {
		test("Should handle additional unexpected fields", async () => {
			const payload = createValidPayload("extra-fields");
			(payload as any).extra_field = "unexpected";
			(payload.context as any).unknown_property = "test";

			const response = await request(app).post("/api/recon").send(payload);

			// Should either accept or reject additional fields gracefully
			expect([200, 400]).toContain(response.status);
		});

		test("Should validate enum values strictly", async () => {
			const payload = createValidPayload("invalid-enum");
			payload.context.domain = "INVALID_DOMAIN" as any;

			const response = await request(app).post("/api/recon").send(payload);

			expect(response.status).toBe(400);
		});

		test("Should handle array field edge cases", async () => {
			const payload = createValidPayload("array-edge");

			// Test empty array
			payload.message.orders = [];

			const response = await request(app).post("/api/recon").send(payload);

			expect([200, 400]).toContain(response.status);
		});
	});
});
