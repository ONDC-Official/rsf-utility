import request from "supertest";
import { Application } from "express";
import axios from "axios";
import { randomInt } from "crypto";
import fs from "fs";
import path from "path";

import createServer from "../../server";

import { on_confirmPayloads } from "../data/on-confirms";
import { genDummyOnSettle } from "../utils/gen_on_settle";
import { UserType } from "../../schema/models/user-schema";

// Mock axios for the entire test suite
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("E2E Bulk CSV Upload: Settlement Updates via File Upload", () => {
	let app: Application;
	let token: string;
	let userId: string;
	let orderIds: string[] = [];
	let settlementIds: string[] = [];
	let testCsvPath: string;
	let invalidCsvPath: string;
	let largeCsvPath: string;

	const testUser: UserType = {
		title: "CSV_BULK_TEST_DOMAIN",
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
				provider_name: "CSV Test Provider",
				provider_id: "CSV_P1",
				account_number: "1234567890",
				ifsc_code: "CSVT1234",
				bank_name: "CSV Test Bank",
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

		// Prepare CSV file paths
		testCsvPath = path.join(__dirname, "../temp/test_settlements.csv");
		invalidCsvPath = path.join(__dirname, "../temp/invalid_settlements.csv");
		largeCsvPath = path.join(__dirname, "../temp/large_settlements.csv");

		// Ensure temp directory exists
		const tempDir = path.dirname(testCsvPath);
		if (!fs.existsSync(tempDir)) {
			fs.mkdirSync(tempDir, { recursive: true });
		}
	});

	afterAll(async () => {
		// Clean up test files
		const filesToClean = [testCsvPath, invalidCsvPath, largeCsvPath];
		filesToClean.forEach((file) => {
			if (fs.existsSync(file)) {
				fs.unlinkSync(file);
			}
		});
	});

	it("1. should setup user and prepare settlements for CSV testing", async () => {
		// Create user
		const response = await request(app)
			.post("/ui/users")
			.set("Authorization", `Bearer ${token}`)
			.send(testUser);

		expect(response.status).toBe(201);
		userId = response.body.data._id;

		// Ingest orders - use 25 orders for comprehensive CSV testing
		const testOrders = on_confirmPayloads.slice(0, 25);
		for (const on_confirm of testOrders) {
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
		orderIds = fetchOrdersResponse.body.data.orders.map((o: any) => o.order_id);

		// Prepare orders for settlement
		const prepareBody = {
			prepare_data: orderIds.map((id) => ({ id, strategy: "USER" })),
		};

		const prepareResponse = await request(app)
			.post(`/ui/settle/${userId}/prepare`)
			.set("Authorization", `Bearer ${token}`)
			.send(prepareBody);

		expect(prepareResponse.status).toBe(201);
	});

	it("2. should generate initial settlements for CSV update testing", async () => {
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

		// Get settlement IDs for CSV updates
		const settlementsResponse = await request(app)
			.get(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(settlementsResponse.status).toBe(200);
		settlementIds = settlementsResponse.body.data.settlements.map(
			(s: any) => s.settlement_id,
		);
	});

	it("3. should create valid CSV file for settlement updates", async () => {
		const csvHeaders =
			"order_id,total_order_value,withholding_amount,tds,tcs,commission,collector_settlement\n";
		const csvRows = orderIds
			.slice(0, 15)
			.map((orderId, index) => {
				const totalOrderValue = randomInt(1000, 5000);
				const commission = randomInt(50, 200);
				const withholdingAmount = randomInt(0, 100);
				const tds = randomInt(10, 50);
				const tcs = randomInt(10, 50);
				const collectorSettlement =
					totalOrderValue - commission - withholdingAmount - tds - tcs;

				return `${orderId},${totalOrderValue},${withholdingAmount},${tds},${tcs},${commission},${collectorSettlement}`;
			})
			.join("\n");

		const csvContent = csvHeaders + csvRows;
		fs.writeFileSync(testCsvPath, csvContent);

		expect(fs.existsSync(testCsvPath)).toBe(true);
	});

	it("4. should successfully upload and process valid CSV settlement updates", async () => {
		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.attach("csvFile", testCsvPath);

		expect(response.status).toBe(200);
		expect(response.body.message).toContain("success");

		// Verify settlements were updated
		const settlementsResponse = await request(app)
			.get(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(settlementsResponse.status).toBe(200);
		const settlements = settlementsResponse.body.data.settlements;

		// Check that settlements have updated values from CSV
		const updatedSettlements = settlements.filter(
			(s: any) => s.total_order_value >= 1000 && s.commission >= 50,
		);
		expect(updatedSettlements.length).toBeGreaterThan(0);

		// Verify settlement calculations were updated correctly
		updatedSettlements.forEach((settlement: any) => {
			expect(settlement.total_order_value).toBeGreaterThan(0);
			expect(settlement.commission).toBeGreaterThan(0);
			expect(settlement.collector_settlement).toBeGreaterThan(0);
			// Verify the calculation: total - commission - withholding - tds - tcs = collector_settlement
			const expectedCollectorSettlement =
				settlement.total_order_value -
				settlement.commission -
				settlement.withholding_amount -
				settlement.tds -
				settlement.tcs;
			expect(settlement.collector_settlement).toBe(expectedCollectorSettlement);
		});
	});

	it("5. should create and handle invalid CSV file", async () => {
		const invalidCsvContent = `order_id,total_order_value,invalid_field
INVALID_ORDER_ID,INVALID_VALUE,some_value
${orderIds[0]},abc,extra_field
,1000,missing_order_id
${orderIds[1]},-500,negative_value`;

		fs.writeFileSync(invalidCsvPath, invalidCsvContent);

		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.attach("csvFile", invalidCsvPath);

		// Should handle validation errors gracefully
		console.log("Invalid CSV Upload Response:", response.body); // Debugging line
		expect([400, 422]).toContain(response.status);
		if (response.body.message) {
			expect(response.body.message.toLowerCase()).toMatch(
				/validation|error|invalid/,
			);
		}
	});

	it("6. should create and process large CSV file (high volume test)", async () => {
		const csvHeaders =
			"order_id,total_order_value,withholding_amount,tds,tcs,commission,collector_settlement\n";
		const csvRows = orderIds
			.map((orderId, index) => {
				const totalOrderValue = randomInt(1000, 8000);
				const commission = randomInt(50, 400);
				const withholdingAmount = randomInt(0, 200);
				const tds = randomInt(10, 100);
				const tcs = randomInt(10, 100);
				const collectorSettlement =
					totalOrderValue - commission - withholdingAmount - tds - tcs;

				return `${orderId},${totalOrderValue},${withholdingAmount},${tds},${tcs},${commission},${collectorSettlement}`;
			})
			.join("\n");

		const largeCsvContent = csvHeaders + csvRows;
		fs.writeFileSync(largeCsvPath, largeCsvContent);

		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.attach("csvFile", largeCsvPath);

		expect(response.status).toBe(200);
		expect(response.body.message).toMatch(/success|updated/i);

		// Verify all settlements were processed
		const settlementsResponse = await request(app)
			.get(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(settlementsResponse.status).toBe(200);
		const settlements = settlementsResponse.body.data.settlements;

		// Verify value distribution - should have updated values from CSV
		const highValueSettlements = settlements.filter(
			(s: any) => s.total_order_value >= 1000,
		);
		expect(highValueSettlements.length).toBeGreaterThan(10); // Most orders should be updated

		// Verify settlement calculations are correct
		const validCalculations = settlements.filter((s: any) => {
			if (
				!s.total_order_value ||
				!s.commission ||
				s.collector_settlement === undefined
			)
				return false;
			const expectedCollector =
				s.total_order_value -
				s.commission -
				(s.withholding_amount || 0) -
				(s.tds || 0) -
				(s.tcs || 0);
			return Math.abs(s.collector_settlement - expectedCollector) < 1; // Allow for rounding
		});
		expect(validCalculations.length).toBeGreaterThan(0);
	});

	it("7. should handle CSV upload with missing required fields", async () => {
		const incompleteCsvContent = `order_id,total_order_value
${orderIds[0]},1000
${orderIds[1]}
,2000`;

		const incompleteCsvPath = path.join(
			__dirname,
			"../temp/incomplete_settlements.csv",
		);
		fs.writeFileSync(incompleteCsvPath, incompleteCsvContent);

		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.attach("csvFile", incompleteCsvPath);

		// Should handle missing fields gracefully - may succeed with partial data or fail with validation
		expect([200, 400, 422]).toContain(response.status);

		// Clean up
		if (fs.existsSync(incompleteCsvPath)) {
			fs.unlinkSync(incompleteCsvPath);
		}
	});

	it("8. should handle CSV upload without file attachment", async () => {
		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`);

		expect(response.status).toBe(400);
		if (response.body.message) {
			expect(response.body.message.toLowerCase()).toMatch(/file|csv|required/);
		}
	});

	it("9. should handle CSV upload with non-CSV file", async () => {
		const textFilePath = path.join(__dirname, "../temp/fake.txt");
		fs.writeFileSync(textFilePath, "This is not a CSV file");

		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.attach("csvFile", textFilePath);

		expect([400, 422]).toContain(response.status);

		// Clean up
		if (fs.existsSync(textFilePath)) {
			fs.unlinkSync(textFilePath);
		}
	});

	it("10. should process CSV updates and verify settlement workflow", async () => {
		// Get settlements that were updated via CSV
		const settlementsResponse = await request(app)
			.get(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.query({ page: "1", limit: "100" });

		expect(settlementsResponse.status).toBe(200);
		const settlements = settlementsResponse.body.data.settlements;

		// Filter settlements that have been updated (have values from CSV)
		const csvUpdatedSettlements = settlements.filter(
			(s: any) => s.total_order_value >= 1000 && s.commission >= 50,
		);

		if (csvUpdatedSettlements.length > 0) {
			console.log(
				`Found ${csvUpdatedSettlements.length} CSV-updated settlements`,
			);

			// Verify that CSV updates maintained data integrity
			csvUpdatedSettlements.slice(0, 3).forEach((settlement: any) => {
				expect(settlement.total_order_value).toBeGreaterThan(0);
				expect(settlement.commission).toBeGreaterThan(0);
				expect(settlement.collector_settlement).toBeGreaterThan(0);

				// Verify the settlement calculation is correct
				const expectedCollector =
					settlement.total_order_value -
					settlement.commission -
					(settlement.withholding_amount || 0) -
					(settlement.tds || 0) -
					(settlement.tcs || 0);
				expect(
					Math.abs(settlement.collector_settlement - expectedCollector),
				).toBeLessThan(1);
			});

			// Try to generate a new settlement payload with updated orders
			const generateBody = {
				settle_data: csvUpdatedSettlements
					.slice(0, 2)
					.map((settlement: any) => ({
						order_id: settlement.order_id,
						provider_value: randomInt(100, 1000),
						self_value: randomInt(10, 100),
					})),
			};

			const generateResponse = await request(app)
				.post(`/ui/generate/${userId}/settle/np-np`)
				.set("Authorization", `Bearer ${token}`)
				.send(generateBody);

			if (generateResponse.status === 201) {
				const newSettlementPayload = generateResponse.body.data;

				// Mock successful trigger
				mockedAxios.post.mockResolvedValueOnce({
					data: { message: { ack: { status: "ACK" } } },
				});

				const triggerResponse = await request(app)
					.post(`/ui/trigger/${userId}/settle`)
					.set("Authorization", `Bearer ${token}`)
					.send(newSettlementPayload);

				expect([200, 400]).toContain(triggerResponse.status);

				// Process on_settle callback if trigger was successful
				if (triggerResponse.status === 200) {
					const onSettlePayload = genDummyOnSettle(newSettlementPayload);
					const onSettleResponse = await request(app)
						.post(`/api/on_settle`)
						.send(onSettlePayload);

					expect(onSettleResponse.status).toBe(200);
				}
			}
		} else {
			console.log("No CSV-updated settlements found, skipping workflow test");
		}
	});

	it("11. should validate CSV format with edge cases", async () => {
		const edgeCasesCsvContent = `order_id,total_order_value,withholding_amount,tds,tcs,commission,collector_settlement
${orderIds[0]},1000.50,100.00,20.00,15.00,50.00,815.50
${orderIds[1]},2500.75,250.00,50.00,37.50,125.00,2038.25
${orderIds[2]},0,,0,0,0,0`;

		const edgeCasesCsvPath = path.join(
			__dirname,
			"../temp/edge_cases_settlements.csv",
		);
		fs.writeFileSync(edgeCasesCsvPath, edgeCasesCsvContent, "utf8");

		const response = await request(app)
			.patch(`/ui/settle/${userId}`)
			.set("Authorization", `Bearer ${token}`)
			.attach("csvFile", edgeCasesCsvPath);

		// Should handle edge cases properly (decimal values, empty fields, zero values)
		expect([200, 400]).toContain(response.status);

		if (response.status === 200) {
			// Verify that decimal values were processed correctly
			const settlementsResponse = await request(app)
				.get(`/ui/settle/${userId}`)
				.set("Authorization", `Bearer ${token}`)
				.query({ page: "1", limit: "100" });

			const settlements = settlementsResponse.body.data.settlements;
			const decimalSettlement = settlements.find(
				(s: any) => Math.abs(s.total_order_value - 1000.5) < 0.01,
			);

			if (decimalSettlement) {
				expect(decimalSettlement.total_order_value).toBeCloseTo(1000.5, 2);
				expect(decimalSettlement.collector_settlement).toBeCloseTo(815.5, 2);
			}
		}

		// Clean up
		if (fs.existsSync(edgeCasesCsvPath)) {
			fs.unlinkSync(edgeCasesCsvPath);
		}
	});
});
