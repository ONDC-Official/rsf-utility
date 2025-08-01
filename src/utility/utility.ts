import { Request } from "express";

export function getLoggerMeta(req: Request) {
	return {
		correlationId: req.correlationId,
	};
}
