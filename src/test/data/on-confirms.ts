export const on_confirmPayloads = [
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484279",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 2,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 2,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 2,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560028",
					},
					phone: "9399788619",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400054",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663711",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989899",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110093",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 2,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "201.00",
							},
							item: {
								quantity: {
									available: {
										count: "100",
									},
									maximum: {
										count: "100",
									},
								},
								price: {
									currency: "INR",
									value: "201.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 2,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "251.00",
							},
							item: {
								quantity: {
									available: {
										count: "100",
									},
									maximum: {
										count: "100",
									},
								},
								price: {
									currency: "INR",
									value: "251.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 2,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "301.00",
							},
							item: {
								quantity: {
									available: {
										count: "100",
									},
									maximum: {
										count: "100",
									},
								},
								price: {
									currency: "INR",
									value: "301.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "1.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "1.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-74.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "676.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "676.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "4.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "11.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484281",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 3,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 3,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 3,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560029",
					},
					phone: "9399788620",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400055",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663712",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989900",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110094",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 3,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "202.00",
							},
							item: {
								quantity: {
									available: {
										count: "101",
									},
									maximum: {
										count: "101",
									},
								},
								price: {
									currency: "INR",
									value: "202.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 3,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "252.00",
							},
							item: {
								quantity: {
									available: {
										count: "101",
									},
									maximum: {
										count: "101",
									},
								},
								price: {
									currency: "INR",
									value: "252.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 3,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "302.00",
							},
							item: {
								quantity: {
									available: {
										count: "101",
									},
									maximum: {
										count: "101",
									},
								},
								price: {
									currency: "INR",
									value: "302.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "2.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "2.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-73.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "677.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "677.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "5.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "12.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484283",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 4,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 4,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 4,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560030",
					},
					phone: "9399788621",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400056",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663713",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989901",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110095",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 4,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "203.00",
							},
							item: {
								quantity: {
									available: {
										count: "102",
									},
									maximum: {
										count: "102",
									},
								},
								price: {
									currency: "INR",
									value: "203.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 4,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "253.00",
							},
							item: {
								quantity: {
									available: {
										count: "102",
									},
									maximum: {
										count: "102",
									},
								},
								price: {
									currency: "INR",
									value: "253.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 4,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "303.00",
							},
							item: {
								quantity: {
									available: {
										count: "102",
									},
									maximum: {
										count: "102",
									},
								},
								price: {
									currency: "INR",
									value: "303.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "3.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "3.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-72.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "678.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "678.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "6.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "13.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484285",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 5,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 5,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 5,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560031",
					},
					phone: "9399788622",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400057",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663714",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989902",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110096",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 5,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "204.00",
							},
							item: {
								quantity: {
									available: {
										count: "103",
									},
									maximum: {
										count: "103",
									},
								},
								price: {
									currency: "INR",
									value: "204.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 5,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "254.00",
							},
							item: {
								quantity: {
									available: {
										count: "103",
									},
									maximum: {
										count: "103",
									},
								},
								price: {
									currency: "INR",
									value: "254.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 5,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "304.00",
							},
							item: {
								quantity: {
									available: {
										count: "103",
									},
									maximum: {
										count: "103",
									},
								},
								price: {
									currency: "INR",
									value: "304.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "4.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "4.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-71.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "679.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "679.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "7.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "14.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484287",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 6,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 6,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 6,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560032",
					},
					phone: "9399788623",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400058",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663715",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989903",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110097",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 6,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "205.00",
							},
							item: {
								quantity: {
									available: {
										count: "104",
									},
									maximum: {
										count: "104",
									},
								},
								price: {
									currency: "INR",
									value: "205.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 6,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "255.00",
							},
							item: {
								quantity: {
									available: {
										count: "104",
									},
									maximum: {
										count: "104",
									},
								},
								price: {
									currency: "INR",
									value: "255.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 6,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "305.00",
							},
							item: {
								quantity: {
									available: {
										count: "104",
									},
									maximum: {
										count: "104",
									},
								},
								price: {
									currency: "INR",
									value: "305.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "5.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "5.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-70.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "680.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "680.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "8.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "15.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484289",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 7,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 7,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 7,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560033",
					},
					phone: "9399788624",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400059",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663716",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989904",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110098",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 7,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "206.00",
							},
							item: {
								quantity: {
									available: {
										count: "105",
									},
									maximum: {
										count: "105",
									},
								},
								price: {
									currency: "INR",
									value: "206.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 7,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "256.00",
							},
							item: {
								quantity: {
									available: {
										count: "105",
									},
									maximum: {
										count: "105",
									},
								},
								price: {
									currency: "INR",
									value: "256.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 7,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "306.00",
							},
							item: {
								quantity: {
									available: {
										count: "105",
									},
									maximum: {
										count: "105",
									},
								},
								price: {
									currency: "INR",
									value: "306.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "6.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "6.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-69.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "681.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "681.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "9.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "16.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484291",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 8,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 8,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 8,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560034",
					},
					phone: "9399788625",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400060",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663717",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989905",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110099",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 8,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "207.00",
							},
							item: {
								quantity: {
									available: {
										count: "106",
									},
									maximum: {
										count: "106",
									},
								},
								price: {
									currency: "INR",
									value: "207.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 8,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "257.00",
							},
							item: {
								quantity: {
									available: {
										count: "106",
									},
									maximum: {
										count: "106",
									},
								},
								price: {
									currency: "INR",
									value: "257.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 8,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "307.00",
							},
							item: {
								quantity: {
									available: {
										count: "106",
									},
									maximum: {
										count: "106",
									},
								},
								price: {
									currency: "INR",
									value: "307.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "7.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "7.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-68.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "682.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "682.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "10.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "17.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484293",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 9,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 9,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 9,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560035",
					},
					phone: "9399788626",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400061",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663718",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989906",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110100",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 9,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "208.00",
							},
							item: {
								quantity: {
									available: {
										count: "107",
									},
									maximum: {
										count: "107",
									},
								},
								price: {
									currency: "INR",
									value: "208.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 9,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "258.00",
							},
							item: {
								quantity: {
									available: {
										count: "107",
									},
									maximum: {
										count: "107",
									},
								},
								price: {
									currency: "INR",
									value: "258.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 9,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "308.00",
							},
							item: {
								quantity: {
									available: {
										count: "107",
									},
									maximum: {
										count: "107",
									},
								},
								price: {
									currency: "INR",
									value: "308.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "8.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "8.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-67.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "683.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "683.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "11.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "18.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484295",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 10,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 10,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 10,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560036",
					},
					phone: "9399788627",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400062",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663719",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989907",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110101",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 10,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "209.00",
							},
							item: {
								quantity: {
									available: {
										count: "108",
									},
									maximum: {
										count: "108",
									},
								},
								price: {
									currency: "INR",
									value: "209.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 10,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "259.00",
							},
							item: {
								quantity: {
									available: {
										count: "108",
									},
									maximum: {
										count: "108",
									},
								},
								price: {
									currency: "INR",
									value: "259.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 10,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "309.00",
							},
							item: {
								quantity: {
									available: {
										count: "108",
									},
									maximum: {
										count: "108",
									},
								},
								price: {
									currency: "INR",
									value: "309.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "9.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "9.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-66.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "684.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "684.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "12.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "19.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484297",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 11,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 11,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 11,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560037",
					},
					phone: "9399788628",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400063",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663720",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989908",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110102",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 11,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "210.00",
							},
							item: {
								quantity: {
									available: {
										count: "109",
									},
									maximum: {
										count: "109",
									},
								},
								price: {
									currency: "INR",
									value: "210.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 11,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "260.00",
							},
							item: {
								quantity: {
									available: {
										count: "109",
									},
									maximum: {
										count: "109",
									},
								},
								price: {
									currency: "INR",
									value: "260.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 11,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "310.00",
							},
							item: {
								quantity: {
									available: {
										count: "109",
									},
									maximum: {
										count: "109",
									},
								},
								price: {
									currency: "INR",
									value: "310.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "10.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "10.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-65.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "685.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "685.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "13.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "20.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484299",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 12,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 12,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 12,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560038",
					},
					phone: "9399788629",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400064",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663721",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989909",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110103",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 12,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "211.00",
							},
							item: {
								quantity: {
									available: {
										count: "110",
									},
									maximum: {
										count: "110",
									},
								},
								price: {
									currency: "INR",
									value: "211.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 12,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "261.00",
							},
							item: {
								quantity: {
									available: {
										count: "110",
									},
									maximum: {
										count: "110",
									},
								},
								price: {
									currency: "INR",
									value: "261.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 12,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "311.00",
							},
							item: {
								quantity: {
									available: {
										count: "110",
									},
									maximum: {
										count: "110",
									},
								},
								price: {
									currency: "INR",
									value: "311.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "11.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "11.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-64.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "686.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "686.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "14.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "21.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484301",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 13,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 13,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 13,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560039",
					},
					phone: "9399788630",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400065",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663722",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989910",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110104",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 13,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "212.00",
							},
							item: {
								quantity: {
									available: {
										count: "111",
									},
									maximum: {
										count: "111",
									},
								},
								price: {
									currency: "INR",
									value: "212.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 13,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "262.00",
							},
							item: {
								quantity: {
									available: {
										count: "111",
									},
									maximum: {
										count: "111",
									},
								},
								price: {
									currency: "INR",
									value: "262.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 13,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "312.00",
							},
							item: {
								quantity: {
									available: {
										count: "111",
									},
									maximum: {
										count: "111",
									},
								},
								price: {
									currency: "INR",
									value: "312.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "12.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "12.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-63.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "687.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "687.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "15.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "22.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484303",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 14,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 14,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 14,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560040",
					},
					phone: "9399788631",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400066",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663723",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989911",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110105",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 14,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "213.00",
							},
							item: {
								quantity: {
									available: {
										count: "112",
									},
									maximum: {
										count: "112",
									},
								},
								price: {
									currency: "INR",
									value: "213.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 14,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "263.00",
							},
							item: {
								quantity: {
									available: {
										count: "112",
									},
									maximum: {
										count: "112",
									},
								},
								price: {
									currency: "INR",
									value: "263.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 14,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "313.00",
							},
							item: {
								quantity: {
									available: {
										count: "112",
									},
									maximum: {
										count: "112",
									},
								},
								price: {
									currency: "INR",
									value: "313.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "13.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "13.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-62.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "688.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "688.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "16.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "23.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484305",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 15,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 15,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 15,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560041",
					},
					phone: "9399788632",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400067",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663724",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989912",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110106",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 15,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "214.00",
							},
							item: {
								quantity: {
									available: {
										count: "113",
									},
									maximum: {
										count: "113",
									},
								},
								price: {
									currency: "INR",
									value: "214.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 15,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "264.00",
							},
							item: {
								quantity: {
									available: {
										count: "113",
									},
									maximum: {
										count: "113",
									},
								},
								price: {
									currency: "INR",
									value: "264.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 15,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "314.00",
							},
							item: {
								quantity: {
									available: {
										count: "113",
									},
									maximum: {
										count: "113",
									},
								},
								price: {
									currency: "INR",
									value: "314.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "14.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "14.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-61.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "689.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "689.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "17.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "24.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484307",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 16,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 16,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 16,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560042",
					},
					phone: "9399788633",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400068",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663725",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989913",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110107",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 16,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "215.00",
							},
							item: {
								quantity: {
									available: {
										count: "114",
									},
									maximum: {
										count: "114",
									},
								},
								price: {
									currency: "INR",
									value: "215.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 16,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "265.00",
							},
							item: {
								quantity: {
									available: {
										count: "114",
									},
									maximum: {
										count: "114",
									},
								},
								price: {
									currency: "INR",
									value: "265.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 16,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "315.00",
							},
							item: {
								quantity: {
									available: {
										count: "114",
									},
									maximum: {
										count: "114",
									},
								},
								price: {
									currency: "INR",
									value: "315.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "15.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "15.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-60.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "690.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "690.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "18.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "25.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484309",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 17,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 17,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 17,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560043",
					},
					phone: "9399788634",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400069",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663726",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989914",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110108",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 17,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "216.00",
							},
							item: {
								quantity: {
									available: {
										count: "115",
									},
									maximum: {
										count: "115",
									},
								},
								price: {
									currency: "INR",
									value: "216.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 17,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "266.00",
							},
							item: {
								quantity: {
									available: {
										count: "115",
									},
									maximum: {
										count: "115",
									},
								},
								price: {
									currency: "INR",
									value: "266.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 17,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "316.00",
							},
							item: {
								quantity: {
									available: {
										count: "115",
									},
									maximum: {
										count: "115",
									},
								},
								price: {
									currency: "INR",
									value: "316.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "16.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "16.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-59.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "691.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "691.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "19.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "26.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484311",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 18,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 18,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 18,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560044",
					},
					phone: "9399788635",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400070",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663727",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989915",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110109",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 18,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "217.00",
							},
							item: {
								quantity: {
									available: {
										count: "116",
									},
									maximum: {
										count: "116",
									},
								},
								price: {
									currency: "INR",
									value: "217.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 18,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "267.00",
							},
							item: {
								quantity: {
									available: {
										count: "116",
									},
									maximum: {
										count: "116",
									},
								},
								price: {
									currency: "INR",
									value: "267.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 18,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "317.00",
							},
							item: {
								quantity: {
									available: {
										count: "116",
									},
									maximum: {
										count: "116",
									},
								},
								price: {
									currency: "INR",
									value: "317.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "17.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "17.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-58.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "692.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "692.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "20.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "27.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484313",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 19,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 19,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 19,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560045",
					},
					phone: "9399788636",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400071",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663728",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989916",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110110",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 19,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "218.00",
							},
							item: {
								quantity: {
									available: {
										count: "117",
									},
									maximum: {
										count: "117",
									},
								},
								price: {
									currency: "INR",
									value: "218.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 19,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "268.00",
							},
							item: {
								quantity: {
									available: {
										count: "117",
									},
									maximum: {
										count: "117",
									},
								},
								price: {
									currency: "INR",
									value: "268.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 19,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "318.00",
							},
							item: {
								quantity: {
									available: {
										count: "117",
									},
									maximum: {
										count: "117",
									},
								},
								price: {
									currency: "INR",
									value: "318.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "18.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "18.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-57.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "693.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "693.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "21.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "28.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484315",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 20,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 20,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 20,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560046",
					},
					phone: "9399788637",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400072",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663729",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989917",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110111",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 20,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "219.00",
							},
							item: {
								quantity: {
									available: {
										count: "118",
									},
									maximum: {
										count: "118",
									},
								},
								price: {
									currency: "INR",
									value: "219.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 20,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "269.00",
							},
							item: {
								quantity: {
									available: {
										count: "118",
									},
									maximum: {
										count: "118",
									},
								},
								price: {
									currency: "INR",
									value: "269.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 20,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "319.00",
							},
							item: {
								quantity: {
									available: {
										count: "118",
									},
									maximum: {
										count: "118",
									},
								},
								price: {
									currency: "INR",
									value: "319.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "19.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "19.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-56.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "694.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "694.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "22.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "29.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484317",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 21,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 21,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 21,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560047",
					},
					phone: "9399788638",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400073",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663730",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989918",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110112",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 21,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "220.00",
							},
							item: {
								quantity: {
									available: {
										count: "119",
									},
									maximum: {
										count: "119",
									},
								},
								price: {
									currency: "INR",
									value: "220.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 21,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "270.00",
							},
							item: {
								quantity: {
									available: {
										count: "119",
									},
									maximum: {
										count: "119",
									},
								},
								price: {
									currency: "INR",
									value: "270.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 21,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "320.00",
							},
							item: {
								quantity: {
									available: {
										count: "119",
									},
									maximum: {
										count: "119",
									},
								},
								price: {
									currency: "INR",
									value: "320.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "20.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "20.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-55.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "695.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "695.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "23.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "30.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484319",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 22,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 22,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 22,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560048",
					},
					phone: "9399788639",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400074",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663731",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989919",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110113",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 22,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "221.00",
							},
							item: {
								quantity: {
									available: {
										count: "120",
									},
									maximum: {
										count: "120",
									},
								},
								price: {
									currency: "INR",
									value: "221.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 22,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "271.00",
							},
							item: {
								quantity: {
									available: {
										count: "120",
									},
									maximum: {
										count: "120",
									},
								},
								price: {
									currency: "INR",
									value: "271.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 22,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "321.00",
							},
							item: {
								quantity: {
									available: {
										count: "120",
									},
									maximum: {
										count: "120",
									},
								},
								price: {
									currency: "INR",
									value: "321.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "21.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "21.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-54.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "696.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "696.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "24.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "31.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484321",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 23,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 23,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 23,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560049",
					},
					phone: "9399788640",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400075",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663732",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989920",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110114",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 23,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "222.00",
							},
							item: {
								quantity: {
									available: {
										count: "121",
									},
									maximum: {
										count: "121",
									},
								},
								price: {
									currency: "INR",
									value: "222.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 23,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "272.00",
							},
							item: {
								quantity: {
									available: {
										count: "121",
									},
									maximum: {
										count: "121",
									},
								},
								price: {
									currency: "INR",
									value: "272.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 23,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "322.00",
							},
							item: {
								quantity: {
									available: {
										count: "121",
									},
									maximum: {
										count: "121",
									},
								},
								price: {
									currency: "INR",
									value: "322.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "22.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "22.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-53.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "697.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "697.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "25.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "32.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484323",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 24,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 24,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 24,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560050",
					},
					phone: "9399788641",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400076",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663733",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989921",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110115",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 24,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "223.00",
							},
							item: {
								quantity: {
									available: {
										count: "122",
									},
									maximum: {
										count: "122",
									},
								},
								price: {
									currency: "INR",
									value: "223.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 24,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "273.00",
							},
							item: {
								quantity: {
									available: {
										count: "122",
									},
									maximum: {
										count: "122",
									},
								},
								price: {
									currency: "INR",
									value: "273.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 24,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "323.00",
							},
							item: {
								quantity: {
									available: {
										count: "122",
									},
									maximum: {
										count: "122",
									},
								},
								price: {
									currency: "INR",
									value: "323.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "23.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "23.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-52.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "698.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "698.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "26.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "33.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484325",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 25,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 25,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 25,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560051",
					},
					phone: "9399788642",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400077",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663734",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989922",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110116",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 25,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "224.00",
							},
							item: {
								quantity: {
									available: {
										count: "123",
									},
									maximum: {
										count: "123",
									},
								},
								price: {
									currency: "INR",
									value: "224.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 25,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "274.00",
							},
							item: {
								quantity: {
									available: {
										count: "123",
									},
									maximum: {
										count: "123",
									},
								},
								price: {
									currency: "INR",
									value: "274.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 25,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "324.00",
							},
							item: {
								quantity: {
									available: {
										count: "123",
									},
									maximum: {
										count: "123",
									},
								},
								price: {
									currency: "INR",
									value: "324.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "24.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "24.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-51.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "699.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "699.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "27.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "34.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484327",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 26,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 26,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 26,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560052",
					},
					phone: "9399788643",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400078",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663735",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989923",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110117",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 26,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "225.00",
							},
							item: {
								quantity: {
									available: {
										count: "124",
									},
									maximum: {
										count: "124",
									},
								},
								price: {
									currency: "INR",
									value: "225.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 26,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "275.00",
							},
							item: {
								quantity: {
									available: {
										count: "124",
									},
									maximum: {
										count: "124",
									},
								},
								price: {
									currency: "INR",
									value: "275.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 26,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "325.00",
							},
							item: {
								quantity: {
									available: {
										count: "124",
									},
									maximum: {
										count: "124",
									},
								},
								price: {
									currency: "INR",
									value: "325.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "25.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "25.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-50.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "700.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "700.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "28.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "35.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484329",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 27,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 27,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 27,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560053",
					},
					phone: "9399788644",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400079",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663736",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989924",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110118",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 27,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "226.00",
							},
							item: {
								quantity: {
									available: {
										count: "125",
									},
									maximum: {
										count: "125",
									},
								},
								price: {
									currency: "INR",
									value: "226.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 27,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "276.00",
							},
							item: {
								quantity: {
									available: {
										count: "125",
									},
									maximum: {
										count: "125",
									},
								},
								price: {
									currency: "INR",
									value: "276.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 27,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "326.00",
							},
							item: {
								quantity: {
									available: {
										count: "125",
									},
									maximum: {
										count: "125",
									},
								},
								price: {
									currency: "INR",
									value: "326.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "26.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "26.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-49.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "701.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "701.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "29.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "36.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484331",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 28,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 28,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 28,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560054",
					},
					phone: "9399788645",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400080",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663737",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989925",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110119",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 28,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "227.00",
							},
							item: {
								quantity: {
									available: {
										count: "126",
									},
									maximum: {
										count: "126",
									},
								},
								price: {
									currency: "INR",
									value: "227.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 28,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "277.00",
							},
							item: {
								quantity: {
									available: {
										count: "126",
									},
									maximum: {
										count: "126",
									},
								},
								price: {
									currency: "INR",
									value: "277.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 28,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "327.00",
							},
							item: {
								quantity: {
									available: {
										count: "126",
									},
									maximum: {
										count: "126",
									},
								},
								price: {
									currency: "INR",
									value: "327.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "27.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "27.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-48.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "702.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "702.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "30.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "37.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484333",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 29,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 29,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 29,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560055",
					},
					phone: "9399788646",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400081",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663738",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989926",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110120",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 29,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "228.00",
							},
							item: {
								quantity: {
									available: {
										count: "127",
									},
									maximum: {
										count: "127",
									},
								},
								price: {
									currency: "INR",
									value: "228.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 29,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "278.00",
							},
							item: {
								quantity: {
									available: {
										count: "127",
									},
									maximum: {
										count: "127",
									},
								},
								price: {
									currency: "INR",
									value: "278.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 29,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "328.00",
							},
							item: {
								quantity: {
									available: {
										count: "127",
									},
									maximum: {
										count: "127",
									},
								},
								price: {
									currency: "INR",
									value: "328.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "28.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "28.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-47.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "703.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "703.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "31.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "38.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484335",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 30,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 30,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 30,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560056",
					},
					phone: "9399788647",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400082",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663739",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989927",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110121",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 30,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "229.00",
							},
							item: {
								quantity: {
									available: {
										count: "128",
									},
									maximum: {
										count: "128",
									},
								},
								price: {
									currency: "INR",
									value: "229.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 30,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "279.00",
							},
							item: {
								quantity: {
									available: {
										count: "128",
									},
									maximum: {
										count: "128",
									},
								},
								price: {
									currency: "INR",
									value: "279.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 30,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "329.00",
							},
							item: {
								quantity: {
									available: {
										count: "128",
									},
									maximum: {
										count: "128",
									},
								},
								price: {
									currency: "INR",
									value: "329.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "29.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "29.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-46.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "704.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "704.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "32.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "39.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484337",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 31,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 31,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 31,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560057",
					},
					phone: "9399788648",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400083",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663740",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989928",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110122",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 31,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "230.00",
							},
							item: {
								quantity: {
									available: {
										count: "129",
									},
									maximum: {
										count: "129",
									},
								},
								price: {
									currency: "INR",
									value: "230.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 31,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "280.00",
							},
							item: {
								quantity: {
									available: {
										count: "129",
									},
									maximum: {
										count: "129",
									},
								},
								price: {
									currency: "INR",
									value: "280.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 31,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "330.00",
							},
							item: {
								quantity: {
									available: {
										count: "129",
									},
									maximum: {
										count: "129",
									},
								},
								price: {
									currency: "INR",
									value: "330.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "30.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "30.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-45.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "705.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "705.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "33.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "40.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484339",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 32,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 32,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 32,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560058",
					},
					phone: "9399788649",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400084",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663741",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989929",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110123",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 32,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "231.00",
							},
							item: {
								quantity: {
									available: {
										count: "130",
									},
									maximum: {
										count: "130",
									},
								},
								price: {
									currency: "INR",
									value: "231.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 32,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "281.00",
							},
							item: {
								quantity: {
									available: {
										count: "130",
									},
									maximum: {
										count: "130",
									},
								},
								price: {
									currency: "INR",
									value: "281.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 32,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "331.00",
							},
							item: {
								quantity: {
									available: {
										count: "130",
									},
									maximum: {
										count: "130",
									},
								},
								price: {
									currency: "INR",
									value: "331.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "31.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "31.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-44.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "706.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "706.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "34.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "41.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484341",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 33,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 33,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 33,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560059",
					},
					phone: "9399788650",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400085",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663742",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989930",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110124",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 33,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "232.00",
							},
							item: {
								quantity: {
									available: {
										count: "131",
									},
									maximum: {
										count: "131",
									},
								},
								price: {
									currency: "INR",
									value: "232.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 33,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "282.00",
							},
							item: {
								quantity: {
									available: {
										count: "131",
									},
									maximum: {
										count: "131",
									},
								},
								price: {
									currency: "INR",
									value: "282.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 33,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "332.00",
							},
							item: {
								quantity: {
									available: {
										count: "131",
									},
									maximum: {
										count: "131",
									},
								},
								price: {
									currency: "INR",
									value: "332.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "32.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "32.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-43.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "707.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "707.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "35.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "42.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484343",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 34,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 34,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 34,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560060",
					},
					phone: "9399788651",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400086",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663743",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989931",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110125",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 34,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "233.00",
							},
							item: {
								quantity: {
									available: {
										count: "132",
									},
									maximum: {
										count: "132",
									},
								},
								price: {
									currency: "INR",
									value: "233.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 34,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "283.00",
							},
							item: {
								quantity: {
									available: {
										count: "132",
									},
									maximum: {
										count: "132",
									},
								},
								price: {
									currency: "INR",
									value: "283.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 34,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "333.00",
							},
							item: {
								quantity: {
									available: {
										count: "132",
									},
									maximum: {
										count: "132",
									},
								},
								price: {
									currency: "INR",
									value: "333.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "33.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "33.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-42.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "708.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "708.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "36.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "43.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484345",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 35,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 35,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 35,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560061",
					},
					phone: "9399788652",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400087",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663744",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989932",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110126",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 35,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "234.00",
							},
							item: {
								quantity: {
									available: {
										count: "133",
									},
									maximum: {
										count: "133",
									},
								},
								price: {
									currency: "INR",
									value: "234.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 35,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "284.00",
							},
							item: {
								quantity: {
									available: {
										count: "133",
									},
									maximum: {
										count: "133",
									},
								},
								price: {
									currency: "INR",
									value: "284.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 35,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "334.00",
							},
							item: {
								quantity: {
									available: {
										count: "133",
									},
									maximum: {
										count: "133",
									},
								},
								price: {
									currency: "INR",
									value: "334.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "34.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "34.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-41.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "709.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "709.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "37.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "44.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484347",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 36,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 36,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 36,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560062",
					},
					phone: "9399788653",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400088",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663745",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989933",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110127",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 36,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "235.00",
							},
							item: {
								quantity: {
									available: {
										count: "134",
									},
									maximum: {
										count: "134",
									},
								},
								price: {
									currency: "INR",
									value: "235.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 36,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "285.00",
							},
							item: {
								quantity: {
									available: {
										count: "134",
									},
									maximum: {
										count: "134",
									},
								},
								price: {
									currency: "INR",
									value: "285.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 36,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "335.00",
							},
							item: {
								quantity: {
									available: {
										count: "134",
									},
									maximum: {
										count: "134",
									},
								},
								price: {
									currency: "INR",
									value: "335.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "35.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "35.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-40.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "710.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "710.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "38.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "45.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484349",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 37,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 37,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 37,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560063",
					},
					phone: "9399788654",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400089",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663746",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989934",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110128",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 37,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "236.00",
							},
							item: {
								quantity: {
									available: {
										count: "135",
									},
									maximum: {
										count: "135",
									},
								},
								price: {
									currency: "INR",
									value: "236.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 37,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "286.00",
							},
							item: {
								quantity: {
									available: {
										count: "135",
									},
									maximum: {
										count: "135",
									},
								},
								price: {
									currency: "INR",
									value: "286.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 37,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "336.00",
							},
							item: {
								quantity: {
									available: {
										count: "135",
									},
									maximum: {
										count: "135",
									},
								},
								price: {
									currency: "INR",
									value: "336.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "36.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "36.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-39.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "711.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "711.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "39.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "46.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484351",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 38,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 38,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 38,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560064",
					},
					phone: "9399788655",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400090",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663747",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989935",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110129",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 38,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "237.00",
							},
							item: {
								quantity: {
									available: {
										count: "136",
									},
									maximum: {
										count: "136",
									},
								},
								price: {
									currency: "INR",
									value: "237.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 38,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "287.00",
							},
							item: {
								quantity: {
									available: {
										count: "136",
									},
									maximum: {
										count: "136",
									},
								},
								price: {
									currency: "INR",
									value: "287.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 38,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "337.00",
							},
							item: {
								quantity: {
									available: {
										count: "136",
									},
									maximum: {
										count: "136",
									},
								},
								price: {
									currency: "INR",
									value: "337.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "37.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "37.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-38.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "712.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "712.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "40.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "47.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484353",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 39,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 39,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 39,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560065",
					},
					phone: "9399788656",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400091",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663748",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989936",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110130",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 39,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "238.00",
							},
							item: {
								quantity: {
									available: {
										count: "137",
									},
									maximum: {
										count: "137",
									},
								},
								price: {
									currency: "INR",
									value: "238.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 39,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "288.00",
							},
							item: {
								quantity: {
									available: {
										count: "137",
									},
									maximum: {
										count: "137",
									},
								},
								price: {
									currency: "INR",
									value: "288.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 39,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "338.00",
							},
							item: {
								quantity: {
									available: {
										count: "137",
									},
									maximum: {
										count: "137",
									},
								},
								price: {
									currency: "INR",
									value: "338.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "38.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "38.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-37.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "713.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "713.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "41.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "48.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484355",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 40,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 40,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 40,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560066",
					},
					phone: "9399788657",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400092",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663749",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989937",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110131",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 40,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "239.00",
							},
							item: {
								quantity: {
									available: {
										count: "138",
									},
									maximum: {
										count: "138",
									},
								},
								price: {
									currency: "INR",
									value: "239.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 40,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "289.00",
							},
							item: {
								quantity: {
									available: {
										count: "138",
									},
									maximum: {
										count: "138",
									},
								},
								price: {
									currency: "INR",
									value: "289.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 40,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "339.00",
							},
							item: {
								quantity: {
									available: {
										count: "138",
									},
									maximum: {
										count: "138",
									},
								},
								price: {
									currency: "INR",
									value: "339.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "39.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "39.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-36.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "714.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "714.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "42.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "49.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484357",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 41,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 41,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 41,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560067",
					},
					phone: "9399788658",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400093",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663750",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989938",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110132",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 41,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "240.00",
							},
							item: {
								quantity: {
									available: {
										count: "139",
									},
									maximum: {
										count: "139",
									},
								},
								price: {
									currency: "INR",
									value: "240.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 41,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "290.00",
							},
							item: {
								quantity: {
									available: {
										count: "139",
									},
									maximum: {
										count: "139",
									},
								},
								price: {
									currency: "INR",
									value: "290.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 41,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "340.00",
							},
							item: {
								quantity: {
									available: {
										count: "139",
									},
									maximum: {
										count: "139",
									},
								},
								price: {
									currency: "INR",
									value: "340.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "40.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "40.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-35.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "715.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "715.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "43.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "50.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484359",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 42,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 42,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 42,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560068",
					},
					phone: "9399788659",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400094",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663751",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989939",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110133",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 42,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "241.00",
							},
							item: {
								quantity: {
									available: {
										count: "140",
									},
									maximum: {
										count: "140",
									},
								},
								price: {
									currency: "INR",
									value: "241.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 42,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "291.00",
							},
							item: {
								quantity: {
									available: {
										count: "140",
									},
									maximum: {
										count: "140",
									},
								},
								price: {
									currency: "INR",
									value: "291.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 42,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "341.00",
							},
							item: {
								quantity: {
									available: {
										count: "140",
									},
									maximum: {
										count: "140",
									},
								},
								price: {
									currency: "INR",
									value: "341.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "41.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "41.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-34.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "716.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "716.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "44.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "51.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484361",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 43,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 43,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 43,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560069",
					},
					phone: "9399788660",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400095",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663752",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989940",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110134",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 43,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "242.00",
							},
							item: {
								quantity: {
									available: {
										count: "141",
									},
									maximum: {
										count: "141",
									},
								},
								price: {
									currency: "INR",
									value: "242.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 43,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "292.00",
							},
							item: {
								quantity: {
									available: {
										count: "141",
									},
									maximum: {
										count: "141",
									},
								},
								price: {
									currency: "INR",
									value: "292.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 43,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "342.00",
							},
							item: {
								quantity: {
									available: {
										count: "141",
									},
									maximum: {
										count: "141",
									},
								},
								price: {
									currency: "INR",
									value: "342.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "42.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "42.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-33.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "717.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "717.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "45.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "52.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484363",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 44,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 44,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 44,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560070",
					},
					phone: "9399788661",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400096",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663753",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989941",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110135",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 44,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "243.00",
							},
							item: {
								quantity: {
									available: {
										count: "142",
									},
									maximum: {
										count: "142",
									},
								},
								price: {
									currency: "INR",
									value: "243.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 44,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "293.00",
							},
							item: {
								quantity: {
									available: {
										count: "142",
									},
									maximum: {
										count: "142",
									},
								},
								price: {
									currency: "INR",
									value: "293.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 44,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "343.00",
							},
							item: {
								quantity: {
									available: {
										count: "142",
									},
									maximum: {
										count: "142",
									},
								},
								price: {
									currency: "INR",
									value: "343.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "43.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "43.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-32.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "718.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "718.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "46.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "53.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484365",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 45,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 45,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 45,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560071",
					},
					phone: "9399788662",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400097",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663754",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989942",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110136",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 45,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "244.00",
							},
							item: {
								quantity: {
									available: {
										count: "143",
									},
									maximum: {
										count: "143",
									},
								},
								price: {
									currency: "INR",
									value: "244.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 45,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "294.00",
							},
							item: {
								quantity: {
									available: {
										count: "143",
									},
									maximum: {
										count: "143",
									},
								},
								price: {
									currency: "INR",
									value: "294.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 45,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "344.00",
							},
							item: {
								quantity: {
									available: {
										count: "143",
									},
									maximum: {
										count: "143",
									},
								},
								price: {
									currency: "INR",
									value: "344.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "44.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "44.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-31.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "719.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "719.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "47.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "54.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484367",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 46,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 46,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 46,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560072",
					},
					phone: "9399788663",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400098",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663755",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989943",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110137",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 46,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "245.00",
							},
							item: {
								quantity: {
									available: {
										count: "144",
									},
									maximum: {
										count: "144",
									},
								},
								price: {
									currency: "INR",
									value: "245.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 46,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "295.00",
							},
							item: {
								quantity: {
									available: {
										count: "144",
									},
									maximum: {
										count: "144",
									},
								},
								price: {
									currency: "INR",
									value: "295.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 46,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "345.00",
							},
							item: {
								quantity: {
									available: {
										count: "144",
									},
									maximum: {
										count: "144",
									},
								},
								price: {
									currency: "INR",
									value: "345.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "45.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "45.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-30.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "720.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "720.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "48.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "55.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484369",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 47,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 47,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 47,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560073",
					},
					phone: "9399788664",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400099",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663756",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989944",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110138",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 47,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "246.00",
							},
							item: {
								quantity: {
									available: {
										count: "145",
									},
									maximum: {
										count: "145",
									},
								},
								price: {
									currency: "INR",
									value: "246.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 47,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "296.00",
							},
							item: {
								quantity: {
									available: {
										count: "145",
									},
									maximum: {
										count: "145",
									},
								},
								price: {
									currency: "INR",
									value: "296.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 47,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "346.00",
							},
							item: {
								quantity: {
									available: {
										count: "145",
									},
									maximum: {
										count: "145",
									},
								},
								price: {
									currency: "INR",
									value: "346.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "46.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "46.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-29.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "721.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "721.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "49.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "56.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484371",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 48,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 48,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 48,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560074",
					},
					phone: "9399788665",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400100",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663757",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989945",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110139",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 48,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "247.00",
							},
							item: {
								quantity: {
									available: {
										count: "146",
									},
									maximum: {
										count: "146",
									},
								},
								price: {
									currency: "INR",
									value: "247.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 48,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "297.00",
							},
							item: {
								quantity: {
									available: {
										count: "146",
									},
									maximum: {
										count: "146",
									},
								},
								price: {
									currency: "INR",
									value: "297.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 48,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "347.00",
							},
							item: {
								quantity: {
									available: {
										count: "146",
									},
									maximum: {
										count: "146",
									},
								},
								price: {
									currency: "INR",
									value: "347.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "47.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "47.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-28.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "722.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "722.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "50.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "57.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484373",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 49,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 49,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 49,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560075",
					},
					phone: "9399788666",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400101",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663758",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989946",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110140",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 49,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "248.00",
							},
							item: {
								quantity: {
									available: {
										count: "147",
									},
									maximum: {
										count: "147",
									},
								},
								price: {
									currency: "INR",
									value: "248.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 49,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "298.00",
							},
							item: {
								quantity: {
									available: {
										count: "147",
									},
									maximum: {
										count: "147",
									},
								},
								price: {
									currency: "INR",
									value: "298.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 49,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "348.00",
							},
							item: {
								quantity: {
									available: {
										count: "147",
									},
									maximum: {
										count: "147",
									},
								},
								price: {
									currency: "INR",
									value: "348.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "48.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "48.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-27.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "723.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "723.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "51.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "58.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484375",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 50,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 50,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 50,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560076",
					},
					phone: "9399788667",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400102",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663759",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989947",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110141",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 50,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "249.00",
							},
							item: {
								quantity: {
									available: {
										count: "148",
									},
									maximum: {
										count: "148",
									},
								},
								price: {
									currency: "INR",
									value: "249.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 50,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "299.00",
							},
							item: {
								quantity: {
									available: {
										count: "148",
									},
									maximum: {
										count: "148",
									},
								},
								price: {
									currency: "INR",
									value: "299.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 50,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "349.00",
							},
							item: {
								quantity: {
									available: {
										count: "148",
									},
									maximum: {
										count: "148",
									},
								},
								price: {
									currency: "INR",
									value: "349.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "49.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "49.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-26.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "724.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "724.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "52.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "59.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484377",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 51,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 51,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 51,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560077",
					},
					phone: "9399788668",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400103",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663760",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989948",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110142",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 51,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "250.00",
							},
							item: {
								quantity: {
									available: {
										count: "149",
									},
									maximum: {
										count: "149",
									},
								},
								price: {
									currency: "INR",
									value: "250.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 51,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "300.00",
							},
							item: {
								quantity: {
									available: {
										count: "149",
									},
									maximum: {
										count: "149",
									},
								},
								price: {
									currency: "INR",
									value: "300.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 51,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "350.00",
							},
							item: {
								quantity: {
									available: {
										count: "149",
									},
									maximum: {
										count: "149",
									},
								},
								price: {
									currency: "INR",
									value: "350.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "50.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "50.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-25.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "725.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "725.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "53.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "60.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484379",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 52,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 52,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 52,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560078",
					},
					phone: "9399788669",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400104",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663761",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989949",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110143",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 52,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "251.00",
							},
							item: {
								quantity: {
									available: {
										count: "150",
									},
									maximum: {
										count: "150",
									},
								},
								price: {
									currency: "INR",
									value: "251.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 52,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "301.00",
							},
							item: {
								quantity: {
									available: {
										count: "150",
									},
									maximum: {
										count: "150",
									},
								},
								price: {
									currency: "INR",
									value: "301.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 52,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "351.00",
							},
							item: {
								quantity: {
									available: {
										count: "150",
									},
									maximum: {
										count: "150",
									},
								},
								price: {
									currency: "INR",
									value: "351.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "51.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "51.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-24.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "726.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "726.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "54.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "61.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484381",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 53,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 53,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 53,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560079",
					},
					phone: "9399788670",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400105",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663762",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989950",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110144",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 53,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "252.00",
							},
							item: {
								quantity: {
									available: {
										count: "151",
									},
									maximum: {
										count: "151",
									},
								},
								price: {
									currency: "INR",
									value: "252.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 53,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "302.00",
							},
							item: {
								quantity: {
									available: {
										count: "151",
									},
									maximum: {
										count: "151",
									},
								},
								price: {
									currency: "INR",
									value: "302.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 53,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "352.00",
							},
							item: {
								quantity: {
									available: {
										count: "151",
									},
									maximum: {
										count: "151",
									},
								},
								price: {
									currency: "INR",
									value: "352.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "52.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "52.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-23.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "727.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "727.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "55.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "62.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484383",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 54,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 54,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 54,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560080",
					},
					phone: "9399788671",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400106",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663763",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989951",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110145",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 54,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "253.00",
							},
							item: {
								quantity: {
									available: {
										count: "152",
									},
									maximum: {
										count: "152",
									},
								},
								price: {
									currency: "INR",
									value: "253.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 54,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "303.00",
							},
							item: {
								quantity: {
									available: {
										count: "152",
									},
									maximum: {
										count: "152",
									},
								},
								price: {
									currency: "INR",
									value: "303.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 54,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "353.00",
							},
							item: {
								quantity: {
									available: {
										count: "152",
									},
									maximum: {
										count: "152",
									},
								},
								price: {
									currency: "INR",
									value: "353.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "53.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "53.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-22.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "728.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "728.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "56.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "63.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484385",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 55,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 55,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 55,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560081",
					},
					phone: "9399788672",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400107",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663764",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989952",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110146",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 55,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "254.00",
							},
							item: {
								quantity: {
									available: {
										count: "153",
									},
									maximum: {
										count: "153",
									},
								},
								price: {
									currency: "INR",
									value: "254.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 55,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "304.00",
							},
							item: {
								quantity: {
									available: {
										count: "153",
									},
									maximum: {
										count: "153",
									},
								},
								price: {
									currency: "INR",
									value: "304.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 55,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "354.00",
							},
							item: {
								quantity: {
									available: {
										count: "153",
									},
									maximum: {
										count: "153",
									},
								},
								price: {
									currency: "INR",
									value: "354.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "54.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "54.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-21.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "729.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "729.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "57.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "64.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484387",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 56,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 56,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 56,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560082",
					},
					phone: "9399788673",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400108",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663765",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989953",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110147",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 56,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "255.00",
							},
							item: {
								quantity: {
									available: {
										count: "154",
									},
									maximum: {
										count: "154",
									},
								},
								price: {
									currency: "INR",
									value: "255.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 56,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "305.00",
							},
							item: {
								quantity: {
									available: {
										count: "154",
									},
									maximum: {
										count: "154",
									},
								},
								price: {
									currency: "INR",
									value: "305.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 56,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "355.00",
							},
							item: {
								quantity: {
									available: {
										count: "154",
									},
									maximum: {
										count: "154",
									},
								},
								price: {
									currency: "INR",
									value: "355.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "55.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "55.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-20.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "730.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "730.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "58.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "65.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484389",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 57,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 57,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 57,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560083",
					},
					phone: "9399788674",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400109",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663766",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989954",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110148",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 57,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "256.00",
							},
							item: {
								quantity: {
									available: {
										count: "155",
									},
									maximum: {
										count: "155",
									},
								},
								price: {
									currency: "INR",
									value: "256.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 57,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "306.00",
							},
							item: {
								quantity: {
									available: {
										count: "155",
									},
									maximum: {
										count: "155",
									},
								},
								price: {
									currency: "INR",
									value: "306.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 57,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "356.00",
							},
							item: {
								quantity: {
									available: {
										count: "155",
									},
									maximum: {
										count: "155",
									},
								},
								price: {
									currency: "INR",
									value: "356.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "56.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "56.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-19.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "731.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "731.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "59.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "66.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484391",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 58,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 58,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 58,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560084",
					},
					phone: "9399788675",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400110",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663767",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989955",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110149",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 58,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "257.00",
							},
							item: {
								quantity: {
									available: {
										count: "156",
									},
									maximum: {
										count: "156",
									},
								},
								price: {
									currency: "INR",
									value: "257.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 58,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "307.00",
							},
							item: {
								quantity: {
									available: {
										count: "156",
									},
									maximum: {
										count: "156",
									},
								},
								price: {
									currency: "INR",
									value: "307.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 58,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "357.00",
							},
							item: {
								quantity: {
									available: {
										count: "156",
									},
									maximum: {
										count: "156",
									},
								},
								price: {
									currency: "INR",
									value: "357.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "57.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "57.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-18.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "732.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "732.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "60.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "67.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484393",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 59,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 59,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 59,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560085",
					},
					phone: "9399788676",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400111",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663768",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989956",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110150",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 59,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "258.00",
							},
							item: {
								quantity: {
									available: {
										count: "157",
									},
									maximum: {
										count: "157",
									},
								},
								price: {
									currency: "INR",
									value: "258.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 59,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "308.00",
							},
							item: {
								quantity: {
									available: {
										count: "157",
									},
									maximum: {
										count: "157",
									},
								},
								price: {
									currency: "INR",
									value: "308.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 59,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "358.00",
							},
							item: {
								quantity: {
									available: {
										count: "157",
									},
									maximum: {
										count: "157",
									},
								},
								price: {
									currency: "INR",
									value: "358.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "58.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "58.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-17.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "733.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "733.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "61.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "68.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484395",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 60,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 60,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 60,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560086",
					},
					phone: "9399788677",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400112",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663769",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989957",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110151",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 60,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "259.00",
							},
							item: {
								quantity: {
									available: {
										count: "158",
									},
									maximum: {
										count: "158",
									},
								},
								price: {
									currency: "INR",
									value: "259.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 60,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "309.00",
							},
							item: {
								quantity: {
									available: {
										count: "158",
									},
									maximum: {
										count: "158",
									},
								},
								price: {
									currency: "INR",
									value: "309.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 60,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "359.00",
							},
							item: {
								quantity: {
									available: {
										count: "158",
									},
									maximum: {
										count: "158",
									},
								},
								price: {
									currency: "INR",
									value: "359.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "59.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "59.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-16.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "734.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "734.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "62.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "69.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484397",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 61,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 61,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 61,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560087",
					},
					phone: "9399788678",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400113",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663770",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989958",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110152",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 61,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "260.00",
							},
							item: {
								quantity: {
									available: {
										count: "159",
									},
									maximum: {
										count: "159",
									},
								},
								price: {
									currency: "INR",
									value: "260.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 61,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "310.00",
							},
							item: {
								quantity: {
									available: {
										count: "159",
									},
									maximum: {
										count: "159",
									},
								},
								price: {
									currency: "INR",
									value: "310.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 61,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "360.00",
							},
							item: {
								quantity: {
									available: {
										count: "159",
									},
									maximum: {
										count: "159",
									},
								},
								price: {
									currency: "INR",
									value: "360.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "60.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "60.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-15.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "735.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "735.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "63.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "70.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484399",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 62,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 62,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 62,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560088",
					},
					phone: "9399788679",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400114",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663771",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989959",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110153",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 62,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "261.00",
							},
							item: {
								quantity: {
									available: {
										count: "160",
									},
									maximum: {
										count: "160",
									},
								},
								price: {
									currency: "INR",
									value: "261.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 62,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "311.00",
							},
							item: {
								quantity: {
									available: {
										count: "160",
									},
									maximum: {
										count: "160",
									},
								},
								price: {
									currency: "INR",
									value: "311.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 62,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "361.00",
							},
							item: {
								quantity: {
									available: {
										count: "160",
									},
									maximum: {
										count: "160",
									},
								},
								price: {
									currency: "INR",
									value: "361.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "61.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "61.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-14.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "736.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "736.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "64.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "71.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484401",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 63,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 63,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 63,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560089",
					},
					phone: "9399788680",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400115",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663772",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989960",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110154",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 63,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "262.00",
							},
							item: {
								quantity: {
									available: {
										count: "161",
									},
									maximum: {
										count: "161",
									},
								},
								price: {
									currency: "INR",
									value: "262.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 63,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "312.00",
							},
							item: {
								quantity: {
									available: {
										count: "161",
									},
									maximum: {
										count: "161",
									},
								},
								price: {
									currency: "INR",
									value: "312.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 63,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "362.00",
							},
							item: {
								quantity: {
									available: {
										count: "161",
									},
									maximum: {
										count: "161",
									},
								},
								price: {
									currency: "INR",
									value: "362.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "62.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "62.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-13.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "737.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "737.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "65.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "72.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484403",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 64,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 64,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 64,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560090",
					},
					phone: "9399788681",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400116",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663773",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989961",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110155",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 64,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "263.00",
							},
							item: {
								quantity: {
									available: {
										count: "162",
									},
									maximum: {
										count: "162",
									},
								},
								price: {
									currency: "INR",
									value: "263.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 64,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "313.00",
							},
							item: {
								quantity: {
									available: {
										count: "162",
									},
									maximum: {
										count: "162",
									},
								},
								price: {
									currency: "INR",
									value: "313.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 64,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "363.00",
							},
							item: {
								quantity: {
									available: {
										count: "162",
									},
									maximum: {
										count: "162",
									},
								},
								price: {
									currency: "INR",
									value: "363.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "63.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "63.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-12.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "738.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "738.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "66.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "73.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484405",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 65,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 65,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 65,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560091",
					},
					phone: "9399788682",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400117",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663774",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989962",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110156",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 65,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "264.00",
							},
							item: {
								quantity: {
									available: {
										count: "163",
									},
									maximum: {
										count: "163",
									},
								},
								price: {
									currency: "INR",
									value: "264.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 65,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "314.00",
							},
							item: {
								quantity: {
									available: {
										count: "163",
									},
									maximum: {
										count: "163",
									},
								},
								price: {
									currency: "INR",
									value: "314.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 65,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "364.00",
							},
							item: {
								quantity: {
									available: {
										count: "163",
									},
									maximum: {
										count: "163",
									},
								},
								price: {
									currency: "INR",
									value: "364.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "64.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "64.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-11.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "739.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "739.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "67.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "74.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484407",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 66,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 66,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 66,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560092",
					},
					phone: "9399788683",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400118",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663775",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989963",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110157",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 66,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "265.00",
							},
							item: {
								quantity: {
									available: {
										count: "164",
									},
									maximum: {
										count: "164",
									},
								},
								price: {
									currency: "INR",
									value: "265.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 66,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "315.00",
							},
							item: {
								quantity: {
									available: {
										count: "164",
									},
									maximum: {
										count: "164",
									},
								},
								price: {
									currency: "INR",
									value: "315.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 66,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "365.00",
							},
							item: {
								quantity: {
									available: {
										count: "164",
									},
									maximum: {
										count: "164",
									},
								},
								price: {
									currency: "INR",
									value: "365.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "65.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "65.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-10.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "740.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "740.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "68.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "75.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484409",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 67,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 67,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 67,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560093",
					},
					phone: "9399788684",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400119",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663776",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989964",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110158",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 67,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "266.00",
							},
							item: {
								quantity: {
									available: {
										count: "165",
									},
									maximum: {
										count: "165",
									},
								},
								price: {
									currency: "INR",
									value: "266.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 67,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "316.00",
							},
							item: {
								quantity: {
									available: {
										count: "165",
									},
									maximum: {
										count: "165",
									},
								},
								price: {
									currency: "INR",
									value: "316.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 67,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "366.00",
							},
							item: {
								quantity: {
									available: {
										count: "165",
									},
									maximum: {
										count: "165",
									},
								},
								price: {
									currency: "INR",
									value: "366.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "66.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "66.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-9.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "741.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "741.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "69.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "76.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484411",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 68,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 68,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 68,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560094",
					},
					phone: "9399788685",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400120",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663777",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989965",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110159",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 68,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "267.00",
							},
							item: {
								quantity: {
									available: {
										count: "166",
									},
									maximum: {
										count: "166",
									},
								},
								price: {
									currency: "INR",
									value: "267.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 68,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "317.00",
							},
							item: {
								quantity: {
									available: {
										count: "166",
									},
									maximum: {
										count: "166",
									},
								},
								price: {
									currency: "INR",
									value: "317.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 68,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "367.00",
							},
							item: {
								quantity: {
									available: {
										count: "166",
									},
									maximum: {
										count: "166",
									},
								},
								price: {
									currency: "INR",
									value: "367.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "67.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "67.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-8.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "742.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "742.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "70.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "77.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484413",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 69,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 69,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 69,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560095",
					},
					phone: "9399788686",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400121",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663778",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989966",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110160",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 69,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "268.00",
							},
							item: {
								quantity: {
									available: {
										count: "167",
									},
									maximum: {
										count: "167",
									},
								},
								price: {
									currency: "INR",
									value: "268.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 69,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "318.00",
							},
							item: {
								quantity: {
									available: {
										count: "167",
									},
									maximum: {
										count: "167",
									},
								},
								price: {
									currency: "INR",
									value: "318.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 69,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "368.00",
							},
							item: {
								quantity: {
									available: {
										count: "167",
									},
									maximum: {
										count: "167",
									},
								},
								price: {
									currency: "INR",
									value: "368.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "68.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "68.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-7.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "743.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "743.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "71.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "78.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484415",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 70,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 70,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 70,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560096",
					},
					phone: "9399788687",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400122",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663779",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989967",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110161",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 70,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "269.00",
							},
							item: {
								quantity: {
									available: {
										count: "168",
									},
									maximum: {
										count: "168",
									},
								},
								price: {
									currency: "INR",
									value: "269.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 70,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "319.00",
							},
							item: {
								quantity: {
									available: {
										count: "168",
									},
									maximum: {
										count: "168",
									},
								},
								price: {
									currency: "INR",
									value: "319.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 70,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "369.00",
							},
							item: {
								quantity: {
									available: {
										count: "168",
									},
									maximum: {
										count: "168",
									},
								},
								price: {
									currency: "INR",
									value: "369.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "69.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "69.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-6.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "744.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "744.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "72.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "79.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484417",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 71,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 71,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 71,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560097",
					},
					phone: "9399788688",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400123",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663780",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989968",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110162",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 71,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "270.00",
							},
							item: {
								quantity: {
									available: {
										count: "169",
									},
									maximum: {
										count: "169",
									},
								},
								price: {
									currency: "INR",
									value: "270.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 71,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "320.00",
							},
							item: {
								quantity: {
									available: {
										count: "169",
									},
									maximum: {
										count: "169",
									},
								},
								price: {
									currency: "INR",
									value: "320.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 71,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "370.00",
							},
							item: {
								quantity: {
									available: {
										count: "169",
									},
									maximum: {
										count: "169",
									},
								},
								price: {
									currency: "INR",
									value: "370.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "70.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "70.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-5.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "745.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "745.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "73.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "80.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484419",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 72,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 72,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 72,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560098",
					},
					phone: "9399788689",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400124",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663781",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989969",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110163",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 72,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "271.00",
							},
							item: {
								quantity: {
									available: {
										count: "170",
									},
									maximum: {
										count: "170",
									},
								},
								price: {
									currency: "INR",
									value: "271.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 72,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "321.00",
							},
							item: {
								quantity: {
									available: {
										count: "170",
									},
									maximum: {
										count: "170",
									},
								},
								price: {
									currency: "INR",
									value: "321.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 72,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "371.00",
							},
							item: {
								quantity: {
									available: {
										count: "170",
									},
									maximum: {
										count: "170",
									},
								},
								price: {
									currency: "INR",
									value: "371.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "71.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "71.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-4.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "746.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "746.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "74.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "81.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484421",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 73,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 73,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 73,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560099",
					},
					phone: "9399788690",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400125",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663782",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989970",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110164",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 73,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "272.00",
							},
							item: {
								quantity: {
									available: {
										count: "171",
									},
									maximum: {
										count: "171",
									},
								},
								price: {
									currency: "INR",
									value: "272.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 73,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "322.00",
							},
							item: {
								quantity: {
									available: {
										count: "171",
									},
									maximum: {
										count: "171",
									},
								},
								price: {
									currency: "INR",
									value: "322.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 73,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "372.00",
							},
							item: {
								quantity: {
									available: {
										count: "171",
									},
									maximum: {
										count: "171",
									},
								},
								price: {
									currency: "INR",
									value: "372.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "72.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "72.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-3.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "747.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "747.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "75.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "82.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484423",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 74,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 74,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 74,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560100",
					},
					phone: "9399788691",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400126",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663783",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989971",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110165",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 74,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "273.00",
							},
							item: {
								quantity: {
									available: {
										count: "172",
									},
									maximum: {
										count: "172",
									},
								},
								price: {
									currency: "INR",
									value: "273.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 74,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "323.00",
							},
							item: {
								quantity: {
									available: {
										count: "172",
									},
									maximum: {
										count: "172",
									},
								},
								price: {
									currency: "INR",
									value: "323.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 74,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "373.00",
							},
							item: {
								quantity: {
									available: {
										count: "172",
									},
									maximum: {
										count: "172",
									},
								},
								price: {
									currency: "INR",
									value: "373.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "73.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "73.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-2.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "748.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "748.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "76.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "83.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484425",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 75,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 75,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 75,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560101",
					},
					phone: "9399788692",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400127",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663784",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989972",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110166",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 75,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "274.00",
							},
							item: {
								quantity: {
									available: {
										count: "173",
									},
									maximum: {
										count: "173",
									},
								},
								price: {
									currency: "INR",
									value: "274.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 75,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "324.00",
							},
							item: {
								quantity: {
									available: {
										count: "173",
									},
									maximum: {
										count: "173",
									},
								},
								price: {
									currency: "INR",
									value: "324.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 75,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "374.00",
							},
							item: {
								quantity: {
									available: {
										count: "173",
									},
									maximum: {
										count: "173",
									},
								},
								price: {
									currency: "INR",
									value: "374.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "74.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "74.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "-1.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "749.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "749.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "77.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "84.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484427",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 76,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 76,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 76,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560102",
					},
					phone: "9399788693",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400128",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663785",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989973",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110167",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 76,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "275.00",
							},
							item: {
								quantity: {
									available: {
										count: "174",
									},
									maximum: {
										count: "174",
									},
								},
								price: {
									currency: "INR",
									value: "275.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 76,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "325.00",
							},
							item: {
								quantity: {
									available: {
										count: "174",
									},
									maximum: {
										count: "174",
									},
								},
								price: {
									currency: "INR",
									value: "325.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 76,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "375.00",
							},
							item: {
								quantity: {
									available: {
										count: "174",
									},
									maximum: {
										count: "174",
									},
								},
								price: {
									currency: "INR",
									value: "375.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "75.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "75.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "0.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "750.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "750.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "78.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "85.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484429",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 77,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 77,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 77,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560103",
					},
					phone: "9399788694",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400129",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663786",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989974",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110168",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 77,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "276.00",
							},
							item: {
								quantity: {
									available: {
										count: "175",
									},
									maximum: {
										count: "175",
									},
								},
								price: {
									currency: "INR",
									value: "276.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 77,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "326.00",
							},
							item: {
								quantity: {
									available: {
										count: "175",
									},
									maximum: {
										count: "175",
									},
								},
								price: {
									currency: "INR",
									value: "326.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 77,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "376.00",
							},
							item: {
								quantity: {
									available: {
										count: "175",
									},
									maximum: {
										count: "175",
									},
								},
								price: {
									currency: "INR",
									value: "376.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "76.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "76.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "1.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "751.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "751.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "79.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "86.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484431",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 78,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 78,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 78,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560104",
					},
					phone: "9399788695",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400130",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663787",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989975",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110169",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 78,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "277.00",
							},
							item: {
								quantity: {
									available: {
										count: "176",
									},
									maximum: {
										count: "176",
									},
								},
								price: {
									currency: "INR",
									value: "277.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 78,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "327.00",
							},
							item: {
								quantity: {
									available: {
										count: "176",
									},
									maximum: {
										count: "176",
									},
								},
								price: {
									currency: "INR",
									value: "327.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 78,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "377.00",
							},
							item: {
								quantity: {
									available: {
										count: "176",
									},
									maximum: {
										count: "176",
									},
								},
								price: {
									currency: "INR",
									value: "377.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "77.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "77.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "2.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "752.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "752.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "80.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "87.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484433",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 79,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 79,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 79,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560105",
					},
					phone: "9399788696",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400131",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663788",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989976",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110170",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 79,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "278.00",
							},
							item: {
								quantity: {
									available: {
										count: "177",
									},
									maximum: {
										count: "177",
									},
								},
								price: {
									currency: "INR",
									value: "278.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 79,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "328.00",
							},
							item: {
								quantity: {
									available: {
										count: "177",
									},
									maximum: {
										count: "177",
									},
								},
								price: {
									currency: "INR",
									value: "328.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 79,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "378.00",
							},
							item: {
								quantity: {
									available: {
										count: "177",
									},
									maximum: {
										count: "177",
									},
								},
								price: {
									currency: "INR",
									value: "378.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "78.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "78.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "3.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "753.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "753.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "81.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "88.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484435",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 80,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 80,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 80,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560106",
					},
					phone: "9399788697",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400132",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663789",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989977",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110171",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 80,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "279.00",
							},
							item: {
								quantity: {
									available: {
										count: "178",
									},
									maximum: {
										count: "178",
									},
								},
								price: {
									currency: "INR",
									value: "279.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 80,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "329.00",
							},
							item: {
								quantity: {
									available: {
										count: "178",
									},
									maximum: {
										count: "178",
									},
								},
								price: {
									currency: "INR",
									value: "329.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 80,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "379.00",
							},
							item: {
								quantity: {
									available: {
										count: "178",
									},
									maximum: {
										count: "178",
									},
								},
								price: {
									currency: "INR",
									value: "379.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "79.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "79.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "4.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "754.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "754.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "82.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "89.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484437",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 81,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 81,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 81,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560107",
					},
					phone: "9399788698",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400133",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663790",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989978",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110172",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 81,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "280.00",
							},
							item: {
								quantity: {
									available: {
										count: "179",
									},
									maximum: {
										count: "179",
									},
								},
								price: {
									currency: "INR",
									value: "280.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 81,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "330.00",
							},
							item: {
								quantity: {
									available: {
										count: "179",
									},
									maximum: {
										count: "179",
									},
								},
								price: {
									currency: "INR",
									value: "330.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 81,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "380.00",
							},
							item: {
								quantity: {
									available: {
										count: "179",
									},
									maximum: {
										count: "179",
									},
								},
								price: {
									currency: "INR",
									value: "380.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "80.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "80.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "5.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "755.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "755.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "83.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "90.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484439",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 82,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 82,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 82,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560108",
					},
					phone: "9399788699",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400134",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663791",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989979",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110173",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 82,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "281.00",
							},
							item: {
								quantity: {
									available: {
										count: "180",
									},
									maximum: {
										count: "180",
									},
								},
								price: {
									currency: "INR",
									value: "281.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 82,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "331.00",
							},
							item: {
								quantity: {
									available: {
										count: "180",
									},
									maximum: {
										count: "180",
									},
								},
								price: {
									currency: "INR",
									value: "331.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 82,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "381.00",
							},
							item: {
								quantity: {
									available: {
										count: "180",
									},
									maximum: {
										count: "180",
									},
								},
								price: {
									currency: "INR",
									value: "381.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "81.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "81.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "6.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "756.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "756.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "84.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "91.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484441",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 83,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 83,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 83,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560109",
					},
					phone: "9399788700",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400135",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663792",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989980",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110174",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 83,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "282.00",
							},
							item: {
								quantity: {
									available: {
										count: "181",
									},
									maximum: {
										count: "181",
									},
								},
								price: {
									currency: "INR",
									value: "282.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 83,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "332.00",
							},
							item: {
								quantity: {
									available: {
										count: "181",
									},
									maximum: {
										count: "181",
									},
								},
								price: {
									currency: "INR",
									value: "332.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 83,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "382.00",
							},
							item: {
								quantity: {
									available: {
										count: "181",
									},
									maximum: {
										count: "181",
									},
								},
								price: {
									currency: "INR",
									value: "382.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "82.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "82.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "7.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "757.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "757.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "85.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "92.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484443",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 84,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 84,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 84,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560110",
					},
					phone: "9399788701",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400136",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663793",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989981",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110175",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 84,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "283.00",
							},
							item: {
								quantity: {
									available: {
										count: "182",
									},
									maximum: {
										count: "182",
									},
								},
								price: {
									currency: "INR",
									value: "283.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 84,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "333.00",
							},
							item: {
								quantity: {
									available: {
										count: "182",
									},
									maximum: {
										count: "182",
									},
								},
								price: {
									currency: "INR",
									value: "333.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 84,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "383.00",
							},
							item: {
								quantity: {
									available: {
										count: "182",
									},
									maximum: {
										count: "182",
									},
								},
								price: {
									currency: "INR",
									value: "383.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "83.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "83.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "8.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "758.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "758.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "86.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "93.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484445",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 85,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 85,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 85,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560111",
					},
					phone: "9399788702",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400137",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663794",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989982",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110176",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 85,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "284.00",
							},
							item: {
								quantity: {
									available: {
										count: "183",
									},
									maximum: {
										count: "183",
									},
								},
								price: {
									currency: "INR",
									value: "284.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 85,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "334.00",
							},
							item: {
								quantity: {
									available: {
										count: "183",
									},
									maximum: {
										count: "183",
									},
								},
								price: {
									currency: "INR",
									value: "334.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 85,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "384.00",
							},
							item: {
								quantity: {
									available: {
										count: "183",
									},
									maximum: {
										count: "183",
									},
								},
								price: {
									currency: "INR",
									value: "384.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "84.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "84.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "9.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "759.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "759.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "87.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "94.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484447",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 86,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 86,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 86,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560112",
					},
					phone: "9399788703",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400138",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663795",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989983",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110177",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 86,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "285.00",
							},
							item: {
								quantity: {
									available: {
										count: "184",
									},
									maximum: {
										count: "184",
									},
								},
								price: {
									currency: "INR",
									value: "285.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 86,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "335.00",
							},
							item: {
								quantity: {
									available: {
										count: "184",
									},
									maximum: {
										count: "184",
									},
								},
								price: {
									currency: "INR",
									value: "335.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 86,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "385.00",
							},
							item: {
								quantity: {
									available: {
										count: "184",
									},
									maximum: {
										count: "184",
									},
								},
								price: {
									currency: "INR",
									value: "385.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "85.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "85.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "10.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "760.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "760.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "88.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "95.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484449",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 87,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 87,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 87,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560113",
					},
					phone: "9399788704",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400139",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663796",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989984",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110178",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 87,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "286.00",
							},
							item: {
								quantity: {
									available: {
										count: "185",
									},
									maximum: {
										count: "185",
									},
								},
								price: {
									currency: "INR",
									value: "286.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 87,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "336.00",
							},
							item: {
								quantity: {
									available: {
										count: "185",
									},
									maximum: {
										count: "185",
									},
								},
								price: {
									currency: "INR",
									value: "336.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 87,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "386.00",
							},
							item: {
								quantity: {
									available: {
										count: "185",
									},
									maximum: {
										count: "185",
									},
								},
								price: {
									currency: "INR",
									value: "386.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "86.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "86.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "11.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "761.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "761.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "89.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "96.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484451",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 88,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 88,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 88,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560114",
					},
					phone: "9399788705",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400140",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663797",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989985",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110179",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 88,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "287.00",
							},
							item: {
								quantity: {
									available: {
										count: "186",
									},
									maximum: {
										count: "186",
									},
								},
								price: {
									currency: "INR",
									value: "287.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 88,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "337.00",
							},
							item: {
								quantity: {
									available: {
										count: "186",
									},
									maximum: {
										count: "186",
									},
								},
								price: {
									currency: "INR",
									value: "337.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 88,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "387.00",
							},
							item: {
								quantity: {
									available: {
										count: "186",
									},
									maximum: {
										count: "186",
									},
								},
								price: {
									currency: "INR",
									value: "387.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "87.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "87.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "12.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "762.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "762.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "90.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "97.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484453",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 89,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 89,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 89,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560115",
					},
					phone: "9399788706",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400141",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663798",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989986",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110180",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 89,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "288.00",
							},
							item: {
								quantity: {
									available: {
										count: "187",
									},
									maximum: {
										count: "187",
									},
								},
								price: {
									currency: "INR",
									value: "288.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 89,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "338.00",
							},
							item: {
								quantity: {
									available: {
										count: "187",
									},
									maximum: {
										count: "187",
									},
								},
								price: {
									currency: "INR",
									value: "338.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 89,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "388.00",
							},
							item: {
								quantity: {
									available: {
										count: "187",
									},
									maximum: {
										count: "187",
									},
								},
								price: {
									currency: "INR",
									value: "388.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "88.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "88.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "13.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "763.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "763.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "91.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "98.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484455",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 90,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 90,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 90,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560116",
					},
					phone: "9399788707",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400142",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663799",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989987",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110181",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 90,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "289.00",
							},
							item: {
								quantity: {
									available: {
										count: "188",
									},
									maximum: {
										count: "188",
									},
								},
								price: {
									currency: "INR",
									value: "289.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 90,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "339.00",
							},
							item: {
								quantity: {
									available: {
										count: "188",
									},
									maximum: {
										count: "188",
									},
								},
								price: {
									currency: "INR",
									value: "339.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 90,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "389.00",
							},
							item: {
								quantity: {
									available: {
										count: "188",
									},
									maximum: {
										count: "188",
									},
								},
								price: {
									currency: "INR",
									value: "389.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "89.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "89.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "14.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "764.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "764.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "92.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "99.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484457",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 91,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 91,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 91,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560117",
					},
					phone: "9399788708",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400143",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663800",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989988",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110182",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 91,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "290.00",
							},
							item: {
								quantity: {
									available: {
										count: "189",
									},
									maximum: {
										count: "189",
									},
								},
								price: {
									currency: "INR",
									value: "290.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 91,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "340.00",
							},
							item: {
								quantity: {
									available: {
										count: "189",
									},
									maximum: {
										count: "189",
									},
								},
								price: {
									currency: "INR",
									value: "340.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 91,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "390.00",
							},
							item: {
								quantity: {
									available: {
										count: "189",
									},
									maximum: {
										count: "189",
									},
								},
								price: {
									currency: "INR",
									value: "390.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "90.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "90.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "15.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "765.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "765.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "93.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "100.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484459",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 92,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 92,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 92,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560118",
					},
					phone: "9399788709",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400144",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663801",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989989",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110183",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 92,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "291.00",
							},
							item: {
								quantity: {
									available: {
										count: "190",
									},
									maximum: {
										count: "190",
									},
								},
								price: {
									currency: "INR",
									value: "291.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 92,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "341.00",
							},
							item: {
								quantity: {
									available: {
										count: "190",
									},
									maximum: {
										count: "190",
									},
								},
								price: {
									currency: "INR",
									value: "341.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 92,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "391.00",
							},
							item: {
								quantity: {
									available: {
										count: "190",
									},
									maximum: {
										count: "190",
									},
								},
								price: {
									currency: "INR",
									value: "391.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "91.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "91.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "16.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "766.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "766.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "94.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "101.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484461",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 93,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 93,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 93,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560119",
					},
					phone: "9399788710",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400145",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663802",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989990",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110184",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 93,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "292.00",
							},
							item: {
								quantity: {
									available: {
										count: "191",
									},
									maximum: {
										count: "191",
									},
								},
								price: {
									currency: "INR",
									value: "292.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 93,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "342.00",
							},
							item: {
								quantity: {
									available: {
										count: "191",
									},
									maximum: {
										count: "191",
									},
								},
								price: {
									currency: "INR",
									value: "342.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 93,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "392.00",
							},
							item: {
								quantity: {
									available: {
										count: "191",
									},
									maximum: {
										count: "191",
									},
								},
								price: {
									currency: "INR",
									value: "392.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "92.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "92.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "17.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "767.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "767.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "95.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "102.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484463",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 94,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 94,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 94,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560120",
					},
					phone: "9399788711",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400146",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663803",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989991",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110185",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 94,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "293.00",
							},
							item: {
								quantity: {
									available: {
										count: "192",
									},
									maximum: {
										count: "192",
									},
								},
								price: {
									currency: "INR",
									value: "293.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 94,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "343.00",
							},
							item: {
								quantity: {
									available: {
										count: "192",
									},
									maximum: {
										count: "192",
									},
								},
								price: {
									currency: "INR",
									value: "343.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 94,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "393.00",
							},
							item: {
								quantity: {
									available: {
										count: "192",
									},
									maximum: {
										count: "192",
									},
								},
								price: {
									currency: "INR",
									value: "393.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "93.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "93.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "18.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "768.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "768.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "96.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "103.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484465",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 95,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 95,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 95,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560121",
					},
					phone: "9399788712",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400147",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663804",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989992",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110186",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 95,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "294.00",
							},
							item: {
								quantity: {
									available: {
										count: "193",
									},
									maximum: {
										count: "193",
									},
								},
								price: {
									currency: "INR",
									value: "294.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 95,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "344.00",
							},
							item: {
								quantity: {
									available: {
										count: "193",
									},
									maximum: {
										count: "193",
									},
								},
								price: {
									currency: "INR",
									value: "344.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 95,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "394.00",
							},
							item: {
								quantity: {
									available: {
										count: "193",
									},
									maximum: {
										count: "193",
									},
								},
								price: {
									currency: "INR",
									value: "394.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "94.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "94.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "19.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "769.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "769.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "97.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "104.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484467",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 96,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 96,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 96,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560122",
					},
					phone: "9399788713",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400148",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663805",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989993",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110187",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 96,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "295.00",
							},
							item: {
								quantity: {
									available: {
										count: "194",
									},
									maximum: {
										count: "194",
									},
								},
								price: {
									currency: "INR",
									value: "295.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 96,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "345.00",
							},
							item: {
								quantity: {
									available: {
										count: "194",
									},
									maximum: {
										count: "194",
									},
								},
								price: {
									currency: "INR",
									value: "345.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 96,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "395.00",
							},
							item: {
								quantity: {
									available: {
										count: "194",
									},
									maximum: {
										count: "194",
									},
								},
								price: {
									currency: "INR",
									value: "395.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "95.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "95.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "20.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "770.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "770.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "98.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "105.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484469",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 97,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 97,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 97,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560123",
					},
					phone: "9399788714",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400149",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663806",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989994",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110188",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 97,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "296.00",
							},
							item: {
								quantity: {
									available: {
										count: "195",
									},
									maximum: {
										count: "195",
									},
								},
								price: {
									currency: "INR",
									value: "296.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 97,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "346.00",
							},
							item: {
								quantity: {
									available: {
										count: "195",
									},
									maximum: {
										count: "195",
									},
								},
								price: {
									currency: "INR",
									value: "346.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 97,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "396.00",
							},
							item: {
								quantity: {
									available: {
										count: "195",
									},
									maximum: {
										count: "195",
									},
								},
								price: {
									currency: "INR",
									value: "396.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "96.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "96.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "21.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "771.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "771.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "99.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "106.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484471",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 98,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 98,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 98,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560124",
					},
					phone: "9399788715",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400150",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663807",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989995",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110189",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 98,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "297.00",
							},
							item: {
								quantity: {
									available: {
										count: "196",
									},
									maximum: {
										count: "196",
									},
								},
								price: {
									currency: "INR",
									value: "297.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 98,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "347.00",
							},
							item: {
								quantity: {
									available: {
										count: "196",
									},
									maximum: {
										count: "196",
									},
								},
								price: {
									currency: "INR",
									value: "347.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 98,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "397.00",
							},
							item: {
								quantity: {
									available: {
										count: "196",
									},
									maximum: {
										count: "196",
									},
								},
								price: {
									currency: "INR",
									value: "397.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "97.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "97.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "22.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "772.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "772.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "100.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "107.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484473",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 99,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 99,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 99,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560125",
					},
					phone: "9399788716",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400151",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663808",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989996",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110190",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 99,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "298.00",
							},
							item: {
								quantity: {
									available: {
										count: "197",
									},
									maximum: {
										count: "197",
									},
								},
								price: {
									currency: "INR",
									value: "298.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 99,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "348.00",
							},
							item: {
								quantity: {
									available: {
										count: "197",
									},
									maximum: {
										count: "197",
									},
								},
								price: {
									currency: "INR",
									value: "348.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 99,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "398.00",
							},
							item: {
								quantity: {
									available: {
										count: "197",
									},
									maximum: {
										count: "197",
									},
								},
								price: {
									currency: "INR",
									value: "398.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "98.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "98.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "23.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "773.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "773.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "101.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "108.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484475",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 100,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 100,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 100,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560126",
					},
					phone: "9399788717",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400152",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663809",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989997",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110191",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 100,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "299.00",
							},
							item: {
								quantity: {
									available: {
										count: "198",
									},
									maximum: {
										count: "198",
									},
								},
								price: {
									currency: "INR",
									value: "299.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 100,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "349.00",
							},
							item: {
								quantity: {
									available: {
										count: "198",
									},
									maximum: {
										count: "198",
									},
								},
								price: {
									currency: "INR",
									value: "349.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 100,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "399.00",
							},
							item: {
								quantity: {
									available: {
										count: "198",
									},
									maximum: {
										count: "198",
									},
								},
								price: {
									currency: "INR",
									value: "399.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "99.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "99.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "24.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "774.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "774.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "102.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "109.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
	{
		context: {
			action: "on_confirm",
			bap_id: "fis-staging.ondc.org",
			bap_uri: "https://fis-staging.ondc.org/rsf-utility/api",
			domain: "ONDC:RET14",
			city: "std:011",
			country: "IND",
			message_id: "44e3a347-a725-4fb6-a2e5-c2f04b37e8d9",
			timestamp: "2025-06-19T08:47:22.437Z",
			transaction_id: "eb58ddc1-8cc3-4d96-8b5c-22eac25aec29",
			core_version: "1.2.5",
			ttl: "PT30S",
			bpp_id: "fis-staging.ondc.org",
			bpp_uri: "https://fis-staging.ondc.org/rsf-utility/api",
		},
		message: {
			order: {
				id: "484477",
				state: "Completed",
				provider: {
					id: "P1",
					locations: [
						{
							id: "L1",
						},
					],
				},
				items: [
					{
						id: "I1",
						fulfillment_id: "F32822",
						quantity: {
							count: 101,
						},
					},
					{
						id: "I3",
						fulfillment_id: "F32822",
						quantity: {
							count: 101,
						},
					},
					{
						id: "I2",
						fulfillment_id: "F32822",
						quantity: {
							count: 101,
						},
					},
				],
				billing: {
					address: {
						name: "Door no. or building name",
						building: "New_Building",
						locality: "6th Cross Road",
						city: "Bengaluru",
						state: "Karnataka",
						country: "IND",
						area_code: "560127",
					},
					phone: "9399788718",
					name: "John Doe",
					email: "nobody@nomail.com",
					created_at: "2025-06-19T08:47:15.431Z",
					updated_at: "2025-06-19T08:47:15.431Z",
				},
				fulfillments: [
					{
						id: "F32822",
						type: "Buyer-Delivery",
						tracking: true,
						state: {
							descriptor: {
								code: "Pending",
							},
						},
						"@ondc/org/TAT": "P2D",
						"@ondc/org/provider_name": "mock_provider_name_0",
						start: {
							location: {
								id: "L1",
								descriptor: {
									name: "ABC Store",
								},
								gps: "19.129076,72.825803",
								address: {
									building: "my building name or house",
									city: "Mumbai",
									state: "Maharashtra",
									country: "IND",
									area_code: "400153",
									locality: "my street name",
									name: "my house or door or floor",
								},
							},
							contact: {
								phone: "9594663810",
								email: "nobody@nomail.com",
							},
						},
						end: {
							contact: {
								email: "nobody@nomail.com",
								phone: "9898989998",
							},
							person: {
								name: "mock-person",
							},
							location: {
								gps: "12.1233,12.9992",
								address: {
									building: "mock-building",
									city: "mock-city",
									state: "mock-state",
									country: "IND",
									area_code: "110192",
									locality: "mock-locality",
									name: "mock-house-name",
								},
							},
						},
					},
				],
				quote: {
					breakup: [
						{
							"@ondc/org/item_id": "I1",
							"@ondc/org/item_quantity": {
								count: 101,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "300.00",
							},
							item: {
								quantity: {
									available: {
										count: "199",
									},
									maximum: {
										count: "199",
									},
								},
								price: {
									currency: "INR",
									value: "300.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I3",
							"@ondc/org/item_quantity": {
								count: 101,
							},
							title: "Alphanso Mango",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "350.00",
							},
							item: {
								quantity: {
									available: {
										count: "199",
									},
									maximum: {
										count: "199",
									},
								},
								price: {
									currency: "INR",
									value: "350.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "I2",
							"@ondc/org/item_quantity": {
								count: 101,
							},
							title: "Plain Atta",
							"@ondc/org/title_type": "item",
							price: {
								currency: "INR",
								value: "400.00",
							},
							item: {
								quantity: {
									available: {
										count: "199",
									},
									maximum: {
										count: "199",
									},
								},
								price: {
									currency: "INR",
									value: "400.00",
								},
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Delivery charges",
							"@ondc/org/title_type": "delivery",
							price: {
								currency: "INR",
								value: "100.00",
							},
						},
						{
							"@ondc/org/item_id": "F1",
							title: "Convenience Fee",
							"@ondc/org/title_type": "misc",
							price: {
								currency: "INR",
								value: "100.00",
							},
						},
						{
							"@ondc/org/item_id": "combo1",
							title: "Flat discount of \u20b975 on combo",
							"@ondc/org/title_type": "offer",
							price: {
								currency: "INR",
								value: "25.00",
							},
							item: {
								tags: [
									{
										code: "quote",
										list: [
											{
												code: "type",
												value: "order",
											},
										],
									},
									{
										code: "offer",
										list: [
											{
												code: "type",
												value: "combo",
											},
											{
												code: "additive",
												value: "no",
											},
											{
												code: "auto",
												value: "no",
											},
										],
									},
								],
							},
						},
					],
					price: {
						currency: "INR",
						value: "775.00",
					},
					ttl: "P1D",
				},
				payment: {
					params: {
						amount: "775.00",
						currency: "INR",
						transaction_id: "mock_payment_id_123",
					},
					status: "PAID",
					type: "ON-ORDER",
					collected_by: "BAP",
					"@ondc/org/buyer_app_finder_fee_type": "percent",
					"@ondc/org/buyer_app_finder_fee_amount": "103.00",
					"@ondc/org/settlement_basis": "delivery",
					"@ondc/org/settlement_window": "P1D",
					"@ondc/org/withholding_amount": "110.00",
					"@ondc/org/settlement_details": [
						{
							settlement_counterparty: "seller-app",
							settlement_phase: "sale-amount",
							settlement_type: "neft",
							beneficiary_name: "xxxx",
							settlement_bank_account_no: "xxxx",
							settlement_ifsc_code: "xxxx",
							bank_name: "xxxx",
							branch_name: "xxxx",
						},
					],
				},
				tags: [
					{
						code: "bpp_terms",
						list: [
							{
								code: "np_type",
								value: "MSN",
							},
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
							{
								code: "provider_tax_number",
								value: "ABCDE1234F",
							},
						],
					},
					{
						code: "bap_terms",
						list: [
							{
								code: "tax_number",
								value: "00ABCCH7409R1ZZ",
							},
						],
					},
				],
				created_at: "2025-06-19T08:47:20.435Z",
				updated_at: "2025-06-19T08:47:22.437Z",
			},
		},
	},
];
