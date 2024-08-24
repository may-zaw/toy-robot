import globals from "globals"
import tseslint from "typescript-eslint"
import stylisticTs from '@stylistic/eslint-plugin-ts'

export default [
  {
    files: [`**/*.{js,mjs,cjs,ts}`],
    languageOptions: { globals: globals.browser },
    ignores: [`**/dist/**/*.js`],
    plugins: {
      "@stylistic/ts": stylisticTs
    },
    rules: {
      "semi": [`error`, `never`],
      "indent": `off`,
      "@stylistic/ts/indent": [`error`, 2],
      "no-unused-vars": `warn`,
      "@typescript-eslint/no-require-imports": `off`, // Disable this rule
      "quotes": [`error`, `backtick`],
    }
  },
  ...tseslint.configs.recommended,
]