import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./open-api-registry";

// Import route files to ensure they are registered with the registry
import "./external-routes";
import "./user-routes";
import "./order-routes";
import "./settle-routes";
import "./generate-routes";
import "./trigger-routes";
import "./rsf-payloads";
import "./auth-routes";

// Generate the OpenAPI document from the populated registry
const generator = new OpenApiGeneratorV31(registry.definitions);

export const openApiDocument = generator.generateDocument({
	openapi: "3.1.0",
	info: {
		version: "1.0.0",
		title: "ondc-rsf-utility API",
		description: "backend APIs for ondc-rsf-utility",
	},
	servers: [{ url: "/rsf-utility" }],
});
