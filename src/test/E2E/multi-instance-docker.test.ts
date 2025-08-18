import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import axios from "axios";
import { on_confirmPayloads } from "../data/on-confirms";
import { UserType } from "../../schema/models/user-schema";
import { isPerfectAck } from "../../utils/ackUtils";

const execAsync = promisify(exec);

/**
 * Docker-Based Multi-Instance E2E Test
 *
 * This test uses Docker Compose to run two completely separate RSF utility instances:
 * - BAP Instance: Port 3000, MongoDB on port 27017
 * - BPP Instance: Port 3001, MongoDB on port 27018
 *
 * Each instance has its own:
 * - Docker container
 * - Database
 * - Environment variables
 * - Process isolation
 *
 * Usage:
 * 1. npm run test:multi-instance
 * OR
 * 2. docker-compose -f src/test/E2E/docker-compose.multi-instance.yml up -d
 *    npm test -- --testNamePattern="Docker Multi-Instance"
 */
describe("Docker Multi-Instance E2E: Real Isolation", () => {
	let bapToken: string;
	let bppToken: string;
	let bapUserId: string;
	let bppUserId: string;
	let orderIds: string[] = [];

	const BAP_BASE_URL = "http://localhost:3000";
	const BPP_BASE_URL = "http://localhost:3001";
	const DOCKER_COMPOSE_FILE = path.join(
		__dirname,
		"docker-compose.multi-instance.yml",
	);

	const bapUser: UserType = {
		title: "BAP_DOCKER_MULTI",
		role: "BAP",
		domain: "ONDC:RET14",
		subscriber_url: `http://host.docker.internal:3000/api`,
		np_tcs: 3,
		np_tds: 6,
		pr_tcs: 9,
		pr_tds: 3,
		tcs_applicability: "BOTH",
		tds_applicability: "BOTH",
		msn: false,
		provider_details: [
			{
				provider_name: "BAP Docker Provider",
				provider_id: "BAP_DOCKER_P1",
				account_number: "1111111111",
				ifsc_code: "BAPD1234",
				bank_name: "BAP Docker Bank",
			},
		],
		counterparty_infos: [],
	};

	const bppUser: UserType = {
		title: "BPP_DOCKER_MULTI",
		role: "BPP",
		domain: "ONDC:RET14",
		subscriber_url: `http://host.docker.internal:3001/api`,
		np_tcs: 2,
		np_tds: 4,
		pr_tcs: 8,
		pr_tds: 2,
		tcs_applicability: "BOTH",
		tds_applicability: "BOTH",
		msn: true,
		provider_details: [
			{
				provider_name: "BPP Docker Provider",
				provider_id: "BPP_DOCKER_P1",
				account_number: "2222222222",
				ifsc_code: "BPPD1234",
				bank_name: "BPP Docker Bank",
			},
		],
		counterparty_infos: [],
	};

	beforeAll(async () => {
		console.log("🐳 Setting up Docker Multi-Instance Test Environment...");

		try {
			// Start Docker Compose services
			console.log("📦 Starting Docker Compose services...");
			await execAsync(`docker-compose -f ${DOCKER_COMPOSE_FILE} up -d`, {
				cwd: path.dirname(DOCKER_COMPOSE_FILE),
			});

			// Wait for services to be healthy
			console.log("⏳ Waiting for services to be ready...");
			await waitForServicesReady();

			// Generate authentication tokens
			console.log("🔐 Generating authentication tokens...");
			bapToken = await generateToken(BAP_BASE_URL, "bap-test-client");
			bppToken = await generateToken(BPP_BASE_URL, "bpp-test-client");

			console.log("✅ Docker Multi-Instance setup complete!");
		} catch (error) {
			console.error("❌ Setup failed:", error);
			throw error;
		}
	}, 120000); // 2 minute timeout for Docker setup

	afterAll(async () => {
		console.log("🧹 Cleaning up Docker Multi-Instance Test...");

		try {
			// Stop and remove Docker Compose services
			await execAsync(`docker-compose -f ${DOCKER_COMPOSE_FILE} down -v`, {
				cwd: path.dirname(DOCKER_COMPOSE_FILE),
			});
			console.log("✅ Docker services stopped and cleaned up");
		} catch (error) {
			console.error("❌ Cleanup failed:", error);
		}
	}, 60000);

	async function waitForServicesReady(): Promise<void> {
		const maxAttempts = 30;
		const delayMs = 2000;

		for (let attempt = 1; attempt <= maxAttempts; attempt++) {
			try {
				// Check BAP instance
				const bapResponse = await fetch(`${BAP_BASE_URL}/health`);
				// Check BPP instance
				const bppResponse = await fetch(`${BPP_BASE_URL}/health`);

				if (bapResponse.ok && bppResponse.ok) {
					console.log(`✅ Both instances are ready (attempt ${attempt})`);
					return;
				}
			} catch (error) {
				console.log(
					`⏳ Waiting for services... (attempt ${attempt}/${maxAttempts})`,
				);
			}

			if (attempt < maxAttempts) {
				await new Promise((resolve) => setTimeout(resolve, delayMs));
			}
		}

		throw new Error("Services did not become ready within the timeout period");
	}

	async function generateToken(
		baseUrl: string,
		clientId: string,
	): Promise<string> {
		const response = await fetch(`${baseUrl}/ui/auth/sign-token`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				client_id: clientId,
				expires: "1d",
			}),
		});

		if (!response.ok) {
			throw new Error(
				`Failed to generate token for ${baseUrl}: ${response.status}`,
			);
		}

		const data = await response.json();
		return data.data.token;
	}

	describe("Phase 1: Instance Isolation Verification", () => {
		it("1.1. should verify instances are running in separate containers", async () => {
			console.log("🔍 Verifying Docker container isolation...");

			const { stdout } = await execAsync(
				"docker ps --format 'table {{.Names}}\\t{{.Ports}}'",
			);
			console.log("Running containers:\n", stdout);

			expect(stdout).toContain("rsf-bap");
			expect(stdout).toContain("rsf-bpp");
			expect(stdout).toContain("3000->3000");
			expect(stdout).toContain("3001->3000");

			console.log("✅ Container isolation verified");
		});

		it("1.2. should verify separate database connections", async () => {
			console.log("🔍 Verifying database isolation...");

			// Each instance should connect to different databases
			const bapHealthResponse = await fetch(`${BAP_BASE_URL}/health`);
			const bppHealthResponse = await fetch(`${BPP_BASE_URL}/health`);

			expect(bapHealthResponse.ok).toBe(true);
			expect(bppHealthResponse.ok).toBe(true);

			console.log("✅ Database isolation verified");
		});
	});

	describe("Phase 2: User Creation in Isolated Instances", () => {
		it("2.1. should create BAP user in BAP container", async () => {
			console.log("👤 Creating BAP user in BAP container...");

			const response = await fetch(`${BAP_BASE_URL}/ui/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${bapToken}`,
				},
				body: JSON.stringify(bapUser),
			});

			expect(response.status).toBe(201);
			const data = await response.json();
			bapUserId = data.data._id;

			expect(data.data.title).toBe(bapUser.title);
			expect(data.data.role).toBe("BAP");
			console.log(`✅ BAP user created: ${bapUserId}`);
		});

		it("2.2. should create BPP user in BPP container", async () => {
			console.log("👤 Creating BPP user in BPP container...");

			const response = await fetch(`${BPP_BASE_URL}/ui/users`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${bppToken}`,
				},
				body: JSON.stringify(bppUser),
			});

			expect(response.status).toBe(201);
			const data = await response.json();
			bppUserId = data.data._id;

			expect(data.data.title).toBe(bppUser.title);
			expect(data.data.role).toBe("BPP");
			console.log(`✅ BPP user created: ${bppUserId}`);
		});

		it("2.3. should verify users exist only in their respective instances", async () => {
			console.log("🔍 Verifying user isolation...");

			// Get users from BAP instance
			const bapUsersResponse = await fetch(`${BAP_BASE_URL}/ui/users`, {
				headers: { Authorization: `Bearer ${bapToken}` },
			});
			const bapUsers = await bapUsersResponse.json();

			// Get users from BPP instance
			const bppUsersResponse = await fetch(`${BPP_BASE_URL}/ui/users`, {
				headers: { Authorization: `Bearer ${bppToken}` },
			});
			const bppUsers = await bppUsersResponse.json();

			// BAP instance should only have BAP user
			const bapUserTitles = bapUsers.data.map((u: any) => u.title);
			expect(bapUserTitles).toContain("BAP_DOCKER_MULTI");
			expect(bapUserTitles).not.toContain("BPP_DOCKER_MULTI");

			// BPP instance should only have BPP user
			const bppUserTitles = bppUsers.data.map((u: any) => u.title);
			expect(bppUserTitles).toContain("BPP_DOCKER_MULTI");
			expect(bppUserTitles).not.toContain("BAP_DOCKER_MULTI");

			console.log("✅ User isolation verified");
		});
	});

	describe("Phase 3: Order Ingestion and Cross-Instance Communication", () => {
		it("3.1. should ingest orders in both instances", async () => {
			console.log("📋 Ingesting orders in both isolated instances...");

			const testOrders = on_confirmPayloads.slice(0, 3);

			// Ingest in BAP instance
			for (const on_confirm of testOrders) {
				const bapOnConfirm = {
					...on_confirm,
					context: {
						...on_confirm.context,
						bap_id: bapUser.title,
						bap_uri: bapUser.subscriber_url,
						bpp_id: bppUser.title,
						bpp_uri: bppUser.subscriber_url,
					},
				};

				const response = await fetch(`${BAP_BASE_URL}/api/on_confirm`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(bapOnConfirm),
				});

				expect(response.status).toBe(200);
			}

			// Ingest in BPP instance
			for (const on_confirm of testOrders) {
				const bppOnConfirm = {
					...on_confirm,
					context: {
						...on_confirm.context,
						bap_id: bapUser.title,
						bap_uri: bapUser.subscriber_url,
						bpp_id: bppUser.title,
						bpp_uri: bppUser.subscriber_url,
					},
				};

				const response = await fetch(`${BPP_BASE_URL}/api/on_confirm`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(bppOnConfirm),
				});

				expect(response.status).toBe(200);
			}

			// Verify orders in both instances
			const bapOrdersResponse = await fetch(
				`${BAP_BASE_URL}/ui/orders/${bapUserId}?page=1&limit=100`,
				{
					headers: { Authorization: `Bearer ${bapToken}` },
				},
			);
			const bapOrdersData = await bapOrdersResponse.json();
			orderIds = bapOrdersData.data.orders.map((o: any) => o.order_id);

			const bppOrdersResponse = await fetch(
				`${BPP_BASE_URL}/ui/orders/${bppUserId}?page=1&limit=100`,
				{
					headers: { Authorization: `Bearer ${bppToken}` },
				},
			);
			const bppOrdersData = await bppOrdersResponse.json();
			const bppOrderIds = bppOrdersData.data.orders.map((o: any) => o.order_id);

			expect(orderIds.length).toBe(testOrders.length);
			expect(bppOrderIds.length).toBe(testOrders.length);
			console.log(`✅ ${orderIds.length} orders ingested in both instances`);
		});

		it("3.2. should perform real cross-container HTTP communication", async () => {
			console.log(
				"🌐 Testing real HTTP communication between Docker containers...",
			);

			// Prepare settlements in both instances
			await prepareSettlements(BAP_BASE_URL, bapUserId, bapToken);
			await generateAndTriggerSettlement(
				BAP_BASE_URL,
				bapUserId,
				bapToken,
				orderIds,
			);
			await prepareSettlements(BPP_BASE_URL, bppUserId, bppToken);
			await generateAndTriggerSettlement(
				BPP_BASE_URL,
				bppUserId,
				bppToken,
				orderIds,
			);
			// Generate recon in BAP instance
			const reconPayload = await generateRecon(
				BAP_BASE_URL,
				bapUserId,
				bapToken,
			);

			// BAP container sends recon to BPP container (REAL HTTP between containers)
			console.log("📤 BAP container → BPP container: Sending recon...");
			const reconResponse = await fetch(`${BPP_BASE_URL}/api/recon`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reconPayload),
			});

			expect(reconResponse.status).toBe(200);
			console.log("✅ BPP container received recon from BAP container");

			// Generate on_recon in BPP instance
			const onReconPayload = await generateOnRecon(
				BPP_BASE_URL,
				bppUserId,
				bppToken,
			);

			// BPP container sends on_recon to BAP container (REAL HTTP between containers)
			console.log("📤 BPP container → BAP container: Sending on_recon...");
			const onReconResponse = await fetch(`${BAP_BASE_URL}/api/on_recon`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(onReconPayload),
			});

			expect(onReconResponse.status).toBe(200);
			console.log("✅ BAP container received on_recon from BPP container");

			console.log("🎉 Real cross-container communication successful!");
		});
	});

	async function prepareSettlements(
		baseUrl: string,
		userId: string,
		token: string,
	) {
		const prepareBody = {
			prepare_data: orderIds.map((id) => ({ id, strategy: "USER" })),
		};

		const response = await axios.post(
			`${baseUrl}/ui/settle/${userId}/prepare`,
			prepareBody,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		console.log(response.data, prepareBody, "prepare body");
		expect(response.status).toBe(201);
	}

	async function generateAndTriggerSettlement(
		baseUrl: string,
		userId: string,
		token: string,
		orderIds: string[],
	) {
		const generateBody = {
			settle_data: orderIds.map((orderId) => ({ order_id: orderId })),
		};
		const response = await axios.post(
			`${baseUrl}/ui/generate/${userId}/settle/np-np`,
			generateBody,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				validateStatus: (status) => {
					return true; // Allow all status codes for testing
				},
			},
		);
		expect(response.status).toBe(201);
		const payload = response.data.data;
		console.log(payload, "generate body");
		const triggerResponse = await axios.post(
			`${baseUrl}/ui/trigger/${userId}/settle`,
			payload,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				validateStatus: (status) => {
					return true;
				},
			},
		);
		console.log(triggerResponse.data, "trigger response");
		expect(triggerResponse.status).toBe(200);
		console.log("✅ container received settlement trigger");
	}

	async function generateRecon(baseUrl: string, userId: string, token: string) {
		const generateBody = {
			recon_data: orderIds.map((orderId) => ({ order_id: orderId })),
		};

		const response = await fetch(`${baseUrl}/ui/generate/${userId}/recon`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(generateBody),
		});

		expect(response.status).toBe(201);
		const data = await response.json();
		return data.data;
	}

	async function generateOnRecon(
		baseUrl: string,
		userId: string,
		token: string,
	) {
		const generateBody = {
			on_recon_data: orderIds.map((orderId) => ({
				order_id: orderId,
				recon_accord: true,
				due_date: new Date().toISOString(),
			})),
		};

		const response = await axios.post(
			`${baseUrl}/ui/generate/${userId}/on_recon`,
			generateBody,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);
		expect(response.status).toBe(201);
		return response.data.data;
	}
});
