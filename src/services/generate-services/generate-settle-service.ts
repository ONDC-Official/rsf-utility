import { SettleType } from "../../schema/models/settle-schema";
import { SettleDbManagementService } from "../settle-service";
import logger from "../../utils/logger";
import { UserService } from "../user-service";
import { generateMiscFile } from "../../utils/settle-utils/generate-misc-file";
import { generateNilFile } from "../../utils/settle-utils/generate-nil-file";
import { generateSettlePayload } from "../../utils/settle-utils/generate-settle-payload";

const settleLogger = logger.child("generate-settle-service");
export class GenerateSettleService {
	constructor(
		private settleService: SettleDbManagementService,
		private userService: UserService,
	) {}

	async generateSettlePayloads(userId: string, orderIds: string[]) {
		settleLogger.info("Generating settlements for user", {
			userId,
			orderIds,
		});
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}
		const userConfig = await this.userService.getUserById(userId);
		let uniqueId = "";
		const settlements: SettleType[] = [];
		for (const orderId of orderIds) {
			if (!(await this.settleService.checkUniqueSettlement(userId, orderId))) {
				throw new Error(
					`Settlement for order ID ${orderId} does not exist for config ID: ${userId}`,
				);
			}
			const settlement = await this.settleService.getSettlements(userId, {
				order_id: orderId,
			});
			if (!settlement || settlement.length === 0) {
				throw new Error(
					`Settlement for order ID ${orderId} does not exist for config ID: ${userId}`,
				);
			}
			const settleData = settlement[0];
			if (settleData.status === "SETTLED") {
				throw new Error(
					`Settlement for order ID ${orderId} is already settled for config ID: ${userId}`,
				);
			}
			const validId = `${settleData.collector_id}-${settleData.receiver_id}`;
			if (uniqueId == "") {
				uniqueId = validId;
			}
			if (uniqueId !== validId) {
				throw new Error(
					`Collector and Receiver IDs do not match for order ID ${orderId} in config ID: ${userId}`,
				);
			}
			settlements.push(settleData);
		}
		if (settlements.length === 0) {
			throw new Error("No settlements to generate payloads for");
		}
		return generateSettlePayload(userConfig, settlements);
	}

	async generateMiscPayload(userId: string, miscData: any) {
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const userConfig = await this.userService.getUserById(userId);

		return generateMiscFile(userConfig, miscData);
	}

	async generateNilPayload(userId: string) {
		if (!(await this.userService.checkUserById(userId))) {
			throw new Error("User not found");
		}

		const userConfig = await this.userService.getUserById(userId);

		return generateNilFile(userConfig);
	}
}
