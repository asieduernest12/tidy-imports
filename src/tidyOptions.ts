const eslintConfigPrettier = require("eslint-config-prettier");
const eslintPluginImport = require("eslint-plugin-import");
const eslintPluginOrganizeImports = require("eslint-plugin-organize-imports");
const pathAlias = require("eslint-plugin-path-alias");

export type ITidyOption = Record<string,{eslint:import('eslint').Linter.Config, prettier?:string[], npm:string[]}>

const tidyOptions = {
    sortImport: {
        eslint: {
            rules: { "sort-imports": "error" },
        },
        prettier: ["prettier-plugin-sort-imports"],
        npm: [],
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
        npm: [],
        eslint: {
            rules: {
                "no-undef": ["error", { typeof: true }],
            },
        },
    },
} satisfies ITidyOption;

export { tidyOptions };
