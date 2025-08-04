import rateLimit from "express-rate-limit";
// import { Request } from "express";
import logger from "../utils/logger";
const rateLimitLogger = logger.child("rate-limiter");
import { sendError } from "../utils/resUtils";
import { send } from "process";

const rateLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	limit: 2, // Limit each user (config-id) to 1000 requests per min
	standardHeaders: "draft-8", // Return `RateLimit-*` headers for clarity
	legacyHeaders: false,
	keyGenerator: () => "global",
	// keyGenerator: (req: Request) => {
	//   // Use config-id from params if present, fallback to IP
	//   return req.params["config-id"]?.toString() || req.ip || "unknown";
	// },
	// message: {
	// 	status: 429,
	// 	message:
	// 		"Rate limit exceeded for your user. Please try again after a minute.",
	// },
	handler: (req, res, next, options) => {
		// Custom handler for logging/alerting if needed
		rateLimitLogger.debug(
			`Request exceeded the configured rate limit ${options.limit} per ${options.windowMs} milliseconds`,
		);
		// res.status(options.message.status).json(options.message);
		sendError(
			res,
			"TOO_MANY_REQUESTS",
			"Rate limit exceeded for your user. Please try again after a minute.",
		);
	},
});

export default rateLimiter;
