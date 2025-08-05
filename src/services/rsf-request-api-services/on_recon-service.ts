import { SettleDbManagementService } from "../settle-service";
import logger from "../../utils/logger";

const rsfLogger = logger.child("on-recon-request-service");
export class OnReconRequestService {
	constructor(private settleDbManagementService: SettleDbManagementService) {}

	ingestOnReconPayload = async (payload: any) => {
		// return {};
		throw new Error("Method not implemented.");
	};
}
