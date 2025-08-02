// middlewares/jsonValidationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { validateSchemaForAction } from "../services/schema-service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";

/**
 * Schema validation controller for uploaded JSON payloads
 * @returns Validated JSON payloads in req.validatedPayloads (req object of Express)
 */
export function schemaValidator() {
  return (req: Request, res: Response, next: NextFunction) => {
    // Use processedJsonPayloads if present (from upload), else req.body.payloads (from API)
    const payloads =
      (req as any).processedJsonPayloads ||
      req.body.payloads ||
      (Array.isArray(req.body) ? req.body : undefined);

    if (!payloads) {
      return res.status(400).json({ error: "No payloads to validate" });
    }

    const validated: any[] = [];

    payloads.forEach((payload: any) => {
      const action = payload.context?.action;
      if (!action) {
        return res.status(400).json({
          error:
            "context.action is required for validation <check uploaded payloads>",
        });
      }
      const { valid, errors } = validateSchemaForAction(
        payload,
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
      } else {
        validated.push(payload);
        logger.info("schema validation passed", getLoggerMeta(req));
      }

      if (errors.length > 0) {
        return res.status(422).json({
          error: "Validation failed",
          details: errors,
        });
      }
    });

    (req as any).validatedPayloads = validated;
    // Clean up processed JSON to avoid misuse or memory leak
    delete (req as any).processedJsonPayloads;
    next();
  };
}
