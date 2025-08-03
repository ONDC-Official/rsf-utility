import logger from "../../utils/logger";
import { SettleDbManagementService } from "../settle-service";

const onSettleLogger = logger.child("on-settle-service");
export class OnSettleService {
	constructor(settleService: SettleDbManagementService) {}
}
