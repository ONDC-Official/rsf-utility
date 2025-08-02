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
		return await this.userRepo.checkUserByUniqueCombination(
			role,
			subscriber_id,
			domain
		);
	};
	getUserByUniqueCombination = async (
		role: UserType["role"],
		subscriber_id: UserType["subscriber_id"],
		domain: UserType["domain"]
	) => {
		return await this.userRepo.getUserByUniqueCombination(
			role,
			subscriber_id,
			domain
		);
	};
}
