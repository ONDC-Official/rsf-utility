import { User } from "../db/models/user.model";
import { UserType } from "../types/models/user.type";

export class UserRepository {
	async createUser(data: UserType) {
		return await User.create(data);
	}

	async getUserById(id: string) {
		return await User.findById(id);
	}

	async getAllUsers() {
		return await User.find();
	}
}
