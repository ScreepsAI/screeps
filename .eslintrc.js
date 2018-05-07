module.exports = {
	parser       : 'typescript-eslint-parser',
	extends      : [
		'standard',
		'prettier',
		'prettier/standard'
	],
	plugins      : [
		'prettier',
		'standard',
		'typescript'
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: false
		}
	},
	env          : {
		'es6' : true,
		'node': true
	},
	rules        : {
		'prettier/prettier'     : [
			2, {
				'printWidth'   : 120,
				'useTabs'      : true,
				'singleQuote'  : true,
				'trailingComma': 'all'
			}
		],
		'no-new'                : [0],
		'no-undef'              : [0],
		'no-unused-vars'        : [0],
		'no-unused-expressions' : [0],
		'no-fallthrough'        : [0],
		'no-useless-constructor': [0],
		'new-cap'               : [0]
	}
};