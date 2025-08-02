import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { OrderService } from "../services/order.service";

const orderLogger = logger.child("order-controller");

export class OrderController {
    constructor(private orderService: OrderService) {}

}
