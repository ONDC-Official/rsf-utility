import { envSchema } from "../types/env-type";
import logger from "./logger";
import { z } from "zod";
export function validateEnv(config: Record<string, unknown>) {
	const result = envSchema.safeParse(config);

	if (!result.success) {
		const errorMessage = z.treeifyError(result.error);
		logger.error("❌ Invalid environment variables:", {
			errorMessage: errorMessage,
		});
		throw new Error(
			"Failed to parse environment variables. See the log above for details.",
		);
	}
	logger.info("✅ Environment variables validated successfully.");
}
