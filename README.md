# Tidy Imports

Tidy Imports is a tool to keep your JavaScript/TypeScript imports organized using ESLint and Prettier presets.

## Quickly Scaffold Import Rules for ESLint and Prettier

This project helps you to keep your imports organized and tidy in your JavaScript/TypeScript projects using ESLint and Prettier by providing ready-to-go presets that can be included in each `eslint/prettier config.mjs` file.

## Installation

To get started, install the necessary packages:

```sh
 npm i -D prettier-plugin-path-alias eslint-plugin-organize-imports prettier-plugin-organize-imports eslint-plugin-import

```

## Configuration

### ESLint

Add the following to your ESLint configuration file:

eslint.config.mjs

```
{
  plugins: {
    'path-alias': 'pathAlias //import pathAlias from "eslint-plugin-path-alias"',
    eslintPluginOrganizeImports: 'eslintPluginOrganizeImports //import eslintPluginOrganizeImports from "eslint-plugin-organize-imports"',
    import: 'eslintPluginImport //import eslintPluginImport from "eslint-plugin-import"'
  },
  rules: {
    'path-alias/no-relative': [
      'error',
        {
            exceptions: ["*.module.css"]
        }
    ],
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-relative-packages': 'error',
    'no-undef': 'error'
  }
}
```

### Prettier

Add the following to your Prettier configuration file:

```prettier.config.mjs
export default {
    // ...some other plugins
    plugins: [
        "prettier-plugin-sort-imports",
        "prettier-plugin-organize-imports",
    ],
};
```

## Usage

After setting up the configuration, you can run ESLint and Prettier to automatically organize and tidy your imports.

```sh
npx eslint . --fix
npx prettier --write .
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
