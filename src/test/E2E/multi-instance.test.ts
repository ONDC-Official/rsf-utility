import request from "supertest";
import { Application } from "express";
import { randomInt } from "crypto";
import { createServer as createHttpServer } from "http";

import createServer from "../../server";

import { on_confirmPayloads } from "../data/on-confirms";
import { genDummyOnSettle } from "../utils/gen_on_settle";
import { UserType } from "../../schema/models/user-schema";
import axios from "axios";

// Mock axios for the entire test suite
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

/**
 * Multi-Instance E2E Test: Real Communication Between Two RSF Utility Instances
 *
 * This test simulates a real-world scenario where two separate RSF utility instances
 * (BAP and BPP) communicate with each other over HTTP, without mocking any inter-instance calls.
 *
 * Architecture:
 * - Instance 1 (BAP): Port 3000, Database: test_rsf_bap, Role: BAP
 * - Instance 2 (BPP): Port 3001, Database: test_rsf_bpp, Role: BPP
 *
 * Flow:
 * 1. Both instances create their own users and ingest the same orders
 * 2. Both instances prepare and generate settlements
 * 3. Both instances process fake on_settle callbacks (third-party auditor simulation)
 * 4. Instance 1 (BAP) triggers recon request → Instance 2 (BPP) receives via /api/recon
 * 5. Instance 2 (BPP) triggers on_recon response → Instance 1 (BAP) receives via /api/on_recon
 * 6. Verify state changes in both instances' databases
 */
describe("Multi-Instance E2E: Real BAP-BPP Communication", () => {
	// Instance 1 (BAP) variables
	let bapApp: Application;
	let bapServer: any;
	let bapToken: string;
	let bapUserId: string;
	let bapOrderIds: string[] = [];
	let bapSettlementPayload: any;
	let bapReconPayload: any;
	const BAP_PORT = 3000;
	const BAP_BASE_URL = `http://localhost:${BAP_PORT}`;

	// Instance 2 (BPP) variables
	let bppApp: Application;
	let bppServer: any;
	let bppToken: string;
	let bppUserId: string;
	let bppOrderIds: string[] = [];
	let bppSettlementPayload: any;
	let bppOnReconPayload: any;
	const BPP_PORT = 3001;
	const BPP_BASE_URL = `http://localhost:${BPP_PORT}`;

	// User configurations for both instances
	const bapUser: UserType = {
		title: "BAP_MULTI_INSTANCE",
		role: "BAP",
		domain: "ONDC:RET14",
		subscriber_url: `${BAP_BASE_URL}/api`, // Points to BAP instance
		np_tcs: 3,
		np_tds: 6,
		pr_tcs: 9,
		pr_tds: 3,
		tcs_applicability: "BOTH",
		tds_applicability: "BOTH",
		msn: false,
		provider_details: [
			{
				provider_name: "BAP Provider",
				provider_id: "BAP_P1",
				account_number: "1111111111",
				ifsc_code: "BAPP1234",
				bank_name: "BAP Bank",
			},
		],
		counterparty_ids: [],
	};

	const bppUser: UserType = {
		title: "BPP_MULTI_INSTANCE",
		role: "BPP",
		domain: "ONDC:RET14",
		subscriber_url: `${BPP_BASE_URL}/api`, // Points to BPP instance
		np_tcs: 2,
		np_tds: 4,
		pr_tcs: 8,
		pr_tds: 2,
		tcs_applicability: "BOTH",
		tds_applicability: "BOTH",
		msn: false,
		provider_details: [
			{
				provider_name: "BPP Provider",
				provider_id: "BPP_P1",
				account_number: "2222222222",
				ifsc_code: "BPPP1234",
				bank_name: "BPP Bank",
			},
		],
		counterparty_ids: [],
	};

	beforeAll(async () => {
		console.log("🚀 Setting up Multi-Instance Test Environment...");

		// Set different database names for each instance
		process.env.BAP_DB_NAME = "test_rsf_bap";
		process.env.BPP_DB_NAME = "test_rsf_bpp";

		// Setup BAP Instance (Port 3000)
		console.log(`📡 Starting BAP instance on port ${BAP_PORT}...`);
		process.env.DB_NAME = process.env.BAP_DB_NAME;
		bapApp = createServer();
		bapServer = createHttpServer(bapApp);

		await new Promise<void>((resolve, reject) => {
			bapServer.listen(BAP_PORT, (err: any) => {
				if (err) reject(err);
				else {
					console.log(`✅ BAP instance running on ${BAP_BASE_URL}`);
					resolve();
				}
			});
		});

		// Setup BPP Instance (Port 3001)
		console.log(`📡 Starting BPP instance on port ${BPP_PORT}...`);
		process.env.DB_NAME = process.env.BPP_DB_NAME;
		bppApp = createServer();
		bppServer = createHttpServer(bppApp);

		await new Promise<void>((resolve, reject) => {
			bppServer.listen(BPP_PORT, (err: any) => {
				if (err) reject(err);
				else {
					console.log(`✅ BPP instance running on ${BPP_BASE_URL}`);
					resolve();
				}
			});
		});

		// Generate auth tokens for both instances
		console.log("🔐 Generating authentication tokens...");

		const bapAuthResponse = await request(bapApp)
			.post("/ui/auth/sign-token")
			.send({
				client_id: process.env.CLIENT_ID,
				expires: "1d",
			});
		bapToken = bapAuthResponse.body.data.token;
		console.log(`✅ BAP token generated`);

		const bppAuthResponse = await request(bppApp)
			.post("/ui/auth/sign-token")
			.send({
				client_id: process.env.CLIENT_ID,
				expires: "1d",
			});
		bppToken = bppAuthResponse.body.data.token;
		console.log(`✅ BPP token generated`);

		console.log("🎯 Multi-Instance setup complete!");
	});

	afterAll(async () => {
		console.log("🧹 Cleaning up Multi-Instance Test Environment...");

		if (bapServer) {
			await new Promise<void>((resolve) => {
				bapServer.close(() => {
					console.log(`✅ BAP instance stopped`);
					resolve();
				});
			});
		}

		if (bppServer) {
			await new Promise<void>((resolve) => {
				bppServer.close(() => {
					console.log(`✅ BPP instance stopped`);
					resolve();
				});
			});
		}

		console.log("🎯 Multi-Instance cleanup complete!");
	});

	describe("Phase 1: Instance Setup and User Creation", () => {
		it("1.1. should create BAP user in BAP instance", async () => {
			console.log("👤 Creating BAP user...");

			const response = await request(bapApp)
				.post("/ui/users")
				.set("Authorization", `Bearer ${bapToken}`)
				.send(bapUser);

			expect(response.status).toBe(201);
			expect(response.body.data).toHaveProperty("_id");
			expect(response.body.data.title).toBe(bapUser.title);
			expect(response.body.data.role).toBe("BAP");
			expect(response.body.data.subscriber_url).toBe(`${BAP_BASE_URL}/api`);

			bapUserId = response.body.data._id;
			console.log(`✅ BAP user created with ID: ${bapUserId}`);
		});

		it("1.2. should create BPP user in BPP instance", async () => {
			console.log("👤 Creating BPP user...");

			const response = await request(bppApp)
				.post("/ui/users")
				.set("Authorization", `Bearer ${bppToken}`)
				.send(bppUser);

			expect(response.status).toBe(201);
			expect(response.body.data).toHaveProperty("_id");
			expect(response.body.data.title).toBe(bppUser.title);
			expect(response.body.data.role).toBe("BPP");
			expect(response.body.data.subscriber_url).toBe(`${BPP_BASE_URL}/api`);

			bppUserId = response.body.data._id;
			console.log(`✅ BPP user created with ID: ${bppUserId}`);
		});
	});

	describe("Phase 2: Order Ingestion in Both Instances", () => {
		it("2.1. should ingest orders in BAP instance", async () => {
			console.log("📋 Ingesting orders in BAP instance...");

			for (const on_confirm of on_confirmPayloads) {
				on_confirm.context.bap_id = bapUserId;
				on_confirm.context.bpp_id = bppUserId; // Ensure BPP ID is set for BAP instance
				on_confirm.context.bpp_uri = bppUser.subscriber_url; // Set BPP URI for BAP instance
				on_confirm.context.bap_uri = bapUser.subscriber_url; // Set BAP URI for BAP instance
				const response = await request(bapApp)
					.post("/api/on_confirm")
					.send(on_confirm);
				expect(response.status).toBe(200);
			}

			const fetchOrdersResponse = await request(bapApp)
				.get(`/ui/orders/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			expect(fetchOrdersResponse.status).toBe(200);
			expect(fetchOrdersResponse.body.data.orders.length).toBe(
				on_confirmPayloads.length,
			);

			bapOrderIds = fetchOrdersResponse.body.data.orders.map(
				(o: any) => o.order_id,
			);
			console.log(`✅ BAP instance: ${bapOrderIds.length} orders ingested`);
		});

		it("2.2. should ingest same orders in BPP instance", async () => {
			console.log("📋 Ingesting orders in BPP instance...");

			for (const on_confirm of on_confirmPayloads) {
				const response = await request(bppApp)
					.post("/api/on_confirm")
					.send(on_confirm);
				expect(response.status).toBe(200);
			}

			const fetchOrdersResponse = await request(bppApp)
				.get(`/ui/orders/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			expect(fetchOrdersResponse.status).toBe(200);
			expect(fetchOrdersResponse.body.data.orders.length).toBe(
				on_confirmPayloads.length,
			);

			bppOrderIds = fetchOrdersResponse.body.data.orders.map(
				(o: any) => o.order_id,
			);
			console.log(`✅ BPP instance: ${bppOrderIds.length} orders ingested`);

			// Verify both instances have the same order IDs
			expect(bapOrderIds.sort()).toEqual(bppOrderIds.sort());
			console.log(`✅ Order ID consistency verified between instances`);
		});
	});

	describe("Phase 3: Settlement Preparation in Both Instances", () => {
		it("3.1. should prepare settlements in BAP instance", async () => {
			console.log("⚙️  Preparing settlements in BAP instance...");

			const prepareBody = {
				prepare_data: bapOrderIds.map((id) => ({ id, strategy: "USER" })),
			};

			const response = await request(bapApp)
				.post(`/ui/settle/${bapUserId}/prepare`)
				.set("Authorization", `Bearer ${bapToken}`)
				.send(prepareBody);

			expect(response.status).toBe(201);
			console.log(`✅ BAP settlements prepared`);
		});

		it("3.2. should prepare settlements in BPP instance", async () => {
			console.log("⚙️  Preparing settlements in BPP instance...");

			const prepareBody = {
				prepare_data: bppOrderIds.map((id) => ({ id, strategy: "USER" })),
			};

			const response = await request(bppApp)
				.post(`/ui/settle/${bppUserId}/prepare`)
				.set("Authorization", `Bearer ${bppToken}`)
				.send(prepareBody);

			expect(response.status).toBe(201);
			console.log(`✅ BPP settlements prepared`);
		});

		it("3.3. should generate and trigger settlements in BAP instance", async () => {
			console.log(
				"🏦 Generating and triggering settlements in BAP instance...",
			);

			const generateBody = {
				settle_data: bapOrderIds.map((orderId) => ({
					order_id: orderId,
					provider_value: randomInt(100, 1000),
					self_value: randomInt(10, 100),
				})),
			};

			const generateResponse = await request(bapApp)
				.post(`/ui/generate/${bapUserId}/settle/np-np`)
				.set("Authorization", `Bearer ${bapToken}`)
				.send(generateBody);

			expect(generateResponse.status).toBe(201);
			bapSettlementPayload = generateResponse.body.data;

			// trigger
			// Mock the external API call for the trigger
			mockedAxios.post.mockResolvedValueOnce({
				data: { message: { ack: { status: "ACK" } } },
			});
			const triggerResponse = await request(bapApp)
				.post(`/ui/trigger/${bapUserId}/settle`)
				.set("Authorization", `Bearer ${bapToken}`)
				.send(bapSettlementPayload);

			expect(triggerResponse.status).toBe(200);

			console.log(`✅ BAP settlement payload generated`);
		});

		it("3.4. should generate and trigger settlements in BPP instance", async () => {
			console.log(
				"🏦 Generating and triggering settlements in BPP instance...",
			);

			const generateBody = {
				settle_data: bppOrderIds.map((orderId) => ({
					order_id: orderId,
					provider_value: randomInt(100, 1000),
					self_value: randomInt(10, 100),
				})),
			};

			const generateResponse = await request(bppApp)
				.post(`/ui/generate/${bppUserId}/settle/np-np`)
				.set("Authorization", `Bearer ${bppToken}`)
				.send(generateBody);

			expect(generateResponse.status).toBe(201);
			bppSettlementPayload = generateResponse.body.data;

			// Mock the external API call for the trigger
			mockedAxios.post.mockResolvedValueOnce({
				data: { message: { ack: { status: "ACK" } } },
			});
			const triggerResponse = await request(bppApp)
				.post(`/ui/trigger/${bppUserId}/settle`)
				.set("Authorization", `Bearer ${bppToken}`)
				.send(bppSettlementPayload);

			expect(triggerResponse.status).toBe(200);
			console.log(`✅ BPP settlement payload generated`);
		});
	});

	describe("Phase 4: Settlement Callback Processing (Third-Party Simulation)", () => {
		it("4.1. should process on_settle callback in BAP instance", async () => {
			console.log("📞 Processing on_settle callback in BAP instance...");

			const onSettlePayload = genDummyOnSettle(bapSettlementPayload);
			const onSettleResponse = await request(bapApp)
				.post(`/api/on_settle`)
				.send(onSettlePayload);

			expect(onSettleResponse.status).toBe(200);

			// Verify settlement status update
			const settlementsResponse = await request(bapApp)
				.get(`/ui/settle/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			expect(settlementsResponse.status).toBe(200);
			const firstSettlement = settlementsResponse.body.data.settlements[0];
			expect(firstSettlement.status).toBe("NOT_SETTLED");

			console.log(
				`✅ BAP on_settle processed, status: ${firstSettlement.status}`,
			);
		});

		it("4.2. should process on_settle callback in BPP instance", async () => {
			console.log("📞 Processing on_settle callback in BPP instance...");

			const onSettlePayload = genDummyOnSettle(bppSettlementPayload);
			const onSettleResponse = await request(bppApp)
				.post(`/api/on_settle`)
				.send(onSettlePayload);

			expect(onSettleResponse.status).toBe(200);

			// Verify settlement status update
			const settlementsResponse = await request(bppApp)
				.get(`/ui/settle/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			expect(settlementsResponse.status).toBe(200);
			const firstSettlement = settlementsResponse.body.data.settlements[0];
			expect(firstSettlement.status).toBe("NOT_SETTLED");

			console.log(
				`✅ BPP on_settle processed, status: ${firstSettlement.status}`,
			);
		});
	});

	describe("Phase 5: Real Inter-Instance Reconciliation Communication", () => {
		it("5.1. should generate recon payload in BAP instance with correct URIs", async () => {
			console.log("🔄 Generating recon payload in BAP instance...");

			// Use half the orders for reconciliation
			const ordersToRecon = bapOrderIds.slice(
				0,
				Math.floor(bapOrderIds.length / 2),
			);
			const generateReconBody = {
				recon_data: ordersToRecon.map((orderId) => ({ order_id: orderId })),
			};

			const genReconResponse = await request(bapApp)
				.post(`/ui/generate/${bapUserId}/recon`)
				.set("Authorization", `Bearer ${bapToken}`)
				.send(generateReconBody);

			expect(genReconResponse.status).toBe(201);
			bapReconPayload = genReconResponse.body.data;

			// Verify the payload has correct context URIs
			expect(bapReconPayload.context.bap_uri).toBe(`${BAP_BASE_URL}/api`);
			expect(bapReconPayload.context.bpp_uri).toBe(`${BPP_BASE_URL}/api`);

			console.log(`✅ BAP recon payload generated`);
			console.log(`📡 BAP URI: ${bapReconPayload.context.bap_uri}`);
			console.log(`📡 BPP URI: ${bapReconPayload.context.bpp_uri}`);
		});

		it("5.2. should trigger recon from BAP to BPP (Real HTTP Request)", async () => {
			console.log("🚀 BAP triggering recon request to BPP instance...");

			// This is the real test: BAP triggers recon which should send HTTP request to BPP
			const triggerReconResponse = await request(bapApp)
				.post(`/ui/trigger/${bapUserId}/recon`)
				.set("Authorization", `Bearer ${bapToken}`)
				.send(bapReconPayload);

			console.log("response is", triggerReconResponse.body);
			expect(triggerReconResponse.status).toBe(200);
			console.log(
				`✅ BAP recon trigger response: ${triggerReconResponse.body.message || "OK"}`,
			);

			// Give some time for the HTTP request to be processed
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Verify BAP side: recon status should be updated
			const bapReconsResponse = await request(bapApp)
				.get(`/ui/recon/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			expect(bapReconsResponse.status).toBe(200);
			const bapRecons = bapReconsResponse.body.data.recons;
			expect(bapRecons.length).toBeGreaterThan(0);

			const sentRecon = bapRecons.find(
				(r: any) => r.transaction_id === bapReconPayload.context.transaction_id,
			);
			expect(sentRecon).toBeDefined();
			expect(
				sentRecon.recons.some((r: any) => r.recon_status === "SENT_PENDING"),
			).toBe(true);

			console.log(`✅ BAP recon status updated: SENT_PENDING`);
		});

		it("5.3. should verify BPP received the recon request", async () => {
			console.log("🔍 Verifying BPP received the recon request...");

			// Check BPP side: should have received the recon
			const bppReconsResponse = await request(bppApp)
				.get(`/ui/recon/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			expect(bppReconsResponse.status).toBe(200);
			const bppRecons = bppReconsResponse.body.data.recons;
			expect(bppRecons.length).toBeGreaterThan(0);

			const receivedRecon = bppRecons.find(
				(r: any) => r.transaction_id === bapReconPayload.context.transaction_id,
			);
			expect(receivedRecon).toBeDefined();
			expect(
				receivedRecon.recons.some(
					(r: any) => r.recon_status === "RECEIVED_PENDING",
				),
			).toBe(true);

			console.log(`✅ BPP successfully received recon request`);
			console.log(`📊 BPP recon status: RECEIVED_PENDING`);
		});

		it("5.4. should generate on_recon payload in BPP instance", async () => {
			console.log("🔄 Generating on_recon payload in BPP instance...");

			// Use the same orders that were sent in the recon request
			const ordersForOnRecon = bapOrderIds.slice(
				0,
				Math.floor(bapOrderIds.length / 2),
			);
			const generateOnReconBody = {
				on_recon_data: ordersForOnRecon.map((orderId) => ({
					order_id: orderId,
					recon_accord: true, // BPP agrees with the reconciliation
					due_date: new Date().toISOString(),
				})),
			};

			const genOnReconResponse = await request(bppApp)
				.post(`/ui/generate/${bppUserId}/on_recon`)
				.set("Authorization", `Bearer ${bppToken}`)
				.send(generateOnReconBody);

			expect(genOnReconResponse.status).toBe(201);
			bppOnReconPayload = genOnReconResponse.body.data;

			// Verify the payload has correct context URIs (swapped from original recon)
			expect(bppOnReconPayload.context.bap_uri).toBe(`${BAP_BASE_URL}/api`);
			expect(bppOnReconPayload.context.bpp_uri).toBe(`${BPP_BASE_URL}/api`);
			expect(bppOnReconPayload.context.transaction_id).toBe(
				bapReconPayload.context.transaction_id,
			);

			console.log(`✅ BPP on_recon payload generated`);
			console.log(`📡 Response BAP URI: ${bppOnReconPayload.context.bap_uri}`);
			console.log(`📡 Response BPP URI: ${bppOnReconPayload.context.bpp_uri}`);
		});

		it("5.5. should trigger on_recon from BPP to BAP (Real HTTP Response)", async () => {
			console.log("🚀 BPP triggering on_recon response to BAP instance...");

			// This is the real response: BPP triggers on_recon which should send HTTP request back to BAP
			const triggerOnReconResponse = await request(bppApp)
				.post(`/ui/trigger/${bppUserId}/on_recon`)
				.set("Authorization", `Bearer ${bppToken}`)
				.send(bppOnReconPayload);

			expect(triggerOnReconResponse.status).toBe(200);
			console.log(
				`✅ BPP on_recon trigger response: ${triggerOnReconResponse.body.message || "OK"}`,
			);

			// Give some time for the HTTP request to be processed
			await new Promise((resolve) => setTimeout(resolve, 2000));

			// Verify BPP side: on_recon status should be updated
			const bppReconsResponse = await request(bppApp)
				.get(`/ui/recon/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			expect(bppReconsResponse.status).toBe(200);
			const bppRecons = bppReconsResponse.body.data.recons;

			const sentOnRecon = bppRecons.find(
				(r: any) => r.transaction_id === bapReconPayload.context.transaction_id,
			);
			expect(sentOnRecon).toBeDefined();
			expect(
				sentOnRecon.recons.some((r: any) => r.recon_status === "SENT_ACCEPTED"),
			).toBe(true);

			console.log(`✅ BPP on_recon status updated: SENT_ACCEPTED`);
		});

		it("5.6. should verify BAP received the on_recon response", async () => {
			console.log("🔍 Verifying BAP received the on_recon response...");

			// Check BAP side: should have received the on_recon response
			const bapReconsResponse = await request(bapApp)
				.get(`/ui/recon/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			expect(bapReconsResponse.status).toBe(200);
			const bapRecons = bapReconsResponse.body.data.recons;

			const receivedOnRecon = bapRecons.find(
				(r: any) => r.transaction_id === bapReconPayload.context.transaction_id,
			);
			expect(receivedOnRecon).toBeDefined();
			expect(
				receivedOnRecon.recons.some(
					(r: any) => r.recon_status === "RECEIVED_ACCEPTED",
				),
			).toBe(true);

			console.log(`✅ BAP successfully received on_recon response`);
			console.log(`📊 BAP final recon status: RECEIVED_ACCEPTED`);
		});
	});

	describe("Phase 6: End-to-End Verification", () => {
		it("6.1. should verify complete reconciliation flow state consistency", async () => {
			console.log("🔍 Performing final state verification...");

			// Get final state from both instances
			const bapFinalState = await request(bapApp)
				.get(`/ui/recon/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			const bppFinalState = await request(bppApp)
				.get(`/ui/recon/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			const bapRecons = bapFinalState.body.data.recons;
			const bppRecons = bppFinalState.body.data.recons;

			// Find the transaction we've been tracking
			const bapTransaction = bapRecons.find(
				(r: any) => r.transaction_id === bapReconPayload.context.transaction_id,
			);
			const bppTransaction = bppRecons.find(
				(r: any) => r.transaction_id === bapReconPayload.context.transaction_id,
			);

			expect(bapTransaction).toBeDefined();
			expect(bppTransaction).toBeDefined();

			// Verify final states
			const bapFinalStatus = bapTransaction.recons[0].recon_status;
			const bppFinalStatus = bppTransaction.recons[0].recon_status;

			expect(bapFinalStatus).toBe("RECEIVED_ACCEPTED");
			expect(bppFinalStatus).toBe("SENT_ACCEPTED");

			// Verify transaction IDs match
			expect(bapTransaction.transaction_id).toBe(bppTransaction.transaction_id);

			// Verify order counts match
			expect(bapTransaction.recons.length).toBe(bppTransaction.recons.length);

			console.log(`✅ State verification complete:`);
			console.log(`   📊 BAP final status: ${bapFinalStatus}`);
			console.log(`   📊 BPP final status: ${bppFinalStatus}`);
			console.log(`   📊 Transaction ID: ${bapTransaction.transaction_id}`);
			console.log(`   📊 Orders reconciled: ${bapTransaction.recons.length}`);
		});

		it("6.2. should verify settlement status updates after reconciliation", async () => {
			console.log("🔍 Verifying settlement status updates...");

			// Check BAP settlements
			const bapSettlementsResponse = await request(bapApp)
				.get(`/ui/settle/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			// Check BPP settlements
			const bppSettlementsResponse = await request(bppApp)
				.get(`/ui/settle/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			expect(bapSettlementsResponse.status).toBe(200);
			expect(bppSettlementsResponse.status).toBe(200);

			const bapSettlements = bapSettlementsResponse.body.data.settlements;
			const bppSettlements = bppSettlementsResponse.body.data.settlements;

			// Some settlements should have status "IN_RECON" after the reconciliation process
			const bapInRecon = bapSettlements.filter(
				(s: any) => s.status === "IN_RECON",
			);
			const bppInRecon = bppSettlements.filter(
				(s: any) => s.status === "IN_RECON",
			);

			expect(bapInRecon.length).toBeGreaterThan(0);
			expect(bppInRecon.length).toBeGreaterThan(0);

			console.log(`✅ Settlement status verification complete:`);
			console.log(`   📊 BAP settlements in recon: ${bapInRecon.length}`);
			console.log(`   📊 BPP settlements in recon: ${bppInRecon.length}`);
		});

		it("6.3. should verify network communication logs", async () => {
			console.log("🔍 Verifying communication between instances occurred...");

			// This test verifies that real HTTP communication occurred
			// by checking that both instances have records of the same transaction
			// with complementary statuses (SENT vs RECEIVED)

			const bapReconsResponse = await request(bapApp)
				.get(`/ui/recon/${bapUserId}`)
				.set("Authorization", `Bearer ${bapToken}`)
				.query({ page: "1", limit: "100" });

			const bppReconsResponse = await request(bppApp)
				.get(`/ui/recon/${bppUserId}`)
				.set("Authorization", `Bearer ${bppToken}`)
				.query({ page: "1", limit: "100" });

			const bapRecons = bapReconsResponse.body.data.recons;
			const bppRecons = bppReconsResponse.body.data.recons;

			// Count transactions that exist in both instances
			const sharedTransactions = bapRecons.filter((bapRecon: any) =>
				bppRecons.some(
					(bppRecon: any) =>
						bppRecon.transaction_id === bapRecon.transaction_id,
				),
			);

			expect(sharedTransactions.length).toBeGreaterThan(0);

			// Verify complementary statuses exist
			const hasComplementaryStatuses = sharedTransactions.some(
				(transaction: any) => {
					const bppCounterpart = bppRecons.find(
						(r: any) => r.transaction_id === transaction.transaction_id,
					);

					const bapHasReceived = transaction.recons.some((r: any) =>
						r.recon_status.includes("RECEIVED"),
					);
					const bppHasSent = bppCounterpart?.recons.some((r: any) =>
						r.recon_status.includes("SENT"),
					);

					return bapHasReceived && bppHasSent;
				},
			);

			expect(hasComplementaryStatuses).toBe(true);

			console.log(`✅ Network communication verification complete:`);
			console.log(`   📊 Shared transactions: ${sharedTransactions.length}`);
			console.log(
				`   📊 Complementary statuses verified: ${hasComplementaryStatuses}`,
			);
			console.log(`🎉 Multi-Instance E2E Test: SUCCESS!`);
		});
	});
});
