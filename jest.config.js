module.exports = {
	moduleNameMapper: {
		"\\.(css|sass)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: [
		"<rootDir>/**/tests.ts",
		"<rootDir>/**/*.test.tsx",
		"<rootDir>/**/tests.ts",
		"<rootDir>/**/*.test.tsx",
	],
};
