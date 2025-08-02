import _ from "lodash";

export const getPatchSchema = (schema: any) => {
	const patchSchema = _.cloneDeep(schema);
	delete patchSchema.required;

	// Also recursively remove `required` inside nested objects if needed
	if (patchSchema.properties?.provider_details?.items?.required) {
		delete patchSchema.properties.provider_details.items.required;
	}

	return patchSchema;
};
