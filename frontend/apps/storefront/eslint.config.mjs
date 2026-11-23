import next from "@next/eslint-plugin-next"
import parser from "@typescript-eslint/parser"
import typescript from "@typescript-eslint/eslint-plugin"
import hooks from "eslint-plugin-react-hooks"

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@next/next": next,
      "@typescript-eslint": typescript,
      "react-hooks": hooks,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
      ...typescript.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // Next 15 and Tailwind 3 configuration files use CommonJS.
  {
    files: ["*.js"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
]
export default config
