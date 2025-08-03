import { Request } from "express";

export function getLoggerMeta(req: Request) {
	return {
		correlationId: req.correlationId,
		params: req.params,
		query: req.query,
		userId: req.params.userId,
	};
}
