// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/**/*.test.ts"], // Automatically find test files ending in .test.ts
	verbose: true,
	forceExit: true,
	clearMocks: true, // Optional: Automatically clear mock calls and instances between every test
};
