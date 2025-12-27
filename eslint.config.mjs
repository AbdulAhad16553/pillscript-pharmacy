import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Disable TypeScript 'any' errors
      "@typescript-eslint/no-explicit-any": "off",
      // Allow <img> usage
      "@next/next/no-img-element": "off",
      // Allow unescaped characters in JSX
      "react/no-unescaped-entities": "off",
      // Optional: allow unused vars temporarily
      "@typescript-eslint/no-unused-vars": "warn"
    }
  }
]);

export default eslintConfig;
