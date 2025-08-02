import { z } from "zod";

export const objectIdSchema = z
	.string()
	.length(24)
	.regex(/^[0-9a-fA-F]{24}$/, "Invalid user ID format");

export type UserIdType = z.infer<typeof objectIdSchema>;

export const validateUserId = (userId: string): boolean => {
	return objectIdSchema.safeParse(userId).success;
};
