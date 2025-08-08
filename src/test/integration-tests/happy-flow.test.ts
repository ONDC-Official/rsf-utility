// // /*
// //     1. Create a new user
// //     2. create a order
// //     3. prepare a settlement
// //     4. generate & trigger a settlement
// //     5. get on_settle with "NOT_SETTLED"
// //     6. generate & trigger recon
// //     7. get on_recon
// //     8. move to ready
// // */
// import request from "supertest";
// import { createServer } from "http";
// import { UserType } from "../../schema/models/user-schema";

// describe("Happy Flow Integration Tests", async () => {
// 	const app = createServer();
// 	const userData: UserType = {
// 		title: "TEST_DOMAIN",
// 		role: "BAP",
// 		domain: "ONDC:RET10",
// 		subscriber_url: "http://test-subscriber.com",
// 		np_tcs: 123,
// 		np_tds: 456,
// 		pr_tcs: 789,
// 		pr_tds: 23,
// 		msn: false,
// 		provider_details: [
// 			{
// 				provider_id: "provider123",
// 				account_number: "1234567890",
// 				ifsc_code: "IFSC1234",
// 				bank_name: "Bank ABC",
// 			},
// 		],
// 		counterparty_ids: [],
// 	};

// 	const userResponse = await request(app).post("/users").send(userData);
// 	console.log("User created:", userResponse.body);
// });
