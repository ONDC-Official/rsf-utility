// import { OnReconRequestService } from "../../../src/services/rsf-request-api-services/on_recon-service";
// import { ReconDbService } from "../../../src/services/recon-service";
// import { TransactionService } from "../../../src/services/transaction-serivce";
// import { ReconType } from "../../../src/schema/models/recon-schema";
// import { OnReconPayloadOrders } from "../../../src/schema/rsf/zod/on_recon-schema";
// import { ReconPayload } from "../../../src/schema/rsf/zod/recon-schema";

// // Mock the dependencies
// jest.mock("../../../src/utils/logger", () => ({
// 	child: () => ({
// 		info: jest.fn(),
// 		error: jest.fn(),
// 		warning: jest.fn(),
// 	}),
// }));

// jest.mock("../../../src/utils/ackUtils", () => ({
// 	getAckResponse: jest.fn(),
// 	getNackResponse: jest.fn(),
// }));

// describe("OnReconRequestService - validateRecons", () => {
// 	let service: OnReconRequestService;
// 	let mockReconService: jest.Mocked<ReconDbService>;
// 	let mockTransactionService: jest.Mocked<TransactionService>;

// 	beforeEach(() => {
// 		mockReconService = {
// 			getReconByTransaction: jest.fn(),
// 			updateData: jest.fn(),
// 		} as any;

// 		mockTransactionService = {
// 			getReconByContext: jest.fn(),
// 		} as any;

// 		service = new OnReconRequestService(
// 			mockReconService,
// 			mockTransactionService,
// 		);
// 		jest.clearAllMocks();
// 	});

// 	const createMockRecon = (overrides: Partial<ReconType> = {}): ReconType => ({
// 		user_id: "user123",
// 		order_id: "order123",
// 		recon_status: "SENT_PENDING",
// 		settlement_id: "settlement123",
// 		transaction_db_ids: ["txn1"],
// 		recon_breakdown: {
// 			amount: 1000,
// 			commission: 50,
// 			withholding_amount: 100,
// 			tcs: 20,
// 			tds: 30,
// 		},
// 		due_date: new Date(),
// 		...overrides,
// 	});

// 	const createMockOnReconOrder = (
// 		overrides: Partial<OnReconPayloadOrders> = {},
// 	): OnReconPayloadOrders =>
// 		({
// 			id: "order123",
// 			recon_accord: true,
// 			settlements: [
// 				{
// 					due_date: new Date(),
// 					amount: { value: "1000" },
// 					commission: { value: "50" },
// 					withholding_amount: { value: "100" },
// 					tcs: { value: "20" },
// 					tds: { value: "30" },
// 				},
// 			],
// 			...overrides,
// 		}) as any;

// 	const createMockReconPayload = (
// 		orderIds: string[] = ["order123"],
// 	): ReconPayload =>
// 		({
// 			message: {
// 				orders: orderIds.map((id) => ({ id })),
// 			},
// 		}) as any;

// 	describe("validateRecons - Happy Path", () => {
// 		it("should successfully validate matching recons with accord orders", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [createMockOnReconOrder()];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 		});

// 		it("should successfully validate orders without recon_accord", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [createMockOnReconOrder({ recon_accord: false })];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 		});
// 	});

// 	describe("validateRecons - Due Date Validation", () => {
// 		it("should throw error when due_date is missing for recon_accord order", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [
// 				createMockOnReconOrder({
// 					settlements: [
// 						{
// 							amount: { value: "1000" },
// 							commission: { value: "50" },
// 							withholding_amount: { value: "100" },
// 							tcs: { value: "20" },
// 							tds: { value: "30" },
// 							// due_date missing
// 						},
// 					],
// 				} as any),
// 			];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow("Due date is required when recon_accord is true");
// 		});

// 		it("should throw error when settlements array is empty for recon_accord order", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [
// 				createMockOnReconOrder({
// 					settlements: [],
// 				} as any),
// 			];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow();
// 		});
// 	});

// 	describe("validateRecons - Breakdown Validation", () => {
// 		it("should throw error when breakdown amounts don't match", () => {
// 			// Arrange
// 			const recons = [
// 				createMockRecon({
// 					recon_breakdown: {
// 						amount: 1000,
// 						commission: 50,
// 						withholding_amount: 100,
// 						tcs: 20,
// 						tds: 30,
// 					},
// 				}),
// 			];
// 			const onReconOrders = [
// 				createMockOnReconOrder({
// 					settlements: [
// 						{
// 							due_date: new Date(),
// 							amount: { value: "999" }, // Different amount
// 							commission: { value: "50" },
// 							withholding_amount: { value: "100" },
// 							tcs: { value: "20" },
// 							tds: { value: "30" },
// 						},
// 					],
// 				} as any),
// 			];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow("Recon breakdown does not match with on recon settlements");
// 		});

// 		it("should throw error when commission doesn't match", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [
// 				createMockOnReconOrder({
// 					settlements: [
// 						{
// 							due_date: new Date(),
// 							amount: { value: "1000" },
// 							commission: { value: "60" }, // Different commission
// 							withholding_amount: { value: "100" },
// 							tcs: { value: "20" },
// 							tds: { value: "30" },
// 						},
// 					],
// 				} as any),
// 			];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow("Recon breakdown does not match with on recon settlements");
// 		});

// 		it("should handle decimal values correctly in breakdown comparison", () => {
// 			// Arrange
// 			const recons = [
// 				createMockRecon({
// 					recon_breakdown: {
// 						amount: 1000.5,
// 						commission: 50.25,
// 						withholding_amount: 100.75,
// 						tcs: 20.1,
// 						tds: 30.99,
// 					},
// 				}),
// 			];
// 			const onReconOrders = [
// 				createMockOnReconOrder({
// 					settlements: [
// 						{
// 							due_date: new Date(),
// 							amount: { value: "1000.50" },
// 							commission: { value: "50.25" },
// 							withholding_amount: { value: "100.75" },
// 							tcs: { value: "20.10" },
// 							tds: { value: "30.99" },
// 						},
// 					],
// 				} as any),
// 			];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 		});
// 	});

// 	describe("validateRecons - Order Presence Validation", () => {
// 		it("should throw error when recon payload order is missing in on_recon orders", () => {
// 			// Arrange
// 			const recons = [createMockRecon({ order_id: "order123" })];
// 			const onReconOrders = [createMockOnReconOrder({ id: "order456" })]; // Different order
// 			const reconPayload = createMockReconPayload(["order123"]);

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow(
// 				"recon payload orders not found in on_recon orders: [order123]. Available on_recon orders: [order456]",
// 			);
// 		});

// 		it("should throw error when recon order is missing in on_recon orders", () => {
// 			// Arrange
// 			const recons = [createMockRecon({ order_id: "order123" })];
// 			const onReconOrders = [createMockOnReconOrder({ id: "order456" })]; // Different order
// 			const reconPayload = createMockReconPayload(["order456"]); // Matching payload but recon has different order

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow(
// 				"recon orders not found in on_recon orders: [order123]. Available on_recon orders: [order456]",
// 			);
// 		});

// 		it("should handle multiple missing orders correctly", () => {
// 			// Arrange
// 			const recons = [
// 				createMockRecon({ order_id: "order1" }),
// 				createMockRecon({ order_id: "order2" }),
// 			];
// 			const onReconOrders = [createMockOnReconOrder({ id: "order3" })];
// 			const reconPayload = createMockReconPayload(["order1", "order2"]);

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow(
// 				"recon payload orders not found in on_recon orders: [order1, order2]. Available on_recon orders: [order3]",
// 			);
// 		});
// 	});

// 	describe("validateRecons - Status Validation", () => {
// 		it("should throw error when recon status is not SENT_PENDING", () => {
// 			// Arrange
// 			const recons = [createMockRecon({ recon_status: "SENT_ACCEPTED" })];
// 			const onReconOrders = [createMockOnReconOrder()];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow(
// 				"Found recons with invalid status. Expected: SENT_PENDING. Invalid recons: order123(SENT_ACCEPTED)",
// 			);
// 		});

// 		it("should handle multiple invalid statuses", () => {
// 			// Arrange
// 			const recons = [
// 				createMockRecon({ order_id: "order1", recon_status: "SENT_ACCEPTED" }),
// 				createMockRecon({ order_id: "order2", recon_status: "SENT_REJECTED" }),
// 			];
// 			const onReconOrders = [
// 				createMockOnReconOrder({ id: "order1" }),
// 				createMockOnReconOrder({ id: "order2" }),
// 			];
// 			const reconPayload = createMockReconPayload(["order1", "order2"]);

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow(
// 				"Found recons with invalid status. Expected: SENT_PENDING. Invalid recons: order1(SENT_ACCEPTED), order2(SENT_REJECTED)",
// 			);
// 		});

// 		it("should allow all valid statuses", () => {
// 			// Arrange
// 			const recons = [createMockRecon({ recon_status: "SENT_PENDING" })];
// 			const onReconOrders = [createMockOnReconOrder()];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 		});
// 	});

// 	describe("validateRecons - Edge Cases", () => {
// 		it("should handle empty arrays gracefully", () => {
// 			// Arrange
// 			const recons: ReconType[] = [];
// 			const onReconOrders: OnReconPayloadOrders[] = [];
// 			const reconPayload = createMockReconPayload([]);

// 			// Act & Assert
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 		});

// 		it("should handle missing recon details for accord order gracefully", () => {
// 			// Arrange
// 			const recons = [createMockRecon({ order_id: "order456" })]; // Different order
// 			const onReconOrders = [
// 				createMockOnReconOrder({ id: "order123", recon_accord: true }),
// 			];
// 			const reconPayload = createMockReconPayload(["order123"]);

// 			// This should trigger the warning log but continue processing
// 			// The validation should fail later due to missing order in recons
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow("recon orders not found in on_recon orders");
// 		});

// 		it("should handle orders with null/undefined IDs", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [
// 				createMockOnReconOrder({ id: null } as any),
// 				createMockOnReconOrder({ id: undefined } as any),
// 				createMockOnReconOrder({ id: "order123" }),
// 			];
// 			const reconPayload = createMockReconPayload(["order123"]);

// 			// Act & Assert - should filter out null/undefined IDs
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 		});

// 		it("should handle string values that can't be parsed as numbers", () => {
// 			// Arrange
// 			const recons = [createMockRecon()];
// 			const onReconOrders = [
// 				createMockOnReconOrder({
// 					settlements: [
// 						{
// 							due_date: new Date(),
// 							amount: { value: "invalid" }, // Invalid number
// 							commission: { value: "50" },
// 							withholding_amount: { value: "100" },
// 							tcs: { value: "20" },
// 							tds: { value: "30" },
// 						},
// 					],
// 				} as any),
// 			];
// 			const reconPayload = createMockReconPayload();

// 			// Act & Assert - parseFloat("invalid") returns NaN, which won't equal the recon amount
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).toThrow("Recon breakdown does not match with on recon settlements");
// 		});
// 	});

// 	describe("validateRecons - Performance Edge Cases", () => {
// 		it("should handle large number of orders efficiently", () => {
// 			// Arrange
// 			const numberOfOrders = 1000;
// 			const recons = Array.from({ length: numberOfOrders }, (_, i) =>
// 				createMockRecon({
// 					order_id: `order${i}`,
// 					recon_status: "SENT_PENDING",
// 				}),
// 			);
// 			const onReconOrders = Array.from({ length: numberOfOrders }, (_, i) =>
// 				createMockOnReconOrder({
// 					id: `order${i}`,
// 					recon_accord: false, // Skip breakdown validation for performance
// 				}),
// 			);
// 			const reconPayload = createMockReconPayload(
// 				Array.from({ length: numberOfOrders }, (_, i) => `order${i}`),
// 			);

// 			// Act & Assert
// 			const startTime = Date.now();
// 			expect(() => {
// 				service.validateRecons(recons, onReconOrders, reconPayload);
// 			}).not.toThrow();
// 			const endTime = Date.now();

// 			// Should complete within reasonable time (1 second for 1000 orders)
// 			expect(endTime - startTime).toBeLessThan(1000);
// 		});
// 	});
// });
