import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
  {files: [`**/*.{js,mjs,cjs,ts}`]},
  {languageOptions: { globals: globals.browser }},
  {
    plugins: {
      '@stylistic/ts': stylisticTs
    },
    rules: {
      'semi': [`error`, `never`],
      'indent': [`error`, 2],
      '@stylistic/ts/indent': [`error`, 2],
      quotes: [`error`, `backtick`],
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
]
