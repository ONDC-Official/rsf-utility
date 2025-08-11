import { SettleDbManagementService } from "../services/settle-service";
import logger from "../utils/logger";
import { Request, Response } from "express";
import { getLoggerMeta } from "../utils/utility";
import {
	GetSettlementsQuerySchema,
	UpdateSettlementSchema,
	UpdateSettlementType,
} from "../types/settle-params";
import { z } from "zod";
import { validateUserId } from "../types/user-id-type";
import { sendError, sendSuccess } from "../utils/resUtils";
import { SettleType } from "../schema/models/settle-schema";

const settleLogger = logger.child("settle-controller");

export class SettleController {
	constructor(private settleService: SettleDbManagementService) {}

	getSettlements = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Fetching settlements", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}
			const validationResult = GetSettlementsQuerySchema.safeParse(req.query);
			if (!validationResult.success) {
				settleLogger.error(
					"Invalid query parameters",
					getLoggerMeta(req),
					validationResult.error,
				);

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Invalid query parameters",
					errors: z.treeifyError(validationResult.error),
				});
			}
			const data = await this.settleService.getSettlements(
				userId,
				validationResult.data,
			);
			settleLogger.info("Settlements fetched successfully", getLoggerMeta(req));

			return sendSuccess(res, data, "Settlements fetched successfully");
			// res.status(200).json(data);
		} catch (error: any) {
			settleLogger.error(
				"Error fetching settlements",
				getLoggerMeta(req),
				error,
			);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	updateSettlements = async (req: Request, res: Response) => {
		try {
			settleLogger.info("Updating settlement", getLoggerMeta(req));
			const userId = req.params.userId;
			if (!validateUserId(userId)) {
				settleLogger.error("Valid User ID is required", getLoggerMeta(req));

				return sendError(res, "INVALID_QUERY_PARAMS", undefined, {
					message: "Valid User ID is required",
				});
			}

			let settlementData: {
				settlements: Partial<SettleType>[];
			};

			// Check if CSV data was uploaded
			if ((req as any).processedCsvData) {
				settleLogger.info(
					"Processing CSV data for settlement update",
					getLoggerMeta(req),
				);
				settlementData = this.convertCsvToSettlementData(
					(req as any).processedCsvData.data,
				);
			} else {
				// Handle JSON body request
				const validationResult = UpdateSettlementSchema.safeParse(req.body);
				if (!validationResult.success) {
					settleLogger.error(
						"Invalid body",
						getLoggerMeta(req),
						validationResult.error,
					);

					return sendError(res, "INVALID_REQUEST_BODY", undefined, {
						message: "Invalid body",
						errors: z.treeifyError(validationResult.error),
					});
				}
				settlementData = validationResult.data;
			}

			const convertedData = settlementData.settlements.map(
				(settlement: any) => ({
					orderId: settlement.order_id,
					settlement: this.getUpdateData(settlement),
				}),
			);

			logger.info("Updating settlements", {
				userId,
				settlements: convertedData,
			});

			const updated = await this.settleService.updateMultipleSettlements(
				userId,
				convertedData,
			);

			settleLogger.info("Settlement updated successfully", {
				...getLoggerMeta(req),
				dataSource: (req as any).processedCsvData ? "CSV" : "JSON",
			});

			return sendSuccess(res, updated, "Settlement updated successfully");
		} catch (error: any) {
			settleLogger.error(
				"Error updating settlement",
				getLoggerMeta(req),
				error,
			);

			return sendError(res, "INTERNAL_ERROR", undefined, {
				error: error.message,
			});
		}
	};

	private getUpdateData(data: UpdateSettlementType["settlements"][number]) {
		const settlePartialData: Partial<SettleType> = {};
		if (data.total_order_value !== undefined) {
			settlePartialData.total_order_value = data.total_order_value;
		}
		if (data.withholding_amount !== undefined) {
			settlePartialData.withholding_amount = data.withholding_amount;
		}
		if (data.tds !== undefined) {
			settlePartialData.tds = data.tds;
		}
		if (data.tcs !== undefined) {
			settlePartialData.tcs = data.tcs;
		}
		if (data.commission !== undefined) {
			settlePartialData.commission = data.commission;
		}
		if (data.collector_settlement !== undefined) {
			settlePartialData.collector_settlement = data.collector_settlement;
		}
		if (data.inter_np_settlement !== undefined) {
			settlePartialData.inter_np_settlement = data.inter_np_settlement;
		}
		return settlePartialData;
	}

	/**
	 * Convert CSV data to settlement update format
	 * Expected CSV columns: order_id, total_order_value, withholding_amount, tds, tcs, commission, collector_settlement, inter_np_settlement
	 * @param csvData - Array of CSV row data
	 * @returns Object containing settlements array
	 * @throws Error if required fields are missing or invalid
	 */
	private convertCsvToSettlementData(csvData: any[]): {
		settlements: Partial<SettleType>[];
	} {
		settleLogger.info("Converting CSV data to settlement format", {
			rowCount: csvData.length,
		});

		const settlements = csvData.map((row, index) => {
			// Validate required fields
			if (!row.order_id) {
				throw new Error(`Row ${index + 1}: order_id is required`);
			}

			const settlement: any = {
				order_id: row.order_id.toString().trim(),
			};

			// Convert numeric fields if present
			if (row.total_order_value !== undefined && row.total_order_value !== "") {
				settlement.total_order_value = parseFloat(row.total_order_value);
				if (isNaN(settlement.total_order_value)) {
					throw new Error(`Row ${index + 1}: invalid total_order_value`);
				}
			}

			if (
				row.withholding_amount !== undefined &&
				row.withholding_amount !== ""
			) {
				settlement.withholding_amount = parseFloat(row.withholding_amount);
				if (isNaN(settlement.withholding_amount)) {
					throw new Error(`Row ${index + 1}: invalid withholding_amount`);
				}
			}

			if (row.tds !== undefined && row.tds !== "") {
				settlement.tds = parseFloat(row.tds);
				if (isNaN(settlement.tds)) {
					throw new Error(`Row ${index + 1}: invalid tds`);
				}
			}

			if (row.tcs !== undefined && row.tcs !== "") {
				settlement.tcs = parseFloat(row.tcs);
				if (isNaN(settlement.tcs)) {
					throw new Error(`Row ${index + 1}: invalid tcs`);
				}
			}

			if (row.commission !== undefined && row.commission !== "") {
				settlement.commission = parseFloat(row.commission);
				if (isNaN(settlement.commission)) {
					throw new Error(`Row ${index + 1}: invalid commission`);
				}
			}

			if (
				row.collector_settlement !== undefined &&
				row.collector_settlement !== ""
			) {
				settlement.collector_settlement = parseFloat(row.collector_settlement);
				if (isNaN(settlement.collector_settlement)) {
					throw new Error(`Row ${index + 1}: invalid collector_settlement`);
				}
			}

			if (
				row.inter_np_settlement !== undefined &&
				row.inter_np_settlement !== ""
			) {
				settlement.inter_np_settlement =
					row.inter_np_settlement.toString().trim() === "true";
			}

			return settlement;
		});
		logger.debug("Converted CSV data to settlement format", {
			settlements: settlements,
		});
		return { settlements };
	}
}
