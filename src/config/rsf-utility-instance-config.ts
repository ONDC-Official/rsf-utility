export const SettleAgencyConfig = {
	agencyUrl: process.env.SETTLEMENT_AGENCY_URL || "",
	agencyId: process.env.SETTLEMENT_AGENCY_ID || "",
	agencyKey: process.env.SETTLEMENT_AGENCY_KEY || "",
};

export const subscriberConfig = {
	subscriberId: process.env.SUBSCRIBER_ID || "",
	subscriberUniqueId: process.env.SUBSCRIBER_UNIQUE_ID || "",
	subscriberPrivateKey: process.env.SUBSCRIBER_PRIVATE_KEY || "",
};

export const operationConfig = {
	rateLimit: parseInt(process.env.RATE_LIMIT ?? "1000") || 1000, // Default rate limit
};
