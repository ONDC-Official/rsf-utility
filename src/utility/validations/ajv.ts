import Ajv from "ajv";
import addFormats from "ajv-formats";
import ajvErrors from "ajv-errors";

const ajv = new Ajv({
  allErrors: true,
  strict: "log",
});
addFormats(ajv);
ajvErrors(ajv);

ajv.addFormat("rfc3339-date-time", (dateTimeString: string) => {
  const date = new Date(dateTimeString);
  return !isNaN(date.getTime()) && date.toISOString() === dateTimeString;
});

export default ajv;
