import { Response } from "express";
import { ERROR_CODES, ErrorCodeKey } from "../constants/error-codes";
import logger from "./logger";
const resUtilsLogger = logger.child("res-utils");

export function sendSuccess<T>(
	res: Response,
	data: T,
	message = "OK",
	statusCode = 200,
) {
	return res.status(statusCode).send({
		success: true,
		data,
		message,
	});
}

export function sendError(
	res: Response,
	codeKey: ErrorCodeKey,
	customMessage?: string,
	details?: Record<string, any>,
) {
	const errorMeta = ERROR_CODES[codeKey];
	if (!errorMeta) {
		resUtilsLogger.warning(`Error Meta not found for code: ${codeKey}`);
		return res.status(500).json({
			success: false,
			errorCode: "GEN_500",
			message: customMessage || "An unexpected error occurred.",
		});
	}
	return res.status(errorMeta.httpStatus).send({
		success: false,
		errorCode: errorMeta.code,
		message: customMessage ?? errorMeta.message,
		details,
	});
}
