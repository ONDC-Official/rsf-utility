import logger from "../../utils/logger";
import { SettleDbManagementService } from "../settle-service";
import { UserService } from "../user-service";

const onReconLogger = logger.child("generate-on-recon-service");
export class GenerateOnReconService {
	constructor(
		private settleService: SettleDbManagementService,
		private userService: UserService,
	) {}
	async generateOnReconPayload(userId: string) {}
}
