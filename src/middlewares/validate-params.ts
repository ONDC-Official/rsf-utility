import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
function validateRequiredParams(params: string[]) {
	return (req: Request, res: Response, next: NextFunction): void => {
		const missingParams = params.filter((param) => !req.query[param]);
		if (missingParams.length > 0) {
			logger.warning(
				`Missing query parameters: ${missingParams.join(", ")}`,
				getLoggerMeta(req)
			);
			res.status(400).send({
				message: `${missingParams.join(", ")} ${
					missingParams.length > 1 ? "are" : "is"
				} required`,
			});
			return;
		}
		next();
	};
}

export default validateRequiredParams;
