// import { ReconController } from "../../../src/controller/recon-controller";
// import { Request, Response } from "express";

// // Mock the dependencies
// jest.mock("../../../src/utils/resUtils", () => ({
// 	sendError: jest.fn(),
// 	sendSuccess: jest.fn(),
// }));

// jest.mock("../../../src/utils/logger", () => ({
// 	child: () => ({
// 		info: jest.fn(),
// 		error: jest.fn(),
// 	}),
// }));

// jest.mock("../../../src/utils/utility", () => ({
// 	getLoggerMeta: jest.fn().mockReturnValue({}),
// }));

// jest.mock("../../../src/types/user-id-type", () => ({
// 	validateUserId: jest.fn(),
// }));

// const { sendError, sendSuccess } = require("../../../src/utils/resUtils");

// describe("ReconController", () => {
// 	let reconController: ReconController;
// 	let mockReconService: any;
// 	let mockRequest: Partial<Request>;
// 	let mockResponse: Partial<Response>;

// 	beforeEach(() => {
// 		// Create mock service with simplified typing
// 		mockReconService = {
// 			getRecons: jest.fn(),
// 			getReconSummary: jest.fn(),
// 			getReconStatusBreakdown: jest.fn(),
// 			getReconById: jest.fn(),
// 			updateReconStatus: jest.fn(),
// 			createReconOrOverride: jest.fn(),
// 			checkReconExists: jest.fn(),
// 			getReconByTransaction: jest.fn(),
// 			updateData: jest.fn(),
// 		};

// 		reconController = new ReconController(mockReconService);

// 		// Create mock request and response
// 		mockRequest = {
// 			params: {},
// 			query: {},
// 			body: {},
// 		};

// 		mockResponse = {
// 			status: jest.fn().mockReturnThis(),
// 			json: jest.fn().mockReturnThis(),
// 			send: jest.fn().mockReturnThis(),
// 		};

// 		// Reset all mocks
// 		jest.clearAllMocks();
// 	});

// 	describe("getRecons", () => {
// 		beforeEach(() => {
// 			mockRequest.params = { userId: "valid-user-id" };
// 			mockRequest.query = { page: "1", limit: "10" };
// 		});

// 		it("should successfully fetch recons with valid parameters", async () => {
// 			// Arrange
// 			const mockReconData = {
// 				data: [
// 					{
// 						_id: "recon1",
// 						user_id: "valid-user-id",
// 						order_id: "order1",
// 						recon_status: "SENT_PENDING",
// 					} as any,
// 				],
// 				pagination: {
// 					total: 1,
// 					page: 1,
// 					limit: 10,
// 					totalPages: 1,
// 				},
// 			};

// 			mockReconService.getRecons.mockResolvedValue(mockReconData);

// 			// Mock validateUserId to return true
// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(true);

// 			// Act
// 			await reconController.getRecons(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(mockReconService.getRecons).toHaveBeenCalledWith(
// 				"valid-user-id",
// 				expect.objectContaining({ page: 1, limit: 10 }),
// 			);
// 			expect(sendSuccess).toHaveBeenCalledWith(
// 				mockResponse,
// 				mockReconData,
// 				"Recons fetched successfully",
// 			);
// 		});

// 		it("should return error for invalid user ID", async () => {
// 			// Arrange
// 			mockRequest.params = { userId: "invalid-user-id" };

// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(false);

// 			// Act
// 			await reconController.getRecons(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(sendError).toHaveBeenCalledWith(
// 				mockResponse,
// 				"INVALID_QUERY_PARAMS",
// 				undefined,
// 				{ message: "Valid User ID is required" },
// 			);
// 			expect(mockReconService.getRecons).not.toHaveBeenCalled();
// 		});

// 		it("should return error for invalid query parameters", async () => {
// 			// Arrange
// 			mockRequest.query = { page: "-1", limit: "invalid" }; // Invalid parameters

// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(true);

// 			// Act
// 			await reconController.getRecons(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(sendError).toHaveBeenCalledWith(
// 				mockResponse,
// 				"INVALID_QUERY_PARAMS",
// 				undefined,
// 				expect.objectContaining({
// 					message: "Invalid query parameters",
// 					errors: expect.any(Object),
// 				}),
// 			);
// 			expect(mockReconService.getRecons).not.toHaveBeenCalled();
// 		});

// 		it("should handle service errors gracefully", async () => {
// 			// Arrange
// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(true);

// 			const serviceError = new Error("Database connection failed");
// 			mockReconService.getRecons.mockRejectedValue(serviceError);

// 			// Act
// 			await reconController.getRecons(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(sendError).toHaveBeenCalledWith(
// 				mockResponse,
// 				"INTERNAL_ERROR",
// 				undefined,
// 				{ error: "Database connection failed" },
// 			);
// 		});
// 	});

// 	describe("getReconById", () => {
// 		beforeEach(() => {
// 			mockRequest.params = {
// 				userId: "valid-user-id",
// 				orderId: "valid-order-id",
// 			};
// 		});

// 		it("should successfully fetch recon by ID", async () => {
// 			// Arrange
// 			const mockRecon = {
// 				_id: "recon1",
// 				user_id: "valid-user-id",
// 				order_id: "valid-order-id",
// 				recon_status: "SENT_PENDING",
// 			} as any;

// 			mockReconService.getReconById.mockResolvedValue(mockRecon);

// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(true);

// 			// Act
// 			await reconController.getReconById(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(mockReconService.getReconById).toHaveBeenCalledWith(
// 				"valid-user-id",
// 				"valid-order-id",
// 			);
// 			expect(sendSuccess).toHaveBeenCalledWith(
// 				mockResponse,
// 				mockRecon,
// 				"Recon fetched successfully",
// 			);
// 		});

// 		it("should return error when recon not found", async () => {
// 			// Arrange
// 			mockReconService.getReconById.mockResolvedValue(null);

// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(true);

// 			// Act
// 			await reconController.getReconById(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(sendError).toHaveBeenCalledWith(
// 				mockResponse,
// 				"INTERNAL_ERROR",
// 				"Recon not found",
// 				expect.objectContaining({
// 					message:
// 						"Recon for order valid-order-id not found for user valid-user-id",
// 				}),
// 			);
// 		});

// 		it("should return error for empty order ID", async () => {
// 			// Arrange
// 			mockRequest.params = { userId: "valid-user-id", orderId: "" };

// 			const { validateUserId } = require("../../../src/types/user-id-type");
// 			validateUserId.mockReturnValue(true);

// 			// Act
// 			await reconController.getReconById(
// 				mockRequest as Request,
// 				mockResponse as Response,
// 			);

// 			// Assert
// 			expect(sendError).toHaveBeenCalledWith(
// 				mockResponse,
// 				"INVALID_QUERY_PARAMS",
// 				undefined,
// 				{ message: "Valid Order ID is required" },
// 			);
// 			expect(mockReconService.getReconById).not.toHaveBeenCalled();
// 		});
// 	});
// });
