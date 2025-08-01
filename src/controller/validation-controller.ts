import { NextFunction, Request, Response } from 'express';
import { performL0Validations } from '../utility/validations/L0-validations/schemaValidations';
import { getLoggerMeta } from '../utility/utility';


export const schemaValidator = async (req: Request, res: Response,next: NextFunction) => {
    const body = req.body
    const action = req.params.action
    performL0Validations(body,action,getLoggerMeta(req))
    res.status(200).json({ message: 'Payloads processed successfully'})
}


