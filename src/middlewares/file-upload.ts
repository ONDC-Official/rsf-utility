// middlewares/jsonFileUploadMiddleware.ts
import multer from "multer";
import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    // Check mimetype and extension if you want
    if (
      !file.originalname.endsWith(".json") ||
      file.mimetype !== "application/json"
    ) {
      logger.error(
        `Invalid file type uploaded: ${file.originalname} (${file.mimetype})`
      );
      return cb(new Error("Only JSON file(s) uploads are allowed"));
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
  next: NextFunction
) {
  // Support either single ('file') or multiple files (array('file'))
  const handler = upload.any(); // Allows both single and multiple files with any field name
  handler(req, res, function (err: any) {
    if (err) {
      logger.error(`File upload error: ${err.message}`);
      return res.status(400).json({ error: err.message || "Upload failed" });
    }
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length)
      return res.status(400).json({ error: "No files uploaded" });
    const jsonPayloads: any[] = [];
    for (const file of files) {
      try {
        // Check that file contains parsable JSON
        const parsed = JSON.parse(file.buffer.toString("utf-8"));
        if (Array.isArray(parsed)) {
          jsonPayloads.push(...parsed);
        } else {
          jsonPayloads.push(parsed);
        }
      } catch (e) {
        return res
          .status(400)
          .json({ error: `File "${file.originalname}" is not valid JSON` });
      }
    }
    (req as any).processedJsonPayloads = jsonPayloads;
    next();
  });
}
