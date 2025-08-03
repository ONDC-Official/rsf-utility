import { RsfOnAction } from "../../types/rsf-type";
import logger from "../../utils/logger";
import { OnSettleService } from "./on_settle-service";

const rsfLogger = logger.child("rsf-service");

export class RsfService {
	constructor(private onSettleService: OnSettleService) {}

	ingestRsfPayload = async (payload: any, action: RsfOnAction) => {
		logger.info("Ingesting RSF payload", { action });
	};
}
