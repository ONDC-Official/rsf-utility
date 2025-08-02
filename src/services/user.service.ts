import { UserRepository } from "../repositories/user.repository";

export class UserService {
	constructor(private userRepo: UserRepository) {}

	async createUser(userData: any) {
		return await this.userRepo.createUser(userData);
	}

	async getUsers() {
		return await this.userRepo.getAllUsers();
	}
}
