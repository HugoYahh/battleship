import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 🔧 Fichiers Node (tooling)
  {
    files: [
      "webpack.config.js",
      "webpack.*.js",
      "babel.config.cjs",
      "jest.config.cjs",
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  // 🌐 Code frontend (browser)
  {
    files: ["src/**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },
]);