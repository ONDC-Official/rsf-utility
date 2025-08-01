import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";

import requestLog from "./middlewares/request-log";
import responseLog from "./middlewares/response-log";
import { getLoggerMeta } from "./utility/utility";
import { healthMonitor } from "./utility/health-monitor";
import logger from "./utility/logger";
import payloadRouter from "./routes/payload-routes";

const createServer = (): Application => {
  logger.info("Creating server...");
  const app = express();

  app.use(logger.getCorrelationIdMiddleware());
  app.use(cors());
  app.use(express.json({ limit: "50mb" }));

  // Logging Middleware
  app.use(requestLog);
  app.use(responseLog);
  const base = "/";
  app.use(base,payloadRouter)


  // Health Check
  app.get("/health", async (req: Request, res: Response) => {
    try {
      const healthStatus = await healthMonitor.getHealthStatus();
      res.status(200).json({
        status: "ok",
        ...healthStatus,
      });
    } catch (error) {
      logger.error("Health check failed", getLoggerMeta(req), { error });
      res.status(503).json({
        status: "error",
        message: "Health check failed",
      });
    }
  });

  // Error Handling Middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // logger.error(err.message, { stack: err.stack });
    logger.error(
      `Internal Server Error: ${err.message}`,
      getLoggerMeta(req),
      err
    );
    res.status(500).send("INTERNAL SERVER ERROR");
  });

  return app;
};

export default createServer;
