import { User } from "../db/models/user.model";
import { UserType } from "../types/models/user.type";
export class UserRepository {
	async createUser(data: UserType) {
		return await User.create(data);
	}

	async checkUserById(id: string) {
		return await User.exists({ _id: id });
	}

	async checkUserByUniqueCombination(
		role: UserType["role"],
		subscriber_id: UserType["subscriber_id"],
		domain: UserType["domain"]
	) {
		return await User.exists({ role, subscriber_id, domain });
	}

	async getUserByUniqueCombination(
		role: UserType["role"],
		subscriber_id: UserType["subscriber_id"],
		domain: UserType["domain"]
	) {
		return await User.findOne({ role, subscriber_id, domain });
	}

	async getAllUsers() {
		return await User.find();
	}

	async updateUser(id: string, data: Partial<UserType>) {
		return await User.findByIdAndUpdate(id, data, {
			new: true,
			runValidators: true,
		});
	}

	async deleteUser(id: string) {
		return await User.findByIdAndDelete(id);
	}
}
