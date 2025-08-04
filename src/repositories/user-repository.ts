import { User } from "../db/models/user-model";
import { UserType } from "../schema/models/user-schema";
export class UserRepository {
	async createUser(data: UserType) {
		return await User.create(data);
	}

	async checkUserById(id: string) {
		return await User.exists({ _id: id });
	}
	async getUserById(id: string) {
		return await User.findById(id);
	}

	async checkUserByUniqueCombination(
		role: UserType["role"],
		subscriber_url: UserType["subscriber_url"],
		domain: UserType["domain"],
	) {
		return await User.exists({ role, subscriber_url, domain });
	}

	async getUserByUniqueCombination(
		role: UserType["role"],
		subscriber_url: UserType["subscriber_url"],
		domain: UserType["domain"],
	) {
		return await User.findOne({ role, subscriber_url, domain });
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
