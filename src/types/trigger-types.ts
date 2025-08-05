import { z } from "zod";

export const TriggerActionSchema = z
	.enum(["settle", "recon", "on_recon", "report"])
	.openapi({
		description: "Action to be performed on the trigger",
		example: "settle",
	});

export type TriggerActionType = z.infer<typeof TriggerActionSchema>;

export type TriggeringRequirements = {
	action: TriggerActionType;
	data: any;
	forwardingBaseUrl: string;
};
