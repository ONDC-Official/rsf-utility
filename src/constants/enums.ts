export const RSF_DOMAINS = ["ONDC:NTS10"];

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

export const SETTLEMENT_STATUS = {
	PREPARED: "PREPARED", //INTERNAL USE ONLY
	PENDING: "PENDING",
	SETTLED: "SETTLED",
	NOT_SETTLED: "NOT-SETTLED",
} as const;

export type SettlementStatus =
	(typeof SETTLEMENT_STATUS)[keyof typeof SETTLEMENT_STATUS];

export const RECON_STATUS = {
	TO_BE_INITIATED: "TO-BE-INITIATED",
	SETTLED: "SETTLED",
	NOT_SETTLED: "NOT-SETTLED",
	PENDING: "PENDING",
} as const;

export type ReconStatus = (typeof RECON_STATUS)[keyof typeof RECON_STATUS];

export const REPORT_STATUS = {
	SETTLED: "SETTLED",
	NOT_SETTLED: "NOT-SETTLED",
} as const;

export type ReportStatus = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];

export const SETTLEMENT_TYPE = {
	NP_NP: "NP-NP",
	MISC: "MISC",
	NIL: "NIL",
} as const;

export type SettlementType =
	(typeof SETTLEMENT_TYPE)[keyof typeof SETTLEMENT_TYPE];

export const PAYMENT_STATUS = {
	PAID: "PAID",
	NOT_PAID: "NOT-PAID",
} as const;

export type PaymentStatus =
	(typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_TYPE = {
	ON_ORDER: "ON-ORDER",
	ON_FULFILLMENT: "ON-FULFILLMENT",
} as const;

export type PaymentType = (typeof PAYMENT_TYPE)[keyof typeof PAYMENT_TYPE];

export const PARTICIPANT_TYPE = {
	BAP: "BAP",
	BPP: "BPP",
} as const;

export type ParticipantType =
	(typeof PARTICIPANT_TYPE)[keyof typeof PARTICIPANT_TYPE];

export const SETTLEMENT_BASIS = {
	SHIPMENT: "shipment",
	DELIVERY: "delivery",
	RETURN_WINDOW_EXPIRY: "return_window_expiry",
} as const;

export type SettlementBasis =
	(typeof SETTLEMENT_BASIS)[keyof typeof SETTLEMENT_BASIS];

export const INTERNAL_RECON_STATUS = {
	INACTIVE: "INACTIVE",
	SENT_PENDING: "SENT_PENDING",
	SENT_ACCEPTED: "SENT_ACCEPTED",
	SENT_REJECTED: "SENT_REJECTED",
	RECEIVED_PENDING: "RECEIVED_PENDING",
	RECEIVED_ACCEPTED: "RECEIVED_ACCEPTED",
	RECEIVED_REJECTED: "RECEIVED_REJECTED",
} as const;

export const INTERNAL_ORDER_SETTLE_STATUS = {
	READY: "READY", // new order added in db
	SETTLE: "SETTLE", // order prepared for settlement
	RECON: "RECON", // order after successful recon
};

export const ENUMS = {
	ORDER_STATE,
	NP_TYPE,
	FULFILLMENT_STATE,
	CONTEXT_ACTION,
	SETTLEMENT_STATUS,
	RECON_STATUS,
	REPORT_STATUS,
	SETTLEMENT_TYPE,
	PAYMENT_STATUS,
	PAYMENT_TYPE,
	PARTICIPANT_TYPE,
	SETTLEMENT_BASIS,
	INTERNAL_RECON_STATUS,
	INTERNAL_ORDER_SETTLE_STATUS,
};
