import { RsfPayloadRepository } from "../repositories/rsf-payload-repository";
import {
	GetRsfPayloadsParamsType,
	RsfPayloadStructure,
} from "../types/rsf-payloads-params";
import logger from "../utils/logger";

const rsfPayloadLogger = logger.child("rsf-payload-db-service");
export class RsfPayloadDbService {
	constructor(private rsfPayloadRepository: RsfPayloadRepository) {}
	getRsfPayloads = async (params: GetRsfPayloadsParamsType) => {
		try {
			return this.rsfPayloadRepository.getRsfPayloads(params);
		} catch (error) {
			rsfPayloadLogger.error("Error fetching Rsf Payloads", { params }, error);
		}
	};

	saveRsfPayload = async (rsfPayload: RsfPayloadStructure) => {
		try {
			const item = await this.rsfPayloadRepository.createRsfPayload(rsfPayload);
			return item;
		} catch (error) {
			rsfPayloadLogger.error("Error saving Rsf Payload", {}, error);
		}
	};
}
