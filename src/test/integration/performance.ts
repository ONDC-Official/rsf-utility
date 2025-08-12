import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../../server";
import jwt from "jsonwebtoken";
import config from "../../config/auth-config";
import { Application } from "express";

describe("RSF Performance and Load Tests", () => {
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

	const createOptimizedPayload = (orderId: string) => ({
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
					settlements: [
						{
							id: `settlement-${orderId}`,
							payment_id: `payment-${orderId}`,
							status: "ACTIVE",
							amount: {
								currency: "INR",
								value: "100.00",
							},
							commission: {
								currency: "INR",
								value: "10.00",
							},
							withholding_amount: {
								currency: "INR",
								value: "5.00",
							},
							tcs: {
								currency: "INR",
								value: "2.00",
							},
							tds: {
								currency: "INR",
								value: "3.00",
							},
							updated_at: new Date().toISOString(),
						},
					],
				},
			],
		},
	});

	describe("Load Testing", () => {
		test("Should handle 100 concurrent requests", async () => {
			const startTime = Date.now();

			const requests = Array(100)
				.fill(null)
				.map((_, index) => {
					const payload = createOptimizedPayload(`load-test-${index}`);
					return request(app).post("/api/recon").send(payload);
				});

			const responses = await Promise.all(requests);
			const endTime = Date.now();
			const duration = endTime - startTime;

			// Check performance metrics
			expect(duration).toBeLessThan(30000); // Should complete within 30 seconds

			// Check success rate
			const successful = responses.filter((r) => r.status === 200);
			const successRate = (successful.length / responses.length) * 100;
			expect(successRate).toBeGreaterThan(90); // At least 90% success rate

			console.log(
				`Load test: ${successful.length}/${responses.length} successful in ${duration}ms`,
			);
		}, 60000); // 60 second timeout

		test("Should handle burst traffic", async () => {
			// Simulate sudden burst of traffic
			const burst1 = Array(50)
				.fill(null)
				.map((_, i) =>
					request(app)
						.post("/api/recon")
						.send(createOptimizedPayload(`burst1-${i}`)),
				);

			// Wait 100ms then send another burst
			await new Promise((resolve) => setTimeout(resolve, 100));

			const burst2 = Array(50)
				.fill(null)
				.map((_, i) =>
					request(app)
						.post("/api/recon")
						.send(createOptimizedPayload(`burst2-${i}`)),
				);

			const [responses1, responses2] = await Promise.all([
				Promise.all(burst1),
				Promise.all(burst2),
			]);

			const allResponses = [...responses1, ...responses2];
			const successful = allResponses.filter((r) => r.status === 200);
			const successRate = (successful.length / allResponses.length) * 100;

			expect(successRate).toBeGreaterThan(85); // At least 85% success rate for burst traffic
		}, 45000);
	});

	describe("Performance Testing", () => {
		test("Should process individual requests quickly", async () => {
			const payload = createOptimizedPayload("perf-test-single");

			const startTime = Date.now();
			const response = await request(app)
				.post("/api/recon")
				.send(payload)
				.expect(200);
			const endTime = Date.now();

			const responseTime = endTime - startTime;
			expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
			expect(response.body.message.ack.status).toBe("ACK");

			console.log(`Single request response time: ${responseTime}ms`);
		});

		test("Should maintain performance with complex payloads", async () => {
			const complexPayload = createOptimizedPayload("complex-test");

			// Add multiple orders to make it more complex
			complexPayload.message.orders = Array(20)
				.fill(null)
				.map((_, i) => ({
					id: `complex-order-${i}`,
					payment_id: `complex-payment-${i}`,
					amount: {
						currency: "INR",
						value: (100 + i).toString(),
					},
					settlements: Array(5)
						.fill(null)
						.map((_, j) => ({
							id: `complex-settlement-${i}-${j}`,
							payment_id: `complex-payment-${i}`,
							status: "ACTIVE",
							amount: {
								currency: "INR",
								value: (100 + i + j).toString(),
							},
							commission: {
								currency: "INR",
								value: (10 + j).toString(),
							},
							withholding_amount: {
								currency: "INR",
								value: (5 + j).toString(),
							},
							tcs: {
								currency: "INR",
								value: (2 + j).toString(),
							},
							tds: {
								currency: "INR",
								value: (3 + j).toString(),
							},
							updated_at: new Date().toISOString(),
						})),
				}));

			const startTime = Date.now();
			const response = await request(app)
				.post("/api/recon")
				.send(complexPayload)
				.expect(200);
			const endTime = Date.now();

			const responseTime = endTime - startTime;
			expect(responseTime).toBeLessThan(5000); // Should handle complex payload within 5 seconds
			expect(response.body.message.ack.status).toBe("ACK");

			console.log(`Complex payload response time: ${responseTime}ms`);
		});

		test("Should handle sequential requests efficiently", async () => {
			const numRequests = 50;
			const startTime = Date.now();

			for (let i = 0; i < numRequests; i++) {
				const payload = createOptimizedPayload(`sequential-${i}`);
				const response = await request(app).post("/api/recon").send(payload);

				expect(response.status).toBe(200);
			}

			const endTime = Date.now();
			const totalTime = endTime - startTime;
			const avgTime = totalTime / numRequests;

			expect(avgTime).toBeLessThan(500); // Average response time should be under 500ms
			console.log(
				`Sequential requests - Total: ${totalTime}ms, Average: ${avgTime}ms`,
			);
		}, 30000);
	});

	describe("Memory Usage Testing", () => {
		test("Should not have memory leaks with repeated requests", async () => {
			const initialMemory = process.memoryUsage();

			// Perform many requests to check for memory leaks
			for (let batch = 0; batch < 10; batch++) {
				const batchRequests = Array(20)
					.fill(null)
					.map((_, i) => {
						const payload = createOptimizedPayload(`memory-test-${batch}-${i}`);
						return request(app).post("/api/recon").send(payload);
					});

				await Promise.all(batchRequests);

				// Force garbage collection if available
				if (global.gc) {
					global.gc();
				}
			}

			const finalMemory = process.memoryUsage();
			const memoryIncrease = finalMemory.heapUsed - initialMemory.heapUsed;

			// Memory increase should be reasonable (less than 50MB)
			expect(memoryIncrease).toBeLessThan(50 * 1024 * 1024);

			console.log(
				`Memory increase: ${(memoryIncrease / 1024 / 1024).toFixed(2)}MB`,
			);
		}, 60000);
	});

	describe("Database Performance", () => {
		test("Should handle database operations efficiently", async () => {
			// Create multiple records
			const createRequests = Array(30)
				.fill(null)
				.map((_, i) => {
					const payload = createOptimizedPayload(`db-perf-${i}`);
					return request(app).post("/api/recon").send(payload);
				});

			await Promise.all(createRequests);

			// Test query performance
			const startTime = Date.now();
			const response = await request(app)
				.get("/ui/recon")
				.set("Authorization", `Bearer ${authToken}`)
				.query({ page: "1", limit: "50" });
			const endTime = Date.now();

			const queryTime = endTime - startTime;
			expect(queryTime).toBeLessThan(2000); // Query should complete within 2 seconds
			expect(response.status).toBe(200);

			console.log(`Database query time: ${queryTime}ms`);
		});

		test("Should handle pagination efficiently", async () => {
			// Create many records for pagination testing
			const createRequests = Array(100)
				.fill(null)
				.map((_, i) => {
					const payload = createOptimizedPayload(`pagination-${i}`);
					return request(app).post("/api/recon").send(payload);
				});

			await Promise.all(createRequests);

			// Test different page sizes and positions
			const paginationTests = [
				{ page: 1, limit: 10 },
				{ page: 5, limit: 20 },
				{ page: 10, limit: 10 },
			];

			for (const test of paginationTests) {
				const startTime = Date.now();
				const response = await request(app)
					.get("/ui/recon")
					.set("Authorization", `Bearer ${authToken}`)
					.query({ page: test.page.toString(), limit: test.limit.toString() });
				const endTime = Date.now();

				const queryTime = endTime - startTime;
				expect(queryTime).toBeLessThan(3000); // Each paginated query should be fast
				expect(response.status).toBe(200);

				console.log(
					`Pagination (page ${test.page}, limit ${test.limit}) time: ${queryTime}ms`,
				);
			}
		});
	});

	describe("Stress Testing", () => {
		test("Should gracefully handle resource exhaustion", async () => {
			// Attempt to create a very large number of requests
			const stressRequests = Array(200)
				.fill(null)
				.map((_, i) => {
					const payload = createOptimizedPayload(`stress-${i}`);
					return request(app).post("/api/recon").send(payload).timeout(10000); // 10 second timeout per request
				});

			const responses = await Promise.allSettled(stressRequests);

			// Check that the system handled the load gracefully
			const successful = responses.filter(
				(r) => r.status === "fulfilled" && (r.value as any).status === 200,
			);
			const failed = responses.filter((r) => r.status === "rejected");
			const rateLimited = responses.filter(
				(r) => r.status === "fulfilled" && (r.value as any).status === 429,
			);

			console.log(
				`Stress test results: ${successful.length} successful, ${rateLimited.length} rate limited, ${failed.length} failed`,
			);

			// System should either process requests or rate limit them, not crash
			expect(failed.length).toBeLessThan(responses.length * 0.1); // Less than 10% failures
		}, 120000); // 2 minute timeout
	});

	describe("CSV Processing Performance", () => {
		test("Should process CSV files efficiently", async () => {
			const csvContent = Array(1000)
				.fill(null)
				.map((_, i) => `order-${i},100.${i.toString().padStart(2, "0")}`)
				.join("\n");

			const csvWithHeaders = `order_id,amount\n${csvContent}`;
			const buffer = Buffer.from(csvWithHeaders);

			const startTime = Date.now();
			const response = await request(app)
				.post("/ui/settle")
				.set("Authorization", `Bearer ${authToken}`)
				.attach("file", buffer, "large.csv");
			const endTime = Date.now();

			const processingTime = endTime - startTime;
			expect(processingTime).toBeLessThan(10000); // Should process within 10 seconds

			console.log(`CSV processing time for 1000 records: ${processingTime}ms`);
		});
	});
});
