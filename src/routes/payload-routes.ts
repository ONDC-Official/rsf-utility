import { Router } from 'express';
import rateLimiter from '../middlewares/rate-limiter';
import { schemaValidator } from '../controller/validation-controller';

const payloadRouter = Router();


payloadRouter.post('/api/:action',rateLimiter,schemaValidator)
export default payloadRouter;