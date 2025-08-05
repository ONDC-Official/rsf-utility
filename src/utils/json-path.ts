export const orderJsonPathMap: Record<string, string> = {
	order_id: "$.message.order.id",
	bap_id: "$.context.bap_id",
	bpp_id: "$.context.bpp_id",
	bap_uri: "$.context.bap_uri",
	bpp_uri: "$.context.bpp_uri",
	domain: "$.context.domain",
	state: "$.message.order.state",
	created_at: "$.message.order.created_at",
	updated_at: "$.message.order.updated_at",
	collected_by: "$.message.order.payment.collected_by",
	settlement_counterparty:
		'$.message.order.payment["@ondc/org/settlement_details"][*].settlement_counterparty',
	buyer_finder_fee_amount:
		'$.message.order.payment["@ondc/org/buyer_app_finder_fee_amount"]',
	buyer_finder_fee_type:
		'$.message.order.payment["@ondc/org/buyer_app_finder_fee_type"]',
	settlement_basis: '$.message.order.payment["@ondc/org/settlement_basis"]',
	settlement_window: '$.message.order.payment["@ondc/org/settlement_window"]',
	withholding_amount: '$.message.order.payment["@ondc/org/withholding_amount"]',
	quote: "$.message.order.quote",
	provider_id: "$.message.order.provider.id",
	np_type:
		"$.message.order.tags[?@.code=='bpp_terms'].list[?@.code=='np_type'].value",
};
