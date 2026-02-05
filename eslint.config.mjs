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
    // ... ta config existante ...
    languageOptions: {
      globals: globals.browser,
    },
  },

  // 👇 AJOUTE CE BLOC ICI 👇
  // 🧪 Tests Jest
  {
    files: ["**/*.test.js", "**/*.spec.js", "src/test_dev.js"], // Ajoute ici tes fichiers de test
    languageOptions: {
      globals: {
        ...globals.jest, // Cela apprend à ESLint ce que sont 'test', 'expect', 'describe', etc.
      },
    },
  },
]);