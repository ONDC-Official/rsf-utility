import { UserRepository } from "../repositories/user-repository";
import { UserType } from "../types/models/user.type";

export class UserService {
	constructor(private userRepo: UserRepository) {}

	async createUser(userData: any) {
		return await this.userRepo.createUser(userData);
	}

	async getUsers() {
		return await this.userRepo.getAllUsers();
	}

	async overrideUser(userId: string, userData: UserType) {
		return await this.userRepo.updateUser(userId, userData);
	}

	async updateUserDetails(userId: string, userData: Partial<UserType>) {
		const allowedFields = [
			"tcs",
			"tds",
			"settlement_agency_url",
			"settlement_agency_api_key",
			"settlement_agency_id",
			"provider_details",
		];
		for (const key of Object.keys(userData)) {
			if (!allowedFields.includes(key)) {
				throw new Error(`Field ${key} is not allowed to be updated`);
			}
		}
		return await this.userRepo.updateUser(userId, userData);
	}

	async deleteUser(userId: string) {
		return await this.userRepo.deleteUser(userId);
	}

	checkUserById = async (id: string) => {
		return await this.userRepo.checkUserById(id);
	};
	getUserById = async (id: string) => {
		const user = await this.userRepo.getUserById(id);
		if (!user) {
			throw new Error("User not found");
		}
		return user;
	};
	checkUserByUniqueCombination = async (
		role: UserType["role"],
		subscriber_id: UserType["subscriber_id"],
		domain: UserType["domain"]
	) => {
		const result = await this.userRepo.checkUserByUniqueCombination(
			role,
			subscriber_id,
			domain
		);
		return result;
	};
	getUserByUniqueCombination = async (
		role: UserType["role"],
		subscriber_id: UserType["subscriber_id"],
		domain: UserType["domain"]
	) => {
		const result = await this.userRepo.getUserByUniqueCombination(
			role,
			subscriber_id,
			domain
		);
		if (!result) {
			throw new Error("User not found");
		}
		return result;
	};

	getUserIdsByRoleAndDomain = async (
		domain: string,
		bapId: string,
		bppId: string
	) => {
		let bap_user_id: string | undefined = undefined;
		let bpp_user_id: string | undefined = undefined;
		if (await this.checkUserByUniqueCombination("BAP", bapId, domain)) {
			const user = await this.getUserByUniqueCombination("BAP", bapId, domain);
			bap_user_id = user._id.toString();
		}
		if (await this.checkUserByUniqueCombination("BPP", bppId, domain)) {
			const user = await this.getUserByUniqueCombination("BPP", bppId, domain);
			bpp_user_id = user._id.toString();
		}
		return { bap_user_id, bpp_user_id };
	};
}
