/*
//     1. Create a new user
//     2. create a order
//     3. prepare a settlement
//     4. generate & trigger a settlement
//     5. get on_settle with "NOT_SETTLED"
//     6. generate & trigger recon
//     7. get on_recon
//     8. move to ready
// */
import request from "supertest";
import createServer from "../../server";
import { UserType } from "../../schema/models/user-schema";
import { Application } from "express";
import { on_confirmPayloads } from "../data/on-confirms";
import { randomInt } from "crypto";
import { writeFileSync } from "fs";
import path from "path";

import axios from "axios";

import { genDummyOnSettle } from "../utils/gen_on_settle";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Happy Flow Integration Tests", () => {
	let app: Application;
	beforeAll(async () => {
		app = createServer();
		// await connectDB();
	});

	describe("Flow 1: User Creation and Order Processing", () => {
		it(
			"should create a user and process an order",
			async () => {
				const userData: UserType = {
					title: "TEST_DOMAIN",
					role: "BAP",
					domain: "ONDC:RET10",
					subscriber_url: "https://dev-automation.ondc.org/buyer",
					np_tcs: 3,
					np_tds: 6,
					pr_tcs: 9,
					pr_tds: 3,
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
				const authResponse = await request(app)
					.post("/ui/auth/sign-token")
					.send({
						client_id: process.env.CLIENT_ID,
						expires: "7d",
					});
				const token = authResponse.body.data.token;
				const userResponse = await request(app)
					.post("/ui/users")
					.set("Authorization", `Bearer ${token}`)
					.send(userData);
				console.log(userResponse.body, "User Creation Response");
				const userId = userResponse.body.data._id;

				// post orders
				for (const on_confirm of on_confirmPayloads.slice(0, 20)) {
					const data = await request(app)
						.post("/api/on_confirm")
						.send(on_confirm);
					console.log(data.body, "On Confirm Response");
					expect(data.status).toBe(200);
				}
				console.log("User created and orders processed successfully");
				const fetchOrders = await request(app)
					.get(`/ui/orders/${userId}`)
					.set("Authorization", `Bearer ${token}`);

				const orderIds: string[] = fetchOrders.body.data.map(
					(o: any) => o.order_id,
				);
				expect(fetchOrders.status).toBe(200);
				console.log(orderIds, "Fetched Orders");

				// 20 random orders list
				const randomOrders = [];
				for (const orderId of orderIds) {
					randomOrders.push(orderId);
				}
				console.log(randomOrders, "Random Orders");

				// prepare body:
				const prepBody = {
					prepare_data: [
						...randomOrders.map((orderId) => ({
							id: orderId,
							strategy: "USER",
						})),
					],
				};

				const prepareResponse = await request(app)
					.post("/ui/settle/" + userId + "/prepare")
					.set("Authorization", `Bearer ${token}`)
					.send(prepBody);

				console.log(prepareResponse.body, "Prepare Response");
				expect(prepareResponse.status).toBe(201);

				// GET settlements with query
				const settlementsResponse = await request(app)
					.get(`/ui/settle/${userId}`)
					.set("Authorization", `Bearer ${token}`)
					.query({ page: "1", limit: "20" });

				const settlements = settlementsResponse.body.data.settlements;
				console.log("Settlements Fetched", settlements.length);
				expect(settlementsResponse.status).toBe(200);

				const generateBody = {
					settle_data: [
						...orderIds.map((orderId) => ({
							order_id: orderId,
							provider_value: randomInt(100, 1000),
							self_value: randomInt(10, 100),
						})),
					],
				};
				const generateResponse = await request(app)
					.post(`/ui/generate/${userId}/settle/np-np`)
					.set("Authorization", `Bearer ${token}`)
					.send(generateBody);
				console.log("Settle Generated");
				writeFileSync(
					path.resolve(__dirname, "../generations/generate-settle.json"),
					JSON.stringify(generateResponse.body.data, null, 2),
				);
				const settlePayload = generateResponse.body.data;
				const fakeAgencyResponse = {
					message: {
						ack: {
							status: "ACK",
						},
					},
				};
				mockedAxios.post.mockResolvedValueOnce({ data: fakeAgencyResponse });
				// mocking the trigger response
				const triggerResponse = await request(app)
					.post(`/ui/trigger/${userId}/settle`)
					.set("Authorization", `Bearer ${token}`)
					.send(settlePayload);
				console.log("Settle Triggered", triggerResponse.body);
				expect(triggerResponse.status).toBe(200);

				const onSettle = genDummyOnSettle(settlePayload);
				writeFileSync(
					path.resolve(__dirname, "../generations/fake_on_settle.json"),
					JSON.stringify(onSettle, null, 2),
				);
				// Get on_settle with NOT_SETTLED
				const onSettleResponse = await request(app)
					.post(`/api/on_settle`)
					.send(onSettle);

				console.log("On Settle Response", onSettleResponse.body);
				expect(onSettleResponse.status).toBe(200);

				// get recons for half of the orders send recons for half of the orders
				const sendReconOrderIds = orderIds.slice(0, orderIds.length / 2);
				const getReconOrderIds = orderIds.slice(orderIds.length / 2);

				const genReconResponse = await request(app)
					.post(`/ui/generate/${userId}/recon`)
					.set("Authorization", `Bearer ${token}`)
					.send({
						recon_data: [
							...sendReconOrderIds.map((orderId) => ({
								order_id: orderId,
							})),
						],
					});
				console.log("Recon Generated");
				writeFileSync(
					path.resolve(__dirname, "../generations/generate-recon.json"),
					JSON.stringify(genReconResponse.body.data, null, 2),
				);
				const reconPayload = genReconResponse.body.data;
				expect(genReconResponse.status).toBe(201);
			},
			20 * 60 * 1000,
		); // 20 minutes timeout
	});
});
