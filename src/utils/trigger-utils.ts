import axios, { isAxiosError } from "axios";
import { TriggeringRequirements } from "../types/trigger-types";
import logger from "./logger";

export const triggerRequest = async (
	requirements: TriggeringRequirements,
	headers?: any
) => {
	try {
		const url = `${requirements.forwardingBaseUrl}/${requirements.action}`;
		logger.info("Triggering request", { url, headers });
		const response = await axios.post(url, requirements.data, { headers });
		return {
			status: response.status,
			data: response.data,
		};
	} catch (error) {
		logger.error("Error triggering request", requirements, error);
		if (isAxiosError(error)) {
			return {
				status: error.response?.status || 500,
				data: getAxiosErrorMessage(error),
			};
		}
		return {
			status: 500,
			data: "An error occurred while triggering the request",
		};
	}
};

export function getAxiosErrorMessage(error: any) {
	if (isAxiosError(error)) {
		return {
			code: error.code,
			request: {
				method: error.config?.method,
				url: error.config?.url,
			},
			response: {
				status: error.response?.status,
				statusText: error.response?.statusText,
				data: error.response?.data,
			},
		};
	}
	if (error.response) {
		return (
			error.response.data ||
			error.response.statusText ||
			"Unknown error from server"
		);
	} else if (error.request) {
		// No response was received
		return "No response received from server";
	} else {
		// Error occurred while setting up the request
		return (
			error.message || "An unknown error occurred from an external request"
		);
	}
}
