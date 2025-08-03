import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const RsfOnActionsSchema = z
	.enum(["on_settle", "on_recon", "on_report"])
	.openapi({
		description:
			"valid actions for consuming RSF APIs from settlement agencies",
		example: "on_settle",
	});

export type RsfOnAction = z.infer<typeof RsfOnActionsSchema>;
