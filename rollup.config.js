// rollup.config.js
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default {
    input: "src/main.ts",
    output: {
        file: "dist/main.js",
        format: "cjs",
        compact: true,
        
    },
    plugins: [
        //
        babel({ babelHelpers: "bundled" }),
        resolve(),
        typescript({ sourceMap: true }),
        typescriptPaths(),
    ],
};
