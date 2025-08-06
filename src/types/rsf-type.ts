import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const RsfOnActionsSchema = z
	.enum(["on_settle", "recon", "on_recon", "on_report"])
	.openapi({
		description:
			"valid actions for consuming RSF APIs from settlement agencies",
		example: "on_settle",
	})
	.openapi("RsfOnActionsSchema");

export type RsfOnAction = z.infer<typeof RsfOnActionsSchema>;

export const OndcSyncResponseSchema = z.object({
	message: z.object({
		ack: z.object({
			status: z.enum(["ACK", "NACK"]),
		}),
	}),
	error: z
		.object({
			code: z.string(),
			message: z.string(),
		})
		.optional(),
});
export type OndcSyncResponse = z.infer<typeof OndcSyncResponseSchema>;
