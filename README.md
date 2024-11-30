# Tidy Imports

This project helps you to keep your imports organized and tidy in your JavaScript/TypeScript projects using ESLint and Prettier.

## Installation

To get started, install the necessary packages:

```sh
npm i -D prettier-plugin-path-alias eslint-plugin-organize-imports prettier-plugin-organize-imports eslint-config-prettier eslint-plugin-import
```

## Configuration

### ESLint

Add the following to your ESLint configuration file:

```js
module.exports = {
    // ...other configs
    tidyOptions.sortImport.eslint,
    tidyOptions.pathAlias.eslint,
    tidyOptions.organizeImports.eslint,
    tidyOptions.eslintConfigPrettier.eslint,
    tidyOptions.pluginImport.eslint,
    tidyOptions.noUnusedVars.eslint,
};
```

### Prettier

Add the following to your Prettier configuration file:

```js
module.exports = {
    // ...some other plugins
    plugins: [
        ...tidyOptions.sortImport.prettier,
        ...tidyOptions.organizeImports.prettier,
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