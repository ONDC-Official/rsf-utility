import { RsfPayload } from "../db/models/rsf-payload-model";
import {
	GetRsfPayloadsParamsType,
	RsfPayloadStructure,
} from "../types/rsf-payloads-params";
import logger from "../utils/logger";

export class RsfPayloadRepository {
	getRsfPayloads = async (params: GetRsfPayloadsParamsType) => {
		const skip = (params.page - 1) * params.limit;
		const query: Record<string, any> = {};
		if (params.action) {
			query["request.context.action"] = params.action;
		}
		if (params.transaction_id) {
			query["request.context.transaction_id"] = params.transaction_id;
		}
		if (params.settlement_type) {
			query["request.message.settlement.type"] = params.settlement_type;
		}
		if (params.settlement_id) {
			query["request.message.settlement.id"] = params.settlement_id;
		}
		logger.debug("get RsfPayloads query", query);
		return await RsfPayload.find(query)
			.skip(skip)
			.limit(params.limit)
			.sort({ createdAt: -1 });
	};

	async createRsfPayload(rsfPayload: RsfPayloadStructure) {
		logger.debug(
			"Creating RSF Payload",
			rsfPayload.requestData,
			rsfPayload.responseData,
		);
		return await RsfPayload.create({
			request: rsfPayload.requestData,
			response: {
				data: rsfPayload.responseData.body,
				statusCode: rsfPayload.responseData.statusCode,
			},
		});
	}
}
