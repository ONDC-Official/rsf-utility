import ajv from './ajv';
import { formatAjvErrors } from './error-formatter';
 // Still using yours

export const validatePayload = (data: any, schema: object) => {
  const validate = ajv.compile(schema);
  const isValid = validate(data);

  let errors = validate.errors || [];
  return formatAjvErrors(errors);
};
