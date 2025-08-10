import { ReconPayload } from "../../schema/rsf/zod/recon-schema";

export function generateOnReconPayloadDUMMY(reconPayload: ReconPayload) {
	const orders = reconPayload.message.orders.map((order, index) => {
		const accord = index % 2 === 0; // Alternate between accord and not accord
		const restBody = accord
			? {
					due_date: new Date().toISOString().split("T")[0],
					amount: {
						currency: order.settlements[0].amount.currency,
						value: order.settlements[0].amount.value,
					},
					commission: {
						currency: order.settlements[0].commission.currency,
						value: order.settlements[0].commission.value,
					},
					withholding_amount: {
						currency: order.settlements[0].withholding_amount.currency,
						value: order.settlements[0].withholding_amount.value,
					},
					tcs: {
						currency: order.settlements[0].tcs.currency,
						value: order.settlements[0].tcs.value,
					},
					tds: {
						currency: order.settlements[0].tds.currency,
						value: order.settlements[0].tds.value,
					},
					updated_at: new Date().toISOString(),
				}
			: {
					amount: {
						currency: order.settlements[0].amount.currency,
						value: (parseFloat(order.settlements[0].amount.value) + 10).toFixed(
							2,
						),
						diff_value: "10.00",
					},
					commission: {
						currency: order.settlements[0].commission.currency,
						value: (
							parseFloat(order.settlements[0].commission.value) + 5
						).toFixed(2),
						diff_value: "5.00",
					},
					withholding_amount: {
						currency: order.settlements[0].withholding_amount.currency,
						value: (
							parseFloat(order.settlements[0].withholding_amount.value) + 2
						).toFixed(2),
						diff_value: "2.00",
					},
					tcs: {
						currency: order.settlements[0].tcs.currency,
						value: (parseFloat(order.settlements[0].tcs.value) + 1).toFixed(2),
						diff_value: "1.00",
					},
					tds: {
						currency: order.settlements[0].tds.currency,
						value: (parseFloat(order.settlements[0].tds.value) + 3).toFixed(2),
						diff_value: "3.00",
					},
					updated_at: new Date().toISOString(),
				};
		return {
			id: order.id,
			amount: order.amount,
			recon_accord: accord,
			settlements: [
				{
					id: `settlement-id-${index + 1}`,
					payment_id: `pymnt-${index + 1}`,
					status: "PENDING",
					...restBody,
				},
			],
		};
	});

	return {
		context: {
			domain: "ONDC:NTS10",
			location: {
				country: {
					code: "IND",
				},
				city: {
					code: "*",
				},
			},
			version: "2.0.0",
			action: "on_recon",
			bap_id: reconPayload.context.bap_id,
			bap_uri: reconPayload.context.bap_uri,
			bpp_id: reconPayload.context.bpp_id,
			bpp_uri: reconPayload.context.bpp_uri,
			transaction_id: reconPayload.context.transaction_id,
			message_id: reconPayload.context.message_id,
			timestamp: new Date().toISOString(),
			ttl: "P1D",
		},
		message: {
			orders: [...orders],
		},
	};
}
