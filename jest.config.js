module.exports = {
	moduleNameMapper: {
		"\\.(css|styl)$": "identity-obj-proxy",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
	testMatch: [
		"<rootDir>/**/tests.ts",
		"<rootDir>/**/*.test.tsx",
		"<rootDir>/**/tests.ts",
		"<rootDir>/**/*.test.tsx",
		"<rootDir>/**/tests/index.ts",
		"<rootDir>/**/tests/index.tsx",
	],
};
