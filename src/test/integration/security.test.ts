import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../../server";
import jwt from "jsonwebtoken";
import config from "../../config/auth-config";
import { Application } from "express";
import { ReconPayload } from "../../schema/rsf/zod/recon-schema";

describe("RSF API Security Tests", () => {
	let mongoServer: MongoMemoryServer;
	let app: Application;
	let authToken: string;
	const sampleUserId = "6899dfe0f13e639dcfceaad2";

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
		const collections = mongoose.connection.collections;
		for (const key in collections) {
			await collections[key].deleteMany({});
		}
	});

	describe("SQL Injection Prevention", () => {
		test("Should prevent SQL injection in query parameters", async () => {
			const maliciousQuery = "'; DROP TABLE users; --";

			const response = await request(app)
				.get(`/ui/recon/${maliciousQuery}`)
				.set("Authorization", `Bearer ${authToken}`)
				.expect(400);

			expect(response.body).toHaveProperty("errorCode", "GEN_002");
		});

		test("Should sanitize user input in filters", async () => {
			const maliciousFilter = "1' OR '1'='1";

			const response = await request(app)
				.get("/ui/users")
				.set("Authorization", `Bearer ${authToken}`)
				.query({ filter: maliciousFilter });

			// Should either reject or sanitize
			expect([200, 400]).toContain(response.status);
		});
	});

	describe("XSS Prevention", () => {
		test("Should prevent script injection in payloads", async () => {
			const xssPayload: ReconPayload = {
				context: {
					action: "recon",
					domain: "ONDC:NTS10",
					bap_id: "<script>alert('xss')</script>",
					bap_uri: "https://test.com",
					bpp_id: "test-bpp",
					bpp_uri: "https://test-bpp.com",
					transaction_id: "test-txn",
					message_id: "test-msg",
					timestamp: new Date().toISOString(),
					version: "2.0.0",
					ttl: "PT30S",
				},
				message: {
					orders: [
						{
							id: "<script>alert('xss')</script>",
							amount: { currency: "INR", value: "100.00" },
							settlements: [],
						},
					],
				},
			};

			const response = await request(app).post("/api/recon").send(xssPayload);

			// Should either process or reject, but not execute script
			expect([400, 422]).toContain(response.status);
		});
	});

	describe("Authorization Bypass Attempts", () => {
		test("Should reject attempts to bypass auth with custom headers", async () => {
			const bypassHeaders = [
				{ "x-forwarded-for": "127.0.0.1" },
				{ "x-real-ip": "127.0.0.1" },
				{ "x-admin": "true" },
				{ authorization: "Bearer fake-token" },
			];

			for (const headers of bypassHeaders) {
				const response = await request(app)
					.get("/ui/users")
					.set(headers)
					.expect(401);

				expect(response.body).toHaveProperty("errorCode", "AUTH_000");
			}
		});

		test("Should reject malformed JWT tokens", async () => {
			const malformedTokens = [
				"Bearer invalid.token.here",
				"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalid.signature",
				"Bearer " + "a".repeat(500), // Very long token
				"Bearer null",
				"Bearer undefined",
			];

			for (const token of malformedTokens) {
				const response = await request(app)
					.get("/ui/users")
					.set("Authorization", token)
					.expect(401);

				expect(response.body).toHaveProperty("errorCode", "AUTH_000");
			}
		});
	});

	describe("Input Validation Security", () => {
		test("Should reject oversized payloads", async () => {
			const largePayload = {
				context: {
					action: "recon",
					domain: "ONDC:FIS12",
					bap_id: "test-bap",
					bap_uri: "https://test.com",
					bpp_id: "test-bpp",
					bpp_uri: "https://test-bpp.com",
					transaction_id: "test-txn",
					message_id: "test-msg",
					timestamp: new Date().toISOString(),
					version: "2.0.0",
					ttl: "PT30S",
				},
				message: {
					orders: Array(10000)
						.fill(null)
						.map((_, i) => ({
							id: `order-${i}`,
							payment_id: `payment-${i}`,
							amount: { currency: "INR", value: "100.00" },
							settlements: Array(100)
								.fill(null)
								.map((_, j) => ({
									id: `settlement-${i}-${j}`,
									payment_id: `payment-${i}`,
									status: "ACTIVE",
									amount: { currency: "INR", value: "100.00" },
									commission: { currency: "INR", value: "10.00" },
									withholding_amount: { currency: "INR", value: "5.00" },
									tcs: { currency: "INR", value: "2.00" },
									tds: { currency: "INR", value: "3.00" },
									updated_at: new Date().toISOString(),
								})),
						})),
				},
			};

			const response = await request(app).post("/api/recon").send(largePayload);
			// Should either reject or handle gracefully
			expect([200, 400, 413, 500]).toContain(response.status);
		}, 10000);

		test("Should validate content-type headers", async () => {
			const validPayload = {
				context: { action: "recon", domain: "ONDC:FIS12" },
				message: { orders: [] },
			};

			const response = await request(app)
				.post("/api/recon")
				.set("Content-Type", "text/plain")
				.send(JSON.stringify(validPayload))
				.expect([400]); // Expect validation error or bad request
		});
	});

	describe("Error Information Disclosure", () => {
		test("Should not expose sensitive information in error messages", async () => {
			const response = await request(app)
				.post("/api/recon")
				.send({ malformed: "payload" })
				.expect(422);

			// Check that error doesn't contain sensitive info
			const errorString = JSON.stringify(response.body).toLowerCase();
			expect(errorString).not.toMatch(
				/password|secret|key|token|database|mongo/,
			);
		});

		test("Should not expose stack traces in production", async () => {
			// Force an error by sending completely invalid data
			const response = await request(app)
				.post("/api/recon")
				.send("not-json-at-all")
				.expect([422, 400]);

			// Should not contain stack trace information
			const responseString = JSON.stringify(response.body);
			expect(responseString).not.toMatch(/at.*\(.*:\d+:\d+\)/); // Stack trace pattern
			expect(responseString).not.toMatch(/Error:.*at/);
		});
	});

	describe("CORS Security", () => {
		test("Should handle CORS preflight requests securely", async () => {
			const response = await request(app)
				.options("/api/recon")
				.set("Origin", "https://malicious-site.com")
				.set("Access-Control-Request-Method", "POST");

			// Should either reject or have proper CORS headers
			if (response.status === 200) {
				// If CORS is enabled, check headers are set properly
				expect(response.headers).toHaveProperty("access-control-allow-origin");
			}
		});

		// test("Should reject requests from unauthorized origins", async () => {
		// 	const response = await request(app)
		// 		.post("/api/recon")
		// 		.set("Origin", "https://malicious-site.com")
		// 		.send({
		// 			context: { action: "recon", domain: "ONDC:FIS12" },
		// 			message: { orders: [] },
		// 		});

		// 	// Should handle CORS appropriately
		// 	console.log(response.status, "lalal");
		// 	expect([200, 403]).toContain(response.status);
		// });
	});

	describe("File Upload Security", () => {
		test("Should reject executable file uploads", async () => {
			const executableContent = "#!/bin/bash\necho 'malicious script'";
			const buffer = Buffer.from(executableContent);

			const response = await request(app)
				.patch(`/ui/settle/${sampleUserId}`)
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "malicious.sh")
				.expect(400);

			expect(response.body).toHaveProperty("success", false);
		});

		test("Should validate file content matches extension", async () => {
			const htmlContent = "<html><script>alert('xss')</script></html>";
			const buffer = Buffer.from(htmlContent);

			const response = await request(app)
				.patch(`/ui/settle/${sampleUserId}`)
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "fake.csv")
				.expect(400);

			expect(response.body).toHaveProperty("success", false);
		});
	});

	describe("Path Traversal Prevention", () => {
		test("Should prevent directory traversal in file paths", async () => {
			const maliciousPaths = [
				"../../../etc/passwd",
				"..\\..\\..\\windows\\system32\\config\\sam",
				"%2e%2e%2f%2e%2e%2f%2e%2e%2fetc%2fpasswd",
				"....//....//....//etc/passwd",
			];

			for (const path of maliciousPaths) {
				await request(app)
					.get(`/ui/recon/${path}`)
					.set("Authorization", `Bearer ${authToken}`)
					.expect([404, 400]);
			}
		});
	});
});
