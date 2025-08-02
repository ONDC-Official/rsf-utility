import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { getUserIdsByRoleAndDomain } from "../services/user-service-shivang";

export const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("User Handler invoked", getLoggerMeta(req));
  try {
    const payload = req.body; 
    const {bap_user_id, bpp_user_id} = await getUserIdsByRoleAndDomain(payload)
    if(!bap_user_id && !bpp_user_id){
        return res.status(400).json({
        message: "Cannot find user for this domain and subscriber_id.",
      });
    }
    res.locals.bap_user_id = bap_user_id;
    res.locals.bpp_user_id = bpp_user_id;
    next();
  } catch (e: any) {
    logger.error("Error in user validation", getLoggerMeta(req), e);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
