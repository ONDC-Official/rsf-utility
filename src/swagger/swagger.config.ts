import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Your API",
		version: "1.0.0",
	},
	components: {
		schemas: {
			FormFieldConfigType: {
				type: "object",
				properties: {
					name: { type: "string" },
					label: { type: "string" },
					type: {
						type: "string",
						enum: ["text", "select", "textarea", "list"],
					},
					payloadField: { type: "string" },
					values: {
						type: "array",
						items: { type: "string" },
					},
					defaultValue: { type: "string" },
					input: {
						type: "array",
						items: {
							$ref: "#/components/schemas/FormFieldConfigType",
						},
					},
				},
			},
			ReducedApiData: {
				type: "object",
				properties: {
					action: { type: "string" },
					messageId: { type: "string" },
					timestamp: { type: "string" },
					subStatus: {
						type: "string",
						enum: ["SUCCESS", "ERROR"],
					},
					payloads: {
						type: "array",
						items: {
							type: "object",
							properties: {
								payloadId: { type: "string" },
								response: { type: "object" }, // response: any
							},
						},
					},
				},
			},
		},
	},
};

const options = {
	definition: swaggerDefinition,
	apis: ["./src/routes/**/*.ts"], // adjust path to where your JSDoc comments live
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
