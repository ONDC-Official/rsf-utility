import { NextFunction, Request, Response } from "express";
import {
	validateGivenSchema,
	validateSchemaForAction,
} from "../services/schema.service";
import { getLoggerMeta } from "../utils/utility";
import logger from "../utils/logger";
import { UserAjvSchema } from "../schema/models/user.schema";

export const schemaValidator = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = req.body;
		const action = req.params.action;
		const { valid, errors } = validateSchemaForAction(
			body,
			action,
			getLoggerMeta(req)
		);
		if (!valid) {
			logger.error("schema validation failed", {
				...getLoggerMeta(req),
				errors: errors,
			});
			res
				.status(422)
				.json({ message: "schema validation failed", errors: errors });
			return;
		}
		logger.info("schema validation passed", getLoggerMeta(req));
		next();
	} catch (e: any) {
		logger.error("Error in schema validations", getLoggerMeta(req), e);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

export const schemaValidatorForUser = (schema: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const body = req.body;
			const { valid, errors } = validateGivenSchema(UserAjvSchema, body);
			if (!valid) {
				logger.error("User schema validation failed", {
					...getLoggerMeta(req),
					errors: errors,
				});
				res
					.status(422)
					.json({ message: "User schema validation failed", errors: errors });
				return;
			}
			logger.info("User schema validation passed", getLoggerMeta(req));
			next();
		} catch (e: any) {
			logger.error("Error in User schema validations", getLoggerMeta(req), e);
			res.status(500).json({ message: "Internal server error" });
			return;
		}
	};
};
