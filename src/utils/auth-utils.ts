// src/utils/jwtUtil.ts
import jwt, { SignOptions, Secret } from "jsonwebtoken";
import config from "../config/auth-config";
import { StringValue } from "ms";

export function signJwt(
	payload: Record<string, any>,
	expiresIn?: StringValue,
): string {
	const { JWT_SECRET } = config;
	const ALGORITHM = "HS256";

	if (!JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined");
	}

	const options: SignOptions = {
		// expiresIn,
		algorithm: ALGORITHM,
	};

	if (expiresIn) {
		options.expiresIn = expiresIn;
	}

	return jwt.sign(payload, JWT_SECRET as Secret, options);
}
