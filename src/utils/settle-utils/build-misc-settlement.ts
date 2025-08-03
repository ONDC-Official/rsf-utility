import { z } from "zod";
import { AmountSchema, MiscSettlementSchema } from "../../types/settle-params";
import logger from "../logger";

const miscBuilderLogger = logger.child("build-misc-settlement");

type MiscSettlementSchema = z.infer<typeof MiscSettlementSchema>;

//function to process the provider and self settlement amounts and build the misc payload data
export function buildMiscSettlement(
  input: MiscSettlementSchema
): Partial<MiscSettlementSchema> {
  miscBuilderLogger.info("Building Misc Settlement Data");

  const miscData: Partial<MiscSettlementSchema> = {};

  const hasValidAmount = (amount?: z.infer<typeof AmountSchema>): boolean => {
    if (!amount) return false;
    const numeric = parseFloat(amount.value);
    return !isNaN(numeric) && numeric > 0;
  };

  const providerValid = input.provider && hasValidAmount(input.provider.amount);
  const selfValid = input.self && hasValidAmount(input.self.amount);

  //   console.log("providerValid", providerValid);

  if (!providerValid && !selfValid) {
    throw new Error(
      "Both provider and self amounts are zero or missing in Misc Filing"
    );
  }

  if (providerValid) {
    miscData.provider = input.provider;
  }

  if (selfValid) {
    miscData.self = input.self;
  }
  miscBuilderLogger.info("Built Misc Settlement Data", {
    miscData,
  });

  return miscData;
}
