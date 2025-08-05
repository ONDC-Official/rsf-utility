import { RsfOnAction } from "../../types/rsf-type";
import logger from "../../utils/logger";
import { OnSettleService } from "./on_settle-service";

const rsfLogger = logger.child("rsf-service");

export class RsfService {
	constructor(private onSettleService: OnSettleService) {}

	ingestRsfPayload = async (payload: any, action: RsfOnAction) => {
		rsfLogger.info("Ingesting RSF payload", { action });
		switch (action) {
			case "on_settle":
				await this.onSettleService.ingestOnsettlePayload(payload);
				break;
			case "recon":
				rsfLogger.info("Recon action is not implemented yet", { action });
				break;
			default:
				break;
		}
	};
}
