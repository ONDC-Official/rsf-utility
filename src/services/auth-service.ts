import { signJwt } from "../utils/auth-utils";
import { StringValue } from "ms";

export class AuthService {
	private readonly allowedClientId: string;

	constructor(clientId: string) {
		this.allowedClientId = clientId;
	}

	public issueToken(clientId: string, expiresIn: StringValue): string | null {
		if (clientId !== this.allowedClientId) {
			return null;
		}

		const payload = { client_id: clientId };
		return signJwt(payload, expiresIn);
	}
}
