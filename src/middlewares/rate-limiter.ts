import rateLimit from "express-rate-limit";
import { Request } from "express";
import logger from "../utility/logger";

// const rateLimiter = rateLimit({
//   windowMs: 1 * 60 * 1000, // 1 minute
//   max: 1000, // Limit each IP to 100 requests per windowMs
//   standardHeaders: true, // Add rate limit info to response headers
//   legacyHeaders: false, // Disable old X-RateLimit headers
//   message: {
//     status: 429,
//     message: "Too many requests, please try again after a minute.",
//   },
// });

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 1000, // Limit each user (config-id) to 1000 requests per min
  standardHeaders: "draft-8", // Return `RateLimit-*` headers for clarity
  legacyHeaders: false,
  keyGenerator: (req: Request) => {
    // Use config-id from params if present, fallback to IP
    return req.params["config-id"].toString() || req.ip || "unknown";
  },
  message: {
    status: 429,
    message:
      "Rate limit exceeded for your user. Please try again after a minute.",
  },
  handler: (req, res, next, options) => {
    // Custom handler for logging/alerting if needed
    logger.debug(
      `Request exceeded the configured rate limit ${options.limit} per ${options.windowMs} milliseconds`
    );
    res.status(options.message.status).json(options.message);
  },
});

export default rateLimiter;
