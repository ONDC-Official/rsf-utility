// duplicate transaction id test

import { writeFileSync } from "fs";
import { SettleAgencyConfig } from "../config/rsf-utility-instance-config";
import { createHeader } from "../utils/header-utils";
import { triggerRequest } from "../utils/trigger-utils";
import { v4 as uuidv4 } from "uuid";
import path from "path";
const settlePayload = {
	context: {
		domain: "ONDC:NTS10",
		location: {
			country: {
				code: "IND",
			},
			city: {
				code: "*",
			},
		},
		version: "2.0.0",
		action: "settle",
		bap_id: "fis-staging.ondc.org",
		bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		bpp_id: "sa_nocs.nbbl.com",
		bpp_uri: "https://ondcnbbl.npci.org.in/nocs/v2",
		transaction_id: uuidv4(),
		message_id: uuidv4(),
		timestamp: "2025-08-19T06:04:45.046Z",
		ttl: "P1D",
	},
	message: {
		collector_app_id: "BuyerTestdata2.com",
		receiver_app_id: "fis-staging.ondc.org",
		settlement: {
			type: "NP-NP",
			id: "6f2d218e-1f70-417c-9904-fabda13fd81c",
			orders: [
				{
					id: "50333",
					inter_participant: {
						amount: {
							currency: "INR",
							value: "203.92",
						},
					},
					collector: {
						amount: {
							currency: "INR",
							value: "7.08",
						},
					},
				},
			],
		},
	},
};

export async function testTrigger() {
	settlePayload.context.timestamp = new Date().toISOString();
	let header = await createHeader({
		action: "settle",
		data: settlePayload,
		forwardingBaseUrl: SettleAgencyConfig.agencyUrl,
	});
	const response = await triggerRequest(
		{
			action: "settle",
			data: settlePayload,
			forwardingBaseUrl: SettleAgencyConfig.agencyUrl,
		},
		header,
	);
	console.log("Response:", response?.data);
	saveNpciData(settlePayload);
	await delay(5000);
	settlePayload.context.message_id = uuidv4();
	settlePayload.context.timestamp = new Date().toISOString();
	header = await createHeader({
		action: "settle",
		data: settlePayload,
		forwardingBaseUrl: SettleAgencyConfig.agencyUrl,
	});
	const duplicateResponse = await triggerRequest(
		{
			action: "settle",
			data: settlePayload,
			forwardingBaseUrl: SettleAgencyConfig.agencyUrl,
		},
		header,
	);
	saveNpciData(settlePayload);
	console.log("Duplicate Response:", duplicateResponse?.data);
}

async function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function saveNpciData(payload: any) {
	const filePath = "./npci-data.csv";
	const txId = payload.context.transaction_id;
	const messageId = payload.context.message_id;
	const timestamp = payload.context.timestamp;
	const data = `${txId},${messageId},${timestamp}\n`;
	try {
		writeFileSync(path.resolve(__dirname, filePath), data, { flag: "a" });
		console.log(`Data saved to ${filePath}`);
	} catch (error) {
		console.error("Error saving data:", error);
	}
}
