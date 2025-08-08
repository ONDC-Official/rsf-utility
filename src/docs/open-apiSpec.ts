import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";
import { registry } from "./open-api-registry";

// Import route files to ensure they are registered with the registry
import "./api-routes/external-routes";
import "./ui-routes/user-routes";
import "./ui-routes/order-routes";
import "./ui-routes/settle-routes";
import "./ui-routes/recon-routes";
import "./ui-routes/generate-routes";
import "./ui-routes/trigger-routes";
import "./ui-routes/rsf-payloads";
import "./ui-routes/auth-routes";

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
