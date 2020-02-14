module.exports = {
	parser: "@typescript-eslint/parser",
	extends: [
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier/@typescript-eslint",
		"plugin:prettier/recommended"
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/ban-ts-ignore": "off",
		"react/react-in-jsx-scope": "off",
		"react/prop-types": "off",
		"react/display-name": "off"
	},
	settings: {
		react: {
			version: "detect"
		}
	}
};
