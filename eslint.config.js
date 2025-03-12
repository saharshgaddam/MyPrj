import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default {
  extends: [js.configs.recommended],
  files: ["**/*.js", "**/*.jsx"], // Updated to include .js and .jsx files
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module", // Ensure ES modules are supported
    ecmaFeatures: {
      jsx: true, // Support for JSX
    }
  },
  globals: globals.browser,
  plugins: [
    "react-hooks",
    "react-refresh"
  ],
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    // Removed TypeScript-specific rules
  },
  settings: {
    react: {
      version: "detect" // Automatically detect the React version
    }
  }
};
