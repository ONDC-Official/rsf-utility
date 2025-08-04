import { RsfPayloadRepository } from "../repositories/rsf-payload-repository";
import {
	GetRsfPayloadsParamsType,
	RsfPayloadStructure,
} from "../types/rsf-payloads-params";

export class RsfPayloadDbService {
	constructor(private rsfPayloadRepository: RsfPayloadRepository) {}
	getRsfPayloads = async (params: GetRsfPayloadsParamsType) => {
		return this.rsfPayloadRepository.getRsfPayloads(params);
	};

	saveRsfPayload = async (rsfPayload: RsfPayloadStructure) => {
		return this.rsfPayloadRepository.createRsfPayload(rsfPayload);
	};
}
