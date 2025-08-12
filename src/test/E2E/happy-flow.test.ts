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
import { User } from "../../db/models/user-model";
import { Order } from "../../db/models/order-model";
import { GenOnReconBody } from "../../types/generate-recon-types";

// Mock axios for the entire test suite
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Full E2E Flow: User Creation, Settlement, and Reconciliation", () => {
	let app: Application;
	let token: string;
	let userId: string;
	let orderIds: string[] = [];
	let settlementPayload: any;
	let reconPayload: any;
	let onReconGeneratedPayload: any;

	const testUser: UserType = {
		title: "TEST_DOMAIN_CLEAN",
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
				provider_name: "Provider 1",
				provider_id: "P1",
				account_number: "1234567890",
				ifsc_code: "IFSC1234",
				bank_name: "Bank ABC",
			},
		],
		counterparty_ids: [],
	};

	// Setup server, database, and auth token once for all tests in this suite
	beforeAll(async () => {
		app = createServer();
		// await connectDB();

		const authResponse = await request(app).post("/ui/auth/sign-token").send({
			client_id: process.env.CLIENT_ID,
			expires: "1d",
		});
		token = authResponse.body.data.token;
	});

	it("1. should create a new user successfully", async () => {
		const response = await request(app)
			.post("/ui/users")
			.set("Authorization", `Bearer ${token}`)
			.send(testUser);

		expect(response.status).toBe(201);
		expect(response.body.data).toHaveProperty("_id");
		expect(response.body.data.title).toBe(testUser.title);
		userId = response.body.data._id; // Save userId for subsequent tests
	});

	it("2. should ingest on_confirm payloads and create orders", async () => {
		for (const on_confirm of on_confirmPayloads) {
			const response = await request(app)
				.post("/api/on_confirm")
				.send(on_confirm);
			expect(response.status).toBe(200);
		}

		const fetchOrdersResponse = await request(app)
			.get(`/ui/orders/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(fetchOrdersResponse.status).toBe(200);
		expect(fetchOrdersResponse.body.data.orders.length).toBe(
			on_confirmPayloads.length,
		);
		orderIds = fetchOrdersResponse.body.data.orders.map((o: any) => o.order_id);
	});

	it("3. should prepare all orders for settlement", async () => {
		const prepareBody = {
			prepare_data: orderIds.map((id) => ({ id, strategy: "USER" })),
		};

		const response = await request(app)
			.post(`/ui/settle/${userId}/prepare`)
			.set("Authorization", `Bearer ${token}`)
			.send(prepareBody);

		expect(response.status).toBe(201);
		// A more robust test would fetch settlements and check their status is 'PREPARED'
	});

	it("4. should generate and trigger a settlement payload", async () => {
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
		settlementPayload = generateResponse.body.data; // Save for the next steps

		// Mock the external API call for the trigger
		mockedAxios.post.mockResolvedValueOnce({
			data: { message: { ack: { status: "ACK" } } },
		});

		const triggerResponse = await request(app)
			.post(`/ui/trigger/${userId}/settle`)
			.set("Authorization", `Bearer ${token}`)
			.send(settlementPayload);

		expect(triggerResponse.status).toBe(200);
		expect(triggerResponse.body.message).toBe("OK");
	});

	it('5. should process an on_settle callback with "NOT_SETTLED" status', async () => {
		const onSettlePayload = genDummyOnSettle(settlementPayload);
		const onSettleResponse = await request(app)
			.post(`/api/on_settle`)
			.send(onSettlePayload);

		expect(onSettleResponse.status).toBe(200);

		// Verify the state change after the callback
		const settlementsResponse = await request(app)
			.get(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(settlementsResponse.status).toBe(200);
		const firstSettlement = settlementsResponse.body.data.settlements[0];
		console.log("First Settlement Status:", firstSettlement);
		expect(firstSettlement.status).toBe("NOT_SETTLED");
	});

	it("6. should generate and trigger a reconciliation payload for half the orders", async () => {
		const ordersToRecon = orderIds.slice(0, Math.floor(orderIds.length / 2));
		const generateReconBody = {
			recon_data: ordersToRecon.map((orderId) => ({ order_id: orderId })),
		};

		const genReconResponse = await request(app)
			.post(`/ui/generate/${userId}/recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(generateReconBody);

		expect(genReconResponse.status).toBe(201);
		reconPayload = genReconResponse.body.data;

		mockedAxios.post.mockResolvedValueOnce({
			data: { message: { ack: { status: "ACK" } } },
		});

		const triggerReconResponse = await request(app)
			.post(`/ui/trigger/${userId}/recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(reconPayload);

		expect(triggerReconResponse.status).toBe(200);
	});

	it("7. should process an incoming recon request and an on_recon callback", async () => {
		// a) Process an on_recon callback for the recon we just sent
		const onReconDummyPayload = generateOnReconPayloadDUMMY(reconPayload);
		const onReconResponse = await request(app)
			.post(`/api/on_recon`)
			.send(onReconDummyPayload);
		expect(onReconResponse.status).toBe(200);

		// b) Process an incoming recon request from a counterparty for the other half of orders
		const ordersForIncomingRecon = orderIds.slice(
			Math.floor(orderIds.length / 2),
		);
		const fakeIncomingRecon = generateReconDUMMY(
			ordersForIncomingRecon,
			testUser,
		);
		const reconResponse = await request(app)
			.post(`/api/recon`)
			.send(fakeIncomingRecon);
		expect(reconResponse.status).toBe(200);
	});

	it("8. should generate and trigger an on_recon payload in response", async () => {
		const ordersForOnRecon = orderIds.slice(Math.floor(orderIds.length / 2));
		const generateOnReconBody = {
			on_recon_data: ordersForOnRecon.map((orderId) => ({
				order_id: orderId,
				recon_accord: true,
				due_date: new Date().toISOString(),
			})),
		};
		const genOnReconResponse = await request(app)
			.post(`/ui/generate/${userId}/on_recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(generateOnReconBody);

		expect(genOnReconResponse.status).toBe(201);
		onReconGeneratedPayload = genOnReconResponse.body.data;

		mockedAxios.post.mockResolvedValueOnce({
			data: { message: { ack: { status: "ACK" } } },
		});

		const triggerOnReconResponse = await request(app)
			.post(`/ui/trigger/${userId}/on_recon`)
			.set("Authorization", `Bearer ${token}`)
			.send(onReconGeneratedPayload);

		expect(triggerOnReconResponse.status).toBe(200);

		// Final check: verify the status of the records we just agreed to
		const fetchedReconData = await request(app)
			.get(`/ui/recon/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		console.log("Fetched Recon Data:", fetchedReconData.body.data.recons);

		const convertedData = fetchedReconData.body.data.recons.map(
			(recon: any) => ({
				transaction_id: recon.transaction_id,
				recons: recon.recons.map((r: any) => ({
					order_id: r.order_id,
					recon_accord: r.recon_accord,
					recon_status: r.recon_status,
					due_date: r.due_date,
				})),
				count: recon.count,
			}),
		);
		console.log(
			"Recon IDs with Status:",
			JSON.stringify(convertedData, null, 2),
		);
		expect(convertedData.length).toBeGreaterThan(0);
		expect(convertedData[0].recons.length).toBeGreaterThan(0);
		// RECEIVED_ACCEPTED for ordersForOnRecon
		expect(
			convertedData
				.find(
					(d: any) =>
						d.transaction_id === onReconGeneratedPayload.context.transaction_id,
				)
				.recons.every((r: any) => {
					console.log("Recon Record:", r);
					return r.recon_status === "RECEIVED_ACCEPTED";
				}),
		).toBe(true);
	});
});
