import { z } from "zod";
import {
	AmountSchema,
	MiscSettlementSchema,
	MiscSettlementBodySchema,
} from "../../types/settle-params";
import logger from "../logger";

const miscBuilderLogger = logger.child("build-misc-settlement");

type MiscSettlementSchema = z.infer<typeof MiscSettlementSchema>;
type MiscSettlementBodySchema = z.infer<typeof MiscSettlementBodySchema>;

//function to process the provider and self settlement amounts and build the misc payload data
export function buildMiscSettlement(
	input: MiscSettlementSchema,
): Partial<MiscSettlementSchema> {
	miscBuilderLogger.info("Building Misc Settlement Data");

	const miscData: Partial<MiscSettlementSchema> = [];

	const hasValidAmount = (amount?: z.infer<typeof AmountSchema>): boolean => {
		if (!amount) return false;
		const numeric = parseFloat(amount.value);
		return !isNaN(numeric) && numeric > 0;
	};

	for (const misc of input) {
		let miscObject: MiscSettlementBodySchema = {};
		const providerValid = misc.provider && hasValidAmount(misc.provider.amount);
		const selfValid = misc.self && hasValidAmount(misc.self.amount);

		if (!providerValid && !selfValid) {
			throw new Error(
				"Both provider and self amounts are zero or missing in Misc Filing",
			);
		}

		if (providerValid) {
			miscObject.provider = misc.provider;
		}

		if (selfValid) {
			miscObject.self = misc.self;
		}

		miscData.push(miscObject);
		miscBuilderLogger.info("Built Misc Settlement Data", {
			miscObject,
		});
	}

	return miscData;
}
