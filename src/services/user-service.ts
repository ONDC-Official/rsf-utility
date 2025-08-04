import { UserRepository } from "../repositories/user-repository";
import { UserType } from "../schema/models/user-schema";

export class UserService {
	constructor(private userRepo: UserRepository) {}

	async createUser(userData: UserType) {
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
		subscriber_url: UserType["subscriber_url"],
		domain: UserType["domain"],
	) => {
		const result = await this.userRepo.checkUserByUniqueCombination(
			role,
			subscriber_url,
			domain,
		);
		return result;
	};
	getUserByUniqueCombination = async (
		role: UserType["role"],
		subscriber_url: UserType["subscriber_url"],
		domain: UserType["domain"],
	) => {
		const result = await this.userRepo.getUserByUniqueCombination(
			role,
			subscriber_url,
			domain,
		);
		if (!result) {
			throw new Error("User not found");
		}
		return result;
	};

	getUserIdsByRoleAndDomain = async (
		domain: string,
		bapUrl: string,
		bppUrl: string,
	) => {
		let bap_user_uri: string | undefined = undefined;
		let bpp_user_uri: string | undefined = undefined;
		if (await this.checkUserByUniqueCombination("BAP", bapUrl, domain)) {
			const user = await this.getUserByUniqueCombination("BAP", bapUrl, domain);
			bap_user_uri = user._id.toString();
		}
		if (await this.checkUserByUniqueCombination("BPP", bppUrl, domain)) {
			const user = await this.getUserByUniqueCombination("BPP", bppUrl, domain);
			bpp_user_uri = user._id.toString();
		}
		return { bap_user_uri, bpp_user_uri };
	};
}
