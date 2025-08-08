import { OndcSyncResponse, RsfOnAction } from "../../types/rsf-type";
import { getNackResponse } from "../../utils/ackUtils";
import logger from "../../utils/logger";
import { OnReconRequestService } from "./on_recon-service";
import { OnSettleService } from "./on_settle-service";
import { ReconRequestService } from "./recon-api-service";

const rsfLogger = logger.child("rsf-service");

export class RsfService {
	constructor(
		private onSettleService: OnSettleService,
		private reconRequestService: ReconRequestService,
		private onReconRequestService: OnReconRequestService,
	) {}

	ingestRsfPayload = async (
		payload: any,
		action: RsfOnAction,
	): Promise<OndcSyncResponse> => {
		rsfLogger.info("Ingesting RSF payload", { action });
		switch (action) {
			case "on_settle":
				return await this.onSettleService.ingestOnSettlePayload(payload);
			case "recon":
				return await this.reconRequestService.ingestReconPayload(payload);
			case "on_recon":
				return await this.onReconRequestService.ingestOnReconPayload(payload);
			default:
				break;
		}
		return getNackResponse("503");
	};
}
