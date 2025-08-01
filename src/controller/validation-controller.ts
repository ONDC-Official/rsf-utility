import { NextFunction, Request, Response } from 'express';
import { performL0Validations } from '../utility/validations/L0-validations/schemaValidations';
import { getLoggerMeta } from '../utility/utility';
import logger from '../utility/logger';


export const schemaValidator = async (req: Request, res: Response,next: NextFunction) => {
    const body = req.body
    const action = req.params.action
    const {valid, errors} = performL0Validations(body,action,getLoggerMeta(req))
    if(!valid){
        logger.error("L0 validations failed", {
				...getLoggerMeta(req),
				errors: errors,
			});
    res.status(422).json({message: "L0 validations failed", errors: errors})
    }
    res.status(200).json({ message: 'L0 validations passed'})
    next();
}


