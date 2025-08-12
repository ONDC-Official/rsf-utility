import request from "supertest";
import { Application } from "express";
import axios from "axios";
import { randomInt } from "crypto";

import createServer from "../../server";

import { on_confirmPayloads } from "../data/on-confirms";
import { genDummyOnSettle } from "../utils/gen_on_settle";
import { generateOnReconPayloadDUMMY } from "../utils/gen_on_recon";
import { generateReconDUMMY } from "../utils/gen_recon";
import { UserType } from "../../schema/models/user-schema";

// Mock axios for the entire test suite
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("E2E Error Scenarios: Settlement and Reconciliation Failures", () => {
	let app: Application;
	let token: string;
	let userId: string;
	let orderIds: string[] = [];
	let settlementPayload: any;
	let reconPayload: any;

	const testUser: UserType = {
		title: "ERROR_TEST_DOMAIN",
		role: "BAP",
		domain: "ONDC:RET14",
		subscriber_url: "https://fis-staging.ondc.org/rsf-utility/api",
		np_tcs: 3,
		np_tds: 6,
		pr_tcs: 9,
		pr_tds: 3,
		tcs_applicability: "BOTH",
		tds_applicability: "BOTH",
		msn: false,
		provider_details: [
			{
				provider_name: "Error Test Provider",
				provider_id: "ERR_P1",
				account_number: "1111111111",
				ifsc_code: "ERRO1234",
				bank_name: "Error Test Bank",
			},
		],
		counterparty_ids: [],
	};

	beforeAll(async () => {
		app = createServer();

		const authResponse = await request(app).post("/ui/auth/sign-token").send({
			client_id: process.env.CLIENT_ID,
			expires: "1d",
		});
		token = authResponse.body.data.token;
	});

	it("1. should create user and ingest orders", async () => {
		// Create user
		const response = await request(app)
			.post("/ui/users")
			.set("Authorization", `Bearer ${token}`)
			.send(testUser);

		expect(response.status).toBe(201);
		userId = response.body.data._id;

		// Ingest orders - use first 10 orders for manageable error testing
		const testOrders = on_confirmPayloads.slice(0, 10);
		for (const on_confirm of testOrders) {
			const response = await request(app)
				.post("/api/on_confirm")
				.send(on_confirm);
			console.log("Ingest Order Response:", response.body); // Debugging line
			expect(response.status).toBe(200);
		}

		const fetchOrdersResponse = await request(app)
			.get(`/ui/orders/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(fetchOrdersResponse.status).toBe(200);
		orderIds = fetchOrdersResponse.body.data.orders.map((o: any) => o.order_id);
	});

	it("2. should prepare orders and handle settlement trigger failure", async () => {
		// Prepare orders for settlement
		const prepareBody = {
			prepare_data: orderIds.map((id) => ({ id, strategy: "USER" })),
		};

		const response = await request(app)
			.post(`/ui/settle/${userId}/prepare`)
			.set("Authorization", `Bearer ${token}`)
			.send(prepareBody);

		expect(response.status).toBe(201);

		// Generate settlement payload
		const generateBody = {
			settle_data: orderIds.map((orderId) => ({
				order_id: orderId,
				provider_value: randomInt(100, 1000),
				self_value: randomInt(10, 100),
			})),
		};

		const generateResponse = await request(app)
			.post(`/ui/generate/${userId}/settle/np-np`)
			.set("Authorization", `Bearer ${token}`)
			.send(generateBody);

		expect(generateResponse.status).toBe(201);
		settlementPayload = generateResponse.body.data;

		// Mock axios to return an error (network timeout, 5xx error, etc.)
		mockedAxios.post.mockRejectedValueOnce(new Error("Network timeout"));

		const triggerResponse = await request(app)
			.post(`/ui/trigger/${userId}/settle`)
			.set("Authorization", `Bearer ${token}`)
			.send(settlementPayload);

		// Should handle the error gracefully
		expect(triggerResponse.status).toBe(500);
		expect(triggerResponse.body.message).toContain("Error");
	});

	it("3. should handle successful trigger but receive on_settle with error", async () => {
		// Mock successful trigger this time
		mockedAxios.post.mockResolvedValueOnce({
			data: { message: { ack: { status: "ACK" } } },
		});

		const triggerResponse = await request(app)
			.post(`/ui/trigger/${userId}/settle`)
			.set("Authorization", `Bearer ${token}`)
			.send(settlementPayload);

		expect(triggerResponse.status).toBe(200);

		// Create on_settle payload with errors for all orders
		const onSettlePayloadWithError = {
			context: {
				domain: "ONDC:NTS10",
				location: {
					country: { code: "IND" },
					city: { code: "*" },
				},
				version: "2.0.0",
				action: "on_settle",
				bap_id: "receiverapp.com",
				bap_uri: "https://receiver-app.com/ondc/",
				bpp_id: "rsfutility.com",
				bpp_uri: "https://rsfutility.com/",
				transaction_id: settlementPayload.context.transaction_id,
				message_id: settlementPayload.context.message_id,
				timestamp: new Date().toISOString(),
				ttl: "P1D",
			},
			message: {
				collector_app_id: settlementPayload.message.collector_app_id,
				receiver_app_id: settlementPayload.message.receiver_app_id,
				settlement: {
					type: settlementPayload.message.settlement.type,
					id: settlementPayload.message.settlement.id,
					orders: settlementPayload.message.settlement?.orders?.map(
						(order: any) => ({
							id: order.id,
							inter_participant: {
								amount: {
									currency: "INR",
									value: order.inter_participant?.amount.value,
								},
								status: "NOT_SETTLED",
								error: {
									code: "ACCOUNT_INACTIVE",
									message: "Beneficiary account is inactive or frozen",
								},
							},
							collector: {
								amount: {
									currency: "INR",
									value: order.collector?.amount.value,
								},
								status: "NOT_SETTLED",
								error: {
									code: "INSUFFICIENT_BALANCE",
									message: "Insufficient balance in collector account",
								},
							},
						}),
					),
				},
			},
		};

		const onSettleResponse = await request(app)
			.post(`/api/on_settle`)
			.send(onSettlePayloadWithError);

		expect(onSettleResponse.status).toBe(200);

		// Verify settlements have error details
		const settlementsResponse = await request(app)
			.get(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(settlementsResponse.status).toBe(200);
		const settlements = settlementsResponse.body.data.settlements;
		expect(settlements.length).toBeGreaterThan(0);
		expect(settlements[0].status).toBe("NOT_SETTLED");
		expect(settlements[0].error).toBeDefined();
	});

	it("4. should handle reconciliation trigger failure", async () => {
		const ordersToRecon = orderIds.slice(0, 5);
		const generateReconBody = {
			recon_data: ordersToRecon.map((orderId) => ({ order_id: orderId })),
		};

		const genReconResponse = await request(app)
			.post(`/ui/generate/${userId}/recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(generateReconBody);

		expect(genReconResponse.status).toBe(201);
		reconPayload = genReconResponse.body.data;

		// Mock network failure for recon trigger
		mockedAxios.post.mockRejectedValueOnce(new Error("Connection refused"));

		const triggerReconResponse = await request(app)
			.post(`/ui/trigger/${userId}/recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(reconPayload);

		expect(triggerReconResponse.status).toBe(500);
		expect(triggerReconResponse.body.message).toContain("Error");
	});

	it("5. should handle successful recon trigger but receive on_recon with error", async () => {
		// Mock successful trigger
		mockedAxios.post.mockResolvedValueOnce({
			data: { message: { ack: { status: "ACK" } } },
		});

		const triggerReconResponse = await request(app)
			.post(`/ui/trigger/${userId}/recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(reconPayload);

		expect(triggerReconResponse.status).toBe(200);

		// Create on_recon payload with error
		const onReconPayloadWithError = {
			context: {
				domain: "ONDC:NTS10",
				location: {
					country: { code: "IND" },
					city: { code: "*" },
				},
				version: "2.0.0",
				action: "on_recon",
				bap_id: "receiverapp.com",
				bap_uri: "https://receiver-app.com/ondc/",
				bpp_id: "rsfutility.com",
				bpp_uri: "https://rsfutility.com/",
				transaction_id: reconPayload.context.transaction_id,
				message_id: reconPayload.context.message_id,
				timestamp: new Date().toISOString(),
				ttl: "P1D",
			},
			message: {
				recon: {
					id: reconPayload.message.recon.id,
					collector_id: reconPayload.message.recon.collector_id,
					receiver_id: reconPayload.message.recon.receiver_id,
					status: "REJECTED",
					error: {
						code: "RECON_MISMATCH",
						message: "Settlement amounts do not match our records",
						details: {
							expected_amount: "1000.00",
							received_amount: "950.00",
							discrepancy: "50.00",
						},
					},
				},
			},
		};

		const onReconResponse = await request(app)
			.post(`/api/on_recon`)
			.send(onReconPayloadWithError);

		expect(onReconResponse.status).toBe(200);

		// Verify recon records have error details
		const reconResponse = await request(app)
			.get(`/ui/recon/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(reconResponse.status).toBe(200);
		const recons = reconResponse.body.data.recons;
		expect(recons.length).toBeGreaterThan(0);

		// Find the recon record that should have errors
		const errorRecon = recons.find(
			(r: any) => r.transaction_id === reconPayload.context.transaction_id,
		);
		expect(errorRecon).toBeDefined();
		expect(
			errorRecon.recons.some((r: any) => r.recon_status === "SENT_REJECTED"),
		).toBe(true);
	});

	it("6. should handle incoming recon with malformed data", async () => {
		// Create malformed incoming recon payload
		const malformedReconPayload = {
			context: {
				domain: "ONDC:NTS10",
				// Missing required fields like transaction_id, message_id
				action: "recon",
			},
			message: {
				recon: {
					// Missing required fields
					collector_id: testUser.title,
				},
			},
		};

		const reconResponse = await request(app)
			.post(`/api/recon`)
			.send(malformedReconPayload);

		// Should return validation error
		expect(reconResponse.status).toBe(400);
		expect(reconResponse.body.message).toContain("validation");
	});

	it("7. should handle on_recon generation with missing orders", async () => {
		// Try to generate on_recon for orders that don't exist in recon records
		const nonExistentOrders = ["NON_EXISTENT_ORDER_1", "NON_EXISTENT_ORDER_2"];
		const generateOnReconBody = {
			on_recon_data: nonExistentOrders.map((orderId) => ({
				order_id: orderId,
				recon_accord: true,
				due_date: new Date().toISOString(),
			})),
		};

		const genOnReconResponse = await request(app)
			.post(`/ui/generate/${userId}/on_recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(generateOnReconBody);

		// Should handle gracefully - either error or empty response
		expect([400, 404, 422]).toContain(genOnReconResponse.status);
	});

	it("8. should handle axios timeout and retries scenario", async () => {
		// Generate new settlement for timeout testing
		const generateBody = {
			settle_data: orderIds.slice(-3).map((orderId) => ({
				order_id: orderId,
				provider_value: randomInt(100, 1000),
				self_value: randomInt(10, 100),
			})),
		};

		const generateResponse = await request(app)
			.post(`/ui/generate/${userId}/settle/np-np`)
			.set("Authorization", `Bearer ${token}`)
			.send(generateBody);

		expect(generateResponse.status).toBe(201);
		const timeoutPayload = generateResponse.body.data;

		// Mock multiple timeout errors (simulating retries)
		mockedAxios.post
			.mockRejectedValueOnce(new Error("ETIMEDOUT"))
			.mockRejectedValueOnce(new Error("ECONNRESET"))
			.mockRejectedValueOnce(new Error("Request timeout"));

		const triggerResponse = await request(app)
			.post(`/ui/trigger/${userId}/settle`)
			.set("Authorization", `Bearer ${token}`)
			.send(timeoutPayload);

		// Should eventually fail after retries
		expect(triggerResponse.status).toBe(500);
		expect(triggerResponse.body.message).toContain("Error");
	});
});
