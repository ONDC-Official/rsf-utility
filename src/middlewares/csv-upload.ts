import multer from "multer";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { sendError } from "../utils/resUtils";

const uploadLogger = logger.child("csv-upload-middleware");

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		// Check if file is CSV
		if (
			!file.originalname.endsWith(".csv") ||
			(!file.mimetype.includes("csv") && !file.mimetype.includes("text/plain"))
		) {
			uploadLogger.warning(
				`Invalid file type uploaded: ${file.originalname} (${file.mimetype})`,
				getLoggerMeta(req),
			);
			return cb(new Error("Only CSV file uploads are allowed"));
		}
		cb(null, true);
	},
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
});

/**
 * Middleware to handle CSV file uploads and parse them
 * @returns Processed CSV data in req.processedCsvData (req object of Express)
 */
export function csvFileUploadMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const handler = upload.single("csvFile"); // Expects a single file with field name 'csvFile'

	uploadLogger.info("Processing CSV file upload", getLoggerMeta(req));

	handler(req, res, async function (err: any) {
		if (err) {
			uploadLogger.error(
				`CSV file upload error: ${err.message}`,
				getLoggerMeta(req),
				err,
			);
			return sendError(res, "FILES_UPLOAD_FAILED", undefined, {
				error: err instanceof Error ? err.message : String(err),
			});
		}

		const file = req.file as Express.Multer.File;
		if (!file) {
			return sendError(res, "FILES_UPLOAD_FAILED", "No CSV file uploaded");
		}

		try {
			// Parse CSV data
			const csvData = parseCsvBuffer(file.buffer);

			uploadLogger.info(`Successfully parsed CSV file: ${file.originalname}`, {
				...getLoggerMeta(req),
				rowCount: csvData.length,
			});

			// Attach parsed data to request
			(req as any).processedCsvData = {
				filename: file.originalname,
				data: csvData,
			};

			next();
		} catch (error) {
			uploadLogger.error("CSV parsing error", getLoggerMeta(req), error);
			return sendError(res, "VALIDATION_FAILED", undefined, {
				error: error instanceof Error ? error.message : "Failed to parse CSV",
			});
		}
	});
}

/**
 * Optional CSV upload middleware - handles both CSV uploads and regular JSON requests
 * If a CSV file is uploaded, it processes it. Otherwise, it passes through to next middleware.
 */
export function optionalCsvUploadMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// Check if this is a multipart/form-data request (file upload)
	const contentType = req.headers["content-type"] || "";

	if (!contentType.includes("multipart/form-data")) {
		// Not a file upload, proceed to next middleware
		uploadLogger.info(
			"Request is not a file upload, proceeding with JSON handling",
			getLoggerMeta(req),
		);
		return next();
	}

	// Handle as CSV upload
	csvFileUploadMiddleware(req, res, next);
}

/**
 * Simple CSV parser - converts CSV buffer to array of objects
 * Expected CSV format: header row + data rows
 */
function parseCsvBuffer(buffer: Buffer): any[] {
	const csvText = buffer.toString("utf-8");
	const lines = csvText.split("\n").filter((line) => line.trim() !== "");

	if (lines.length < 2) {
		throw new Error("CSV must contain at least a header row and one data row");
	}

	// Parse header row
	const headers = lines[0]
		.split(",")
		.map((header) => header.trim().replace(/^"|"$/g, ""));

	// Parse data rows
	const results: any[] = [];
	for (let i = 1; i < lines.length; i++) {
		const values = lines[i]
			.split(",")
			.map((value) => value.trim().replace(/^"|"$/g, ""));

		if (values.length !== headers.length) {
			throw new Error(
				`Row ${i + 1} has ${values.length} columns, expected ${headers.length}`,
			);
		}

		const row: any = {};
		headers.forEach((header, index) => {
			row[header] = values[index];
		});
		results.push(row);
	}

	return results;
}
