// import axios from "axios";
// import { on_confirmPayloads } from "../data/on-confirms";
// import logger from "../../utils/logger";

// const sendPosts = async (url: string, data: any) => {
// 	try {
// 		const response = await axios.post(url, data);
// 		logger.info("Response from server:", response.data);
// 	} catch (error) {
// 		logger.error("Error sending posts:", {}, error);
// 		throw error;
// 	}
// };

// const sendLoop = async () => {
// 	for (const onConfirm of on_confirmPayloads) {
// 		const url = `https://fis-staging.ondc.org/rsf-utility/api/on_confirm`;
// 		logger.info("Sending post to:", url, onConfirm);
// 		await sendPosts(url, onConfirm);
// 	}
// };

// export const main = async () => {
// 	await (async () => {
// 		try {
// 			await sendLoop();
// 			logger.info("All posts sent successfully");
// 		} catch (error: any) {
// 			logger.error("error", {}, error);
// 		}
// 	})();
// };
