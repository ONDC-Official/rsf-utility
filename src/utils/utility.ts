import { Request } from "express";

export function getLoggerMeta(req: Request) {
	return {
		correlationId: req.correlationId,
		params: req.params,
		query: req.query,
		userId: req.params.userId,
	};
}

export function getAnyError(error: any) {
	if (error.message && typeof error.message === "string") {
		return error.message;
	}
	try {
		const jsonError = JSON.stringify(error);
		return jsonError;
	} catch {
		return "Unknown error";
	}
}
