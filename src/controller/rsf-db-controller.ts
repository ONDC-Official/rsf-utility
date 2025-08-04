import { RsfPayloadDbService } from "../services/rsf-payloadDb-service";
import { GetRsfPayloadsParams } from "../types/rsf-payloads-params";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { Request, Response } from "express";
import { z } from "zod";
import { sendSuccess } from "../utils/resUtils";
export class RsfPayloadDbController {
	constructor(private rsfPayloadDbService: RsfPayloadDbService) {}

	getPayloads = async (req: Request, res: Response) => {
		try {
			const queryParams = req.query;
			const validationResult = GetRsfPayloadsParams.safeParse(queryParams);
			if (!validationResult.success) {
				logger.error(
					"Invalid query parameters for fetching RSF payloads",
					getLoggerMeta(req),
					validationResult.error,
				);
				return res.status(400).json({
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
			}
			logger.info("Fetching RSF payloads", getLoggerMeta(req), queryParams);
			const payloads = await this.rsfPayloadDbService.getRsfPayloads(
				validationResult.data,
			);
			// res.status(200).json(payloads);
			sendSuccess(res, payloads, "RSF payloads fetched successfully");
		} catch (error: any) {
			logger.error("Error fetching RSF payloads", getLoggerMeta(req), error);
			res.status(500).json({ message: error.message });
		}
	};
}
