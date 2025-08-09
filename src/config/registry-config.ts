export const config = {
	gateway: {
		STAGING:
			process.env.GATEWAY_STAGING || "https://staging.gateway.proteantech.in/",
		PREPROD: process.env.GATEWAY_PREPROD || "https://preprod.gateway.ondc.org/",
		PROD: process.env.GATEWAY_PROD || "https://prod.gateway.ondc.org/",
	},
	registry: {
		STAGING:
			process.env.REGISTRY_STAGING || "https://staging.registry.ondc.org/v2.0/",
		PREPROD:
			process.env.REGISTRY_PREPROD || "https://preprod.registry.ondc.org/v2.0/",
		PROD: process.env.REGISTRY_PROD || "https://prod.registry.ondc.org/",
	},
};

export const ONDC_ENV = process.env.ONDC_ENV || "STAGING";

export const getBaseUrl = () => {
	const env = ONDC_ENV.toUpperCase();
	if (env === "STAGING") {
		return config.gateway.STAGING;
	} else if (env === "PREPROD") {
		return config.gateway.PREPROD;
	} else if (env === "PROD") {
		return config.gateway.PROD;
	} else {
		throw new Error(`Invalid ONDC_ENV: ${env}`);
	}
};
