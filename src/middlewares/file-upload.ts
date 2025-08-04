// middlewares/jsonFileUploadMiddleware.ts
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import { getLoggerMeta } from "../utils/utility";
import { sendError } from "../utils/resUtils";
import { send } from "process";

const uploadLogger = logger.child("file-upload-middleware");

const upload = multer({
	storage: multer.memoryStorage(),
	fileFilter: (req, file, cb) => {
		// Check mimetype and extension if you want
		if (
			!file.originalname.endsWith(".json") ||
			file.mimetype !== "application/json"
		) {
			uploadLogger.warning(
				`Invalid file type uploaded: ${file.originalname} (${file.mimetype})`,
				getLoggerMeta(req),
			);
			//   return cb(new Error("Only JSON file(s) uploads are allowed"));
		}
		cb(null, true);
	},
	limits: { fileSize: 10 * 1024 * 1024 }, // 10MB per file
});

/**
 * Middleware to handle JSON file uploads
 * @returns Processed JSON payloads in req.processedJsonPayloads (req object of Express)
 */
export function jsonFileUploadMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// Support either single ('file') or multiple files (array('file'))
	const handler = upload.any(); // Allows both single and multiple files with any field name
	uploadLogger.info(`Processing file upload`, getLoggerMeta(req));
	handler(req, res, function (err: any) {
		if (err) {
			uploadLogger.error(`File upload error: ${err.message}`);

			return sendError(res, "FILES_UPLOAD_FAILED", undefined, {
				error: err instanceof Error ? err.message : String(err),
			});
			// return res.status(400).json({ error: err.message || "Upload failed" });
		}
		const files = (req.files as Express.Multer.File[]) || [];
		if (!files.length)
			return sendError(res, "FILES_UPLOAD_FAILED", "No files uploaded");
		// return res.status(400).json({ error: "No files uploaded" });
		const payloadsWithFilenames: Array<{ filename: string; payload: any }> = [];
		const errors: { filename: string; error: string }[] = [];
		for (const file of files) {
			try {
				// Check that file contains parsable JSON
				const parsed = JSON.parse(file.buffer.toString("utf-8"));
				uploadLogger.info(`Parsed JSON from file: ${file.originalname}`);
				payloadsWithFilenames.push({
					filename: file.originalname,
					payload: parsed,
				});
			} catch (e) {
				errors.push({
					filename: file.originalname,
					error: "File is not valid JSON",
				});
			}
		}
		(req as any).processedJsonPayloads = payloadsWithFilenames;
		if (errors.length) {
			uploadLogger.error("File Upload Error", getLoggerMeta(req), errors);
			return sendError(
				res,
				"FILES_UPLOAD_FAILED",
				"Some files failed to upload as JSON",
				{
					invalidFiles: errors, // [{ filename, error }]
					acceptedFileCount: payloadsWithFilenames.length,
				},
			);
			//

			// return res.status(400).json({
			// 	message: "Some files failed to upload as JSON.",
			// 	invalidFiles: errors, // [{ filename, error }]
			// 	acceptedFileCount: payloadsWithFilenames.length,
			// });
		}
		next();
	});
}
