import { createRequire } from "module";
import globals from "globals";
import pluginJs from "@eslint/js";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const require = createRequire(import.meta.url);

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.browser, ...globals.node }, // Define global variables
    },
  },

  // ESLint recommended settings for JavaScript
  pluginJs.configs.recommended,

  // Manually configuring Node.js specific settings (instead of eslint-config-node)
  {
    languageOptions: {
      globals: globals.node,  // Add Node.js global variables
    },
    rules: {
      "no-console": "warn",  // Warn on console usage
      "no-process-exit": "error", // Disallow process.exit()
      "strict": ["error", "global"], // Enforce strict mode
    },
  },

  // Prettier integration
  prettier,
  {
    plugins: {
      prettier: prettierPlugin, // Add Prettier as a plugin
    },
    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true, 
          singleQuote: true,
          trailingComma: "all",
          tabWidth: 2,
          printWidth: 80,
        },
      ],
    },
  },
];