import { SettleType } from "../../schema/models/settle-schema";
import { UserType } from "../../schema/models/user-schema";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";
export function generateSettlePayload(
  userConfig: UserType,
  settlements: SettleType[]
) {
  if (!userConfig || !settlements || settlements.length === 0) {
    throw new Error("Invalid user configuration or settlements data");
  }
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
      action: "settle",
      bap_id: userConfig.subscriber_id,
      bap_uri: userConfig.subscriber_url,
      bpp_id: userConfig.settlement_agency_id,
      bpp_uri: userConfig.settlement_agency_url,
      transaction_id: uuidv4(),
      message_id: uuidv4(),
      timestamp: new Date().toISOString(),
      ttl: "P1D",
    },
    message: {
      collector_app_id: settlements[0].collector_id,
      receiver_app_id: settlements[0].receiver_id,
      settlement: {
        type: "NP-NP",
        id: uuidv4(),
        orders: settlements.map((settle) => {
          // ! TODO: proper amount calculations currently using dummy values
          logger.warning(
            "Using dummy values for settlement amounts, please implement proper calculations"
          );
          const providerDetails = userConfig.provider_details.find(
            (provider) => provider.provider_id === settle.provider_id
          );
          if (!providerDetails) {
            throw new Error(
              `Provider details not found for provider ID: ${settle.provider_id}`
            );
          }
          return {
            id: settle.order_id,
            inter_participant: {
              amount: {
                currency: "INR",
                value: settle.inter_np_settlement.toFixed(2),
              },
            },
            collector: {
              amount: {
                currency: "INR",
                value: settle.commission.toFixed(2),
              },
            },
            provider: {
              id: settle.provider_id,
              name: providerDetails.bank_name,
              bank_details: {
                account_no: providerDetails.account_number,
                ifsc_code: providerDetails.ifsc_code,
              },
              amount: {
                currency: "INR",
                value: settle.total_order_value.toFixed(2),
              },
            },
            self: {
              amount: {
                currency: "INR",
                value: settle.withholding_amount.toFixed(2),
              },
            },
          };
        }),
      },
    },
  };
}
