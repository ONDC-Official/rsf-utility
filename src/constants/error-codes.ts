export const ERROR_CODES = {
	TOO_MANY_REQUESTS: {
		code: "GEN_001",
		message: "Too many requests. Please try again later.",
		httpStatus: 429,
	},
	AUTH_INVALID_TOKEN: {
		code: "AUTH_000",
		message: "Invalid or expired token.",
		httpStatus: 401,
	},
	INVALID_QUERY_PARAMS: {
		code: "GEN_002",
		message: "Invalid query parameters provided.",
		httpStatus: 400,
	},
	USER_NOT_FOUND: {
		code: "USR_000",
		message: "User not found.",
		httpStatus: 404,
	},
	INVALID_REQUEST_BODY: {
		code: "GEN_003",
		message: "Invalid request body provided.",
		httpStatus: 400,
	},
	VALIDATION_FAILED: {
		code: "VAL_000",
		message: "Validation failed.",
		httpStatus: 400,
	},
	INTERNAL_ERROR: {
		code: "GEN_000",
		message: "Internal server error.",
		httpStatus: 500,
	},
	SCHEMA_VALIDATION_FAILED: {
		code: "VAL_001",
		message: "Schema Validation Failed",
		httpStatus: 422,
	},
	ORDER_CREATION_FAILED: {
		code: "ORD_000",
		message: "Failed to create order.",
		httpStatus: 500,
	},
	FILES_UPLOAD_FAILED: {
		code: "FILE_000",
		message: "File upload failed.",
		httpStatus: 400,
	},
	HEALTH_CHECK_FAILED: {
		code: "GEN_004",
		message: "Health check failed.",
		httpStatus: 503,
	},

	// ORDER_NOT_FOUND: {
	// 	code: "ORD_404",
	// 	message: "Order not found.",
	// 	httpStatus: 404,
	// },

	// // Settlement-related errors
	// SETTLEMENT_CREATION_FAILED: {
	// 	code: "SET_500",
	// 	message: "Failed to create settlement.",
	// 	httpStatus: 500,
	// },
	// SETTLEMENT_NOT_FOUND: {
	// 	code: "SET_404",
	// 	message: "Settlement not found.",
	// 	httpStatus: 404,
	// },
	// // Shared DB-level errors (can be reused)
	// DB_DUPLICATE_ENTRY: {
	// 	code: "DB_409",
	// 	message: "Duplicate entry exists.",
	// 	httpStatus: 409,
	// },
	// DB_CONN_FAIL: {
	// 	code: "DB_500",
	// 	message: "Database connection failed.",
	// 	httpStatus: 500,
	// },
	DB_QUERY_ERROR: {
		code: "DB_400",
		message: "Database query failed.",
		httpStatus: 400,
	},
	// DB_TIMEOUT: {
	// 	code: "DB_504",
	// 	message: "Database operation timed out.",
	// 	httpStatus: 504,
	// },
	// add more...
} as const;

export type ErrorCodeKey = keyof typeof ERROR_CODES;

export const SA_ERRORS = {
	"70000": {
		From: "Any",
		Event: "NACK",
		Description: "Invalid Signature",
	},
	"70001": {
		From: "Any",
		Event: "NACK",
		Description: "Missing mandatory 'Authorization' header param",
	},
	"70002": {
		From: "Any",
		Event: "NACK",
		Description: "Invalid schema",
	},
	"70003": {
		From: "Any",
		Event: "on_settle",
		Description: "Invalid bap id",
	},
	"70004": {
		From: "Any",
		Event: "on_settle",
		Description: "Inactive bap id",
	},
	"70005": {
		From: "Any",
		Event: "on_settle",
		Description: "Invalid bpp id",
	},
	"70006": {
		From: "Any",
		Event: "on_settle",
		Description: "Duplicate transaction id",
	},
	"70007": {
		From: "Any",
		Event: "on_settle",
		Description: "Duplicate message id",
	},
	"70008": {
		From: "Any",
		Event: "on_settle",
		Description: "Duplicate settlement id",
	},
	"70009": {
		From: "Any",
		Event: "on_settle",
		Description: "Bap id doesn't match collector app id or receiver app id",
	},
	"70010": {
		From: "Any",
		Event: "on_settle",
		Description: "Collector account not available",
	},
	"70011": {
		From: "Any",
		Event: "on_settle",
		Description: "Invalid collector app id",
	},
	"70012": {
		From: "Any",
		Event: "on_settle",
		Description: "Inactive collector app id",
	},
	"70013": {
		From: "Any",
		Event: "on_settle",
		Description: "Invalid receiver app id",
	},
	"70014": {
		From: "Any",
		Event: "on_settle",
		Description: "Inactive receiver app id",
	},
	"70015": {
		From: "Any",
		Event: "on_settle",
		Description: "Receiver app id same as Collector app id",
	},
	"70016": {
		From: "Any",
		Event: "on_settle",
		Description: "Duplicate order id",
	},
	"70017": {
		From: "Any",
		Event: "on_settle",
		Description: "Collector account inoperable",
	},
	"70018": {
		From: "Any",
		Event: "on_settle",
		Description: "Receiver account inoperable",
	},
	"70019": {
		From: "Any",
		Event: "on_settle",
		Description: "No response from bank for collector account",
	},
	"70020": {
		From: "Any",
		Event: "on_settle",
		Description: "No response from bank for receiver account",
	},
	"70021": {
		From: "Any",
		Event: "on_settle",
		Description: "No file shared by counterparty",
	},
	"70022": {
		From: "Any",
		Event: "on_settle",
		Description: "Order id not shared by counterparty",
	},
	"70023": {
		From: "Any",
		Event: "on_settle",
		Description: "Collector value mismatch",
	},
	"70024": {
		From: "Any",
		Event: "on_settle",
		Description: "Interparticipant value mismatch",
	},
	"70025": {
		From: "Any",
		Event: "on_settle",
		Description: "Insufficient balance in collector account",
	},
	"70026": {
		From: "Any",
		Event: "on_settle",
		Description: "Collector NDC breach",
	},
	"70027": {
		From: "Any",
		Event: "on_settle",
		Description: "Collector bank NDC breach",
	},
	"70028": {
		From: "Any",
		Event: "on_report",
		Description: "Invalid transaction_id",
	},
	"70029": {
		From: "Any",
		Event: "on_report",
		Description: "Invalid message_id",
	},
	"70030": {
		From: "Any",
		Event: "on_report",
		Description: "Invalid order_id",
	},
	"503": {
		From: "Any",
		Event: "https error",
		Description: "Internal server error",
	},
} as const;

export type SaErrorCode = keyof typeof SA_ERRORS;
