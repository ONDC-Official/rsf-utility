export const ORDER_STATE = {
  CREATED: "Created",
  ACCEPTED: "Accepted",
  IN_PROGRESS: "In-progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
} as const;

export type OrderState = (typeof ORDER_STATE)[keyof typeof ORDER_STATE];

export const NP_TYPE = {
  MSN: "MSN",
  ISN: "ISN",
} as const;

export type NPType = (typeof NP_TYPE)[keyof typeof NP_TYPE];

export const FULFILLMENT_STATE = {
  PENDING: "Pending",
  PACKED: "Packed",
  AGENT_ASSIGNED: "Agent-assigned",
  OUT_FOR_PICKUP: "Out-for-pickup",
  PICKUP_FAILED: "Pickup-failed",
  AT_PICKUP: "At-pickup",
  ORDER_PICKED_UP: "Order-picked-up",
  IN_TRANSIT: "In-transit",
  AT_DESTINATION_HUB: "At-destination-hub",
  OUT_FOR_DELIVERY: "Out-for-delivery",
  AT_DELIVERY: "At-delivery",
  DELIVERY_FAILED: "Delivery-failed",
  ORDER_DELIVERED: "Order-delivered",
  CANCELLED: "Cancelled",
  RTO_INITIATED: "RTO-Initiated",
  RTO_DISPOSED: "RTO-Disposed",
  RTO_DELIVERED: "RTO-Delivered",
  RETURN_INITIATED: "Return_Initiated",
  LIQUIDATED: "Liquidated",
  RETURN_APPROVED: "Return_Approved",
  RETURN_PICKED: "Return_Picked",
  RETURN_PICK_FAILED: "Return_Pick_Failed",
  RETURN_REJECTED: "Return_Rejected",
  RETURN_DELIVERED: "Return_Delivered",
} as const;

export type FulfillmentState =
  (typeof FULFILLMENT_STATE)[keyof typeof FULFILLMENT_STATE];

export const CONTEXT_ACTION = {
  ON_CONFIRM: "on_confirm",
  ON_CANCEL: "on_cancel",
  ON_STATUS: "on_status",
  ON_UPDATE: "on_update",
} as const;

export type ContextAction =
  (typeof CONTEXT_ACTION)[keyof typeof CONTEXT_ACTION];

export const ENUMS = {
  ORDER_STATE,
  NP_TYPE,
  FULFILLMENT_STATE,
  CONTEXT_ACTION,
};
