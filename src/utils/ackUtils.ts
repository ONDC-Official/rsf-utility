import { SA_ERRORS } from "../constants/error-codes";

export const getNackResponse = (errorCode: string) => {
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
			message: errorDescription,
		},
	};
};

export const getAckResponse = () => {
	return {
		message: {
			ack: {
				status: "ACK",
			},
		},
	};
};
