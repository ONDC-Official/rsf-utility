export const masterSchema = {
  type: "object",
  properties: {
    context: {
      type: "object",
      properties: {
        domain: { type: "string", minLength: 1 },
        country: { type: "string", const: "IND" },
        city: { type: "string", minLength: 1 },
        action: {
          type: "string",
          enum: ["on_confirm", "on_cancel", "on_status", "on_update"],
        },
        core_version: { type: "string", minLength: 1 },
        bap_id: { type: "string", minLength: 1 },
        bap_uri: { type: "string", format: "url" },
        bpp_id: { type: "string", minLength: 1 },
        bpp_uri: { type: "string", format: "url" },
        transaction_id: { type: "string", minLength: 1 },
        message_id: { type: "string", minLength: 1 },
        timestamp: { type: "string", format: "rfc3339-date-time" },
        ttl: { type: "string", format: "duration" },
      },
      required: [
        "domain",
        "country",
        "city",
        "action",
        "core_version",
        "bap_id",
        "bap_uri",
        "bpp_id",
        "bpp_uri",
        "transaction_id",
        "message_id",
        "timestamp",
      ],
    },
    message: { type: "object" },
  },
  required: ["context", "message"],

  allOf: [
    // ------- on_confirm -------
    {
      if: {
        properties: {
          context: { properties: { action: { const: "on_confirm" } } },
        },
      },
      then: {
        properties: {
          message: {
            properties: {
              order: {
                allOf: [
                  { $ref: "#/$defs/order_base" },
                  {
                    properties: {
                      state: {
                        type: "string",
                        enum: ["Created", "Accepted", "Cancelled"],
                      },
                      tags: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: {
                              type: "string",
                              enum: ["bpp_terms", "bap_terms"],
                            },
                            list: {
                              type: "array",
                              minItems: 1, // must have np_type
                              contains: {
                                type: "object",
                                properties: {
                                  code: { const: "np_type" },
                                  value: { enum: ["MSN", "ISN"] },
                                },
                                required: ["code", "value"],
                              },
                              items: {
                                allOf: [
                                  {
                                    if: {
                                      properties: {
                                        code: { const: "np_type" },
                                      },
                                    },
                                    then: {
                                      type: "object",
                                      properties: {
                                        code: {
                                          type: "string",
                                          enum: ["np_type"],
                                        },
                                        value: {
                                          type: "string",
                                          enum: ["MSN", "ISN"],
                                        },
                                      },
                                      required: ["code", "value"],
                                    },
                                  },
                                  {
                                    if: {
                                      properties: {
                                        code: { const: "tax_number" },
                                      },
                                    },
                                    then: {
                                      type: "object",
                                      properties: {
                                        value: {
                                          type: "string",
                                          pattern:
                                            "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$|^GSTIN[0-9]{10}$",
                                        },
                                      },
                                      required: ["code", "value"],
                                    },
                                  },
                                  {
                                    if: {
                                      properties: {
                                        code: { const: "provider_tax_number" },
                                      },
                                    },
                                    then: {
                                      type: "object",
                                      properties: {
                                        value: {
                                          type: "string",
                                          pattern: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
                                        },
                                      },
                                      required: ["code", "value"],
                                    },
                                  },
                                ],
                              },
                            },
                          },
                          required: ["code", "list"],
                        },
                      },
                      fulfillments: {
                        type: "array",
                        items: {
                          properties: {
                            state: {
                              properties: {
                                descriptor: {
                                  properties: {
                                    code: {
                                      type: "string",
                                      enum: ["Pending", "Cancelled"],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    required: ["state", "tags"],
                  },
                ],
              },
            },
          },
        },
      },
    },
    // ------- on_cancel -------
    {
      if: {
        properties: {
          context: { properties: { action: { const: "on_cancel" } } },
        },
      },
      then: {
        properties: {
          message: {
            properties: {
              order: {
                allOf: [
                  { $ref: "#/$defs/order_base" },
                  {
                    properties: {
                      state: { type: "string", enum: ["Cancelled"] },
                      cancellation: {
                        type: "object",
                        properties: {
                          cancelled_by: { type: "string" },
                          reason: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                            },
                          },
                        },
                      },
                      fulfillments: {
                        type: "array",
                        items: {
                          properties: {
                            state: {
                              properties: {
                                descriptor: {
                                  properties: {
                                    code: {
                                      type: "string",
                                      enum: ["Cancelled", "RTO-Initiated"],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    required: ["state", "cancellation"],
                  },
                ],
              },
            },
          },
        },
      },
    },
    // ------- on_status -------
    {
      if: {
        properties: {
          context: { properties: { action: { const: "on_status" } } },
        },
      },
      then: {
        properties: {
          message: {
            properties: {
              order: {
                allOf: [
                  { $ref: "#/$defs/order_base" },
                  {
                    properties: {
                      state: {
                        type: "string",
                        enum: [
                          "Created",
                          "Accepted",
                          "In-progress",
                          "Completed",
                          "Cancelled",
                        ],
                      },
                      cancellation: {
                        type: "object",
                        properties: {
                          cancelled_by: { type: "string" },
                          reason: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              state: { type: "string" },
                            },
                          },
                        },
                      },
                      documents: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            url: { type: "string" },
                            label: { type: "string" },
                          },
                        },
                      },
                      fulfillments: {
                        type: "array",
                        items: {
                          properties: {
                            state: {
                              properties: {
                                descriptor: {
                                  properties: {
                                    code: {
                                      type: "string",
                                      enum: [
                                        "Pending",
                                        "Packed",
                                        "Agent-assigned",
                                        "Out-for-pickup",
                                        "Pickup-failed",
                                        "At-pickup",
                                        "Order-picked-up",
                                        "In-transit",
                                        "At-destination-hub",
                                        "Out-for-delivery",
                                        "At-delivery",
                                        "Delivery-failed",
                                        "Order-delivered",
                                        "Cancelled",
                                        "RTO-Initiated",
                                        "RTO-Disposed",
                                        "RTO-Delivered",
                                        "Return_Initiated",
                                        "Liquidated",
                                        "Return_Approved",
                                        "Return_Picked",
                                        "Return_Pick_Failed",
                                        "Return_Rejected",
                                        "Return_Delivered",
                                      ],
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    required: ["state"],
                  },
                ],
              },
            },
          },
        },
      },
    },
    // ------- on_update -------
    {
      if: {
        properties: {
          context: { properties: { action: { const: "on_update" } } },
        },
      },
      then: {
        properties: {
          message: {
            properties: {
              order: {
                allOf: [
                  { $ref: "#/$defs/order_base" },
                  {
                    properties: {
                      state: {
                        type: "string",
                        enum: [
                          "Created",
                          "Accepted",
                          "In-progress",
                          "Completed",
                          "Cancelled",
                        ],
                      },
                      cancellation: {
                        type: "object",
                        properties: {
                          cancelled_by: { type: "string" },
                          reason: {
                            type: "object",
                            properties: {
                              id: { type: "string" },
                              state: { type: "string" },
                            },
                          },
                        },
                      },
                      documents: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            url: { type: "string" },
                            label: { type: "string" },
                          },
                        },
                      },
                      fulfillments: {
                        type: "array",
                        items: {
                          properties: {
                            state: {
                              properties: {
                                descriptor: {
                                  properties: {
                                    code: {
                                      type: "string",
                                      enum: [
                                        "Pending",
                                        "Packed",
                                        "Agent-assigned",
                                        "Out-for-pickup",
                                        "Pickup-failed",
                                        "At-pickup",
                                        "Order-picked-up",
                                        "In-transit",
                                        "At-destination-hub",
                                        "Out-for-delivery",
                                        "At-delivery",
                                        "Delivery-failed",
                                        "Order-delivered",
                                        "Cancelled",
                                        "Return_Initiated",
                                        "Liquidated",
                                        "Return_Approved",
                                        "Return_Picked",
                                        "Return_Pick_Failed",
                                        "Return_Rejected",
                                        "Return_Delivered",
                                      ], // RTO-* are not listed here
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                    required: ["state"],
                  },
                ],
              },
            },
          },
        },
      },
    },
  ],

  // ----- SHARED BASE DEFS -----
  $defs: {
    order_base: {
      type: "object",
      properties: {
        id: { type: "string" },
        provider: {
          type: "object",
          properties: {
            id: { type: "string" },
            locations: {
              type: "array",
              items: {
                type: "object",
                properties: { id: { type: "string" } },
                required: ["id"],
              },
            },
          },
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              fulfillment_id: { type: "string" },
              quantity: {
                type: "object",
                properties: { count: { type: "integer" } },
                required: ["count"],
              },
              parent_item_id: { type: "string" },
              tags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    code: { type: "string" },
                    list: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          code: { type: "string" },
                          value: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
            required: ["id", "fulfillment_id", "quantity"],
          },
        },
        billing: {
          type: "object",
          properties: {
            name: { type: "string" },
            address: {
              type: "object",
              properties: {
                name: { type: "string" },
                building: { type: "string" },
                locality: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                country: { type: "string" },
                area_code: { type: "string" },
              },
            },
            email: { type: "string" },
            phone: { type: "string" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
          },
        },
        fulfillments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              "@ondc/org/provider_name": { type: "string" },
              "@ondc/org/TAT": { type: "string", format: "duration" },
              state: {
                type: "object",
                properties: {
                  descriptor: {
                    type: "object",
                    properties: { code: { type: "string" } },
                    required: ["code"],
                  },
                },
                required: ["descriptor"],
              },
              type: { type: "string" },
              tracking: { type: "boolean" },
              start: {
                type: "object",
                properties: {
                  location: {
                    type: "object",
                    properties: {
                      id: { type: "string" },
                      descriptor: {
                        type: "object",
                        properties: { name: { type: "string" } },
                      },
                      gps: { type: "string" },
                      address: {
                        type: "object",
                        properties: {
                          locality: { type: "string" },
                          city: { type: "string" },
                          area_code: { type: "string" },
                          state: { type: "string" },
                        },
                      },
                    },
                    required: ["descriptor"],
                  },
                  time: {
                    type: "object",
                    properties: {
                      range: {
                        type: "object",
                        properties: {
                          start: { type: "string" },
                          end: { type: "string" },
                        },
                      },
                    },
                  },
                  instructions: {
                    type: "object",
                    properties: {
                      code: { type: "string" },
                      name: { type: "string" },
                      short_desc: { type: "string" },
                      long_desc: { type: "string" },
                    },
                  },
                  contact: {
                    type: "object",
                    properties: {
                      phone: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
              end: {
                type: "object",
                properties: {
                  location: {
                    type: "object",
                    properties: {
                      gps: { type: "string" },
                      address: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          building: { type: "string" },
                          locality: { type: "string" },
                          city: { type: "string" },
                          state: { type: "string" },
                          country: { type: "string" },
                          area_code: { type: "string" },
                        },
                      },
                    },
                  },
                  time: {
                    type: "object",
                    properties: {
                      range: {
                        type: "object",
                        properties: {
                          start: { type: "string" },
                          end: { type: "string" },
                        },
                      },
                    },
                  },
                  person: {
                    type: "object",
                    properties: { name: { type: "string" } },
                  },
                  contact: {
                    type: "object",
                    properties: {
                      phone: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
            required: ["id", "state", "type"],
          },
        },
        quote: {
          type: "object",
          properties: {
            price: {
              type: "object",
              properties: {
                currency: { type: "string" },
                value: {
                  type: "string",
                  minLength: 1,
                  pattern: "^[0-9]+(.[0-9]{1,2})?$",
                },
              },
              required: ["currency", "value"],
            },
            breakup: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  "@ondc/org/item_id": { type: "string" },
                  "@ondc/org/item_quantity": {
                    type: "object",
                    properties: { count: { type: "integer" } },
                    required: ["count"],
                  },
                  title: { type: "string", minLength: 1 },
                  "@ondc/org/title_type": { type: "string" },
                  price: {
                    type: "object",
                    properties: {
                      currency: { type: "string" },
                      value: {
                        type: "string",
                        minLength: 1,
                        pattern: "^[-+]?[0-9]+(.[0-9]{1,2})?$",
                      },
                    },
                    required: ["currency", "value"],
                  },
                  item: {
                    type: "object",
                    properties: {
                      parent_item_id: { type: "string" },
                      price: {
                        type: "object",
                        properties: {
                          currency: { type: "string" },
                          value: {
                            type: "string",
                            minLength: 1,
                            pattern: "^[-+]?[0-9]+(.[0-9]{1,2})?$",
                          },
                        },
                        required: ["currency", "value"],
                      },
                      tags: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            code: { type: "string" },
                            list: {
                              type: "array",
                              items: {
                                type: "object",
                                properties: {
                                  code: { type: "string" },
                                  value: { type: "string" },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
                required: [
                  "@ondc/org/item_id",
                  "@ondc/org/title_type",
                  "price",
                ],
              },
            },
            ttl: { type: "string", format: "duration" },
          },
          required: ["price", "breakup"],
        },
        payment: {
          type: "object",
          properties: {
            uri: { type: "string" },
            tl_method: { type: "string" },
            params: {
              type: "object",
              properties: {
                currency: { type: "string" },
                transaction_id: { type: "string" },
                amount: { type: "string" },
              },
              required: ["currency", "amount"],
            },
            status: { type: "string" },
            type: { type: "string" },
            collected_by: { type: "string" },
            "@ondc/org/buyer_app_finder_fee_type": { type: "string" },
            "@ondc/org/buyer_app_finder_fee_amount": { type: "string" },
            "@ondc/org/settlement_basis": { type: "string" },
            "@ondc/org/settlement_window": { type: "string" },
            "@ondc/org/withholding_amount": { type: "string" },
            "@ondc/org/settlement_details": {
              type: "array",
              items: {
                type: "object",
                properties: {
                  settlement_counterparty: { type: "string" },
                  settlement_phase: { type: "string" },
                  settlement_type: { type: "string" },
                  upi_address: { type: "string" },
                  settlement_bank_account_no: { type: "string" },
                  settlement_ifsc_code: { type: "string" },
                  bank_name: { type: "string" },
                  beneficiary_name: { type: "string" },
                  branch_name: { type: "string" },
                },
              },
            },
          },
          required: [
            "params",
            "status",
            "type",
            "collected_by",
            "@ondc/org/buyer_app_finder_fee_type",
            "@ondc/org/buyer_app_finder_fee_amount",
            "@ondc/org/settlement_basis",
            "@ondc/org/settlement_window",
          ],
        },
        created_at: { type: "string", format: "rfc3339-date-time" },
        updated_at: { type: "string", format: "rfc3339-date-time" },
      },
      required: [
        "id",
        "provider",
        "items",
        "billing",
        "fulfillments",
        "quote",
        "payment",
        "created_at",
        "updated_at",
      ],
    },
  },
};
