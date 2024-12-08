import eslintPluginJs from '@eslint/js';
import eslintPluginStylistic from '@stylistic/eslint-plugin';
import globals from 'globals';


const config = [
	eslintPluginJs.configs.recommended,
	eslintPluginStylistic.configs['all-flat'],
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.node,
			},
			sourceType: 'module',
		},
		rules: {
			'@stylistic/array-bracket-newline': ['error', 'consistent'],
			'@stylistic/array-element-newline': ['error', 'consistent'],
			'@stylistic/arrow-parens': 'off',
			'@stylistic/comma-dangle': ['error', 'always-multiline'],
			'@stylistic/dot-location': ['error', 'property'],
			'@stylistic/function-call-argument-newline': ['error', 'consistent'],
			'@stylistic/function-paren-newline': 'off',
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/indent-binary-ops': ['error', 'tab'],
			'@stylistic/max-len': 'off',
			'@stylistic/multiline-comment-style': 'off',
			'@stylistic/multiline-ternary': ['error', 'always-multiline'],
			'@stylistic/newline-per-chained-call': ['error', {ignoreChainWithDepth: 1}],
			'@stylistic/no-mixed-operators': 'off',
			'@stylistic/no-tabs': 'off',
			'@stylistic/object-property-newline': 'off',
			'@stylistic/one-var-declaration-per-line': 'off',
			'@stylistic/operator-linebreak': ['error', 'before'],
			'@stylistic/padded-blocks': 'off',
			'@stylistic/quote-props': ['error', 'consistent-as-needed'],
			'@stylistic/quotes': ['error', 'single'],
			'curly': 'error',
			'no-implicit-coercion': 'error',
			'no-unused-vars': [
				'error',
				{
					vars: 'all',
					args: 'none',
					ignoreRestSiblings: false,
				},
			],
		},
	},
	{
		files: ['test/**', '**/example.js'],
		rules: {
			'no-unused-vars': 'off',
			'@stylistic/semi': 'off',
		},
	},
];

export default config;
