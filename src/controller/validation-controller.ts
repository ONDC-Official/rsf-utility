import { NextFunction, Request, Response } from "express";
import { validateSchemaForAction } from "../services/schema-service";
import { getLoggerMeta } from "../utils/utility";
import logger from "../utils/logger";

export const schemaValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const action = req.params.action;
    const { valid, schemaErrors } = validateSchemaForAction(
      body,
      action,
      getLoggerMeta(req)
    );
    if (!valid) {
      logger.error("schema validation failed", {
        ...getLoggerMeta(req),
        errors: schemaErrors,
      });
      res
        .status(422)
        .json({ message: "schema validation failed", errors: schemaErrors });
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
