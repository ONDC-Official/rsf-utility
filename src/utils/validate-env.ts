/**
 * Checks if all required environment variables from a given list are set.
 * Throws an error if any variable is missing.
 *
 * @param {string[]} requiredEnvVars - An array of strings, where each string is the name of a required environment variable.
 */
const checkRequiredEnvVars = (requiredEnvVars: string[]) => {
	const missingVars = [];

	for (const varName of requiredEnvVars) {
		// Checks for undefined, null, or an empty string
		if (!process.env[varName]) {
			missingVars.push(varName);
		}
	}

	if (missingVars.length > 0) {
		throw new Error(
			`Missing required environment variables: ${missingVars.join(
				", "
			)}. Please check your .env file or server configuration.`
		);
	}
};

export default checkRequiredEnvVars;
