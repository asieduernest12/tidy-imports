/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
    parser: "babel",
    printWidth: 140,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    arrowParens: "always",
    rangeStart: 0,
    sortingMethod: "alphabetic",
    plugins: ["prettier-plugin-sort-imports", "prettier-plugin-organize-imports"],
};
