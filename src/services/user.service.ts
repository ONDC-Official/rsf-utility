import { UserRepository } from "../repositories/user.repository";
import { UserType } from "../types/models/user.type";

export class UserService {
	constructor(private userRepo: UserRepository) {}

	async createUser(userData: any) {
		return await this.userRepo.createUser(userData);
	}

	async getUsers() {
		return await this.userRepo.getAllUsers();
	}

	async overrideUser(userId: string, userData: any) {
		return await this.userRepo.updateUser(userId, userData);
	}

	async updateUserDetails(userId: string, userData: any) {
		return await this.userRepo.updateUser(userId, userData);
	}

	async deleteUser(userId: string) {
		return await this.userRepo.deleteUser(userId);
	}

	checkUserById = async (id: string) => {
		return await this.userRepo.checkUserById(id);
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
