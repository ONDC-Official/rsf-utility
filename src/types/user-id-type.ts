import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
extendZodWithOpenApi(z);
export const objectIdSchema = z
	.string()
	.length(24)
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format")
	.openapi({
		description: "Unique identifier for the user config",
		example: "60c72b2f9b1e8b001c2f8b1e",
	});

export type UserIdType = z.infer<typeof objectIdSchema>;

export const validateUserId = (userId: string): boolean => {
	return objectIdSchema.safeParse(userId).success;
};
