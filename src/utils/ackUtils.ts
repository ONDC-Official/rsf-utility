import { SA_ERRORS } from "../constants/error-codes";
import { OndcSyncResponse } from "../types/rsf-type";

export const getNackResponse = (
	errorCode: string,
	message?: string,
): OndcSyncResponse => {
	const errorDescription =
		SA_ERRORS[errorCode as keyof typeof SA_ERRORS]?.Description ||
		"Unknown error";
	return {
		message: {
			ack: {
				status: "NACK",
			},
		},
		error: {
			code: errorCode,
			message: errorDescription + " " + (message || ""),
		},
	};
};

export const getAckResponse = (): OndcSyncResponse => {
	return {
		message: {
			ack: {
				status: "ACK",
			},
		},
	};
};

export const isPerfectAck = (response: any) => {
	if (response?.message?.ack?.status === "ACK") {
		return true;
	}
	return false;
};
