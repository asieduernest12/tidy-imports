import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginOrganizeImports from "eslint-plugin-organize-imports";
import pathAlias from "eslint-plugin-path-alias";

/** @type {Record<string,{eslint:import('eslint').Linter.Config>, prettier?:[string], npm?:[string]}} */
const tidyOptions = {
    sortImport: {
        eslint: {
            rules: { "sort-imports": "error" },
        },
        prettier: ["prettier-plugin-sort-imports"],
    },
    pathAlias: {
        npm: ["prettier-plugin-path-alias"],
        eslint: {
            plugins: { "path-alias": pathAlias },
            rules: {
                "path-alias/no-relative": "error",
            },
        },
    },
    organizeImports: {
        npm: ["eslint-plugin-organize-imports prettier-plugin-organize-imports"],
        eslint: { plugins: eslintPluginOrganizeImports, rules: {} },
        prettier: ["prettier-eslint-organize-imports"],
    },
    eslintConfigPrettier: {
        eslint: eslintConfigPrettier,
        npm: ["eslint-config-prettier"],
    },
    pluginImport: {
        npm: ["eslint-plugin-import"],
        eslint: {
            plugins: { import: eslintPluginImport },
            rules: {
                "import/first": "error",
                "import/newline-after-import": "error",
                "import/no-duplicates": "error",
                "import/no-relative-packages": "error",
            },
        },
    },

    noUnusedVars: {
        eslint: {
            rules: {
                "no-undef": ["error", { typeof: true }],
            },
        },
    },
};

export { tidyOptions };
