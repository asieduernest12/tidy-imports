export type ITidyOption = Record<string, { eslint: { plugins?: {}; rules?: {} }; prettier?: string[]; npm: string[] }>;

const tidyOptions = {
    // sortImport: {
    //     eslint: {
    //         rules: { "sort-imports": "error" },
    //     },
    //     prettier: ["prettier-plugin-sort-imports"],
    //     npm: [],
    // },
    pathAlias: {
        npm: ["eslint-plugin-path-alias"],
        eslint: {
            plugins: { "path-alias": 'pathAlias //import pathAlias from "eslint-plugin-path-alias"' },
            rules: {
                "path-alias/no-relative": '["error", {exceptions: ["*.module.css"] }]',
            },
        },
    },
    organizeImports: {
        npm: ["eslint-plugin-organize-imports prettier-plugin-organize-imports"],
        eslint: {
            plugins: {
                eslintPluginOrganizeImports: 'eslintPluginOrganizeImports //import eslintPluginOrganizeImports from "eslint-plugin-organize-imports"',
            },
            rules: {},
        },
        prettier: ["prettier-eslint-organize-imports"],
    },
    eslintConfigPrettier: {
        eslint: {
            plugins: { eslintConfigPrettier: 'eslintConfigPrettier //import pathAlias from "eslint-plugin-config-prettier"' },
        },
        npm: ["eslint-config-prettier"],
    },
    pluginImport: {
        npm: ["eslint-plugin-import"],
        eslint: {
            plugins: { import: 'eslintPluginImport //import eslintPluginImport from "eslint-plugin-import"' },
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
                "no-undef": "error",
            },
        },
    },
} satisfies ITidyOption;

export { tidyOptions };
