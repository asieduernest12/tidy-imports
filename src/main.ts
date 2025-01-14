#!/bin/env node

import { envs } from "@src/envService";
import chalk from "chalk";
import { tidyOptions } from "./../src/tidyOptions";
const enquirer = require("enquirer");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
// import * as enquirer from 'enquirer'

function output(text: string | unknown) {
    return chalk.green(text);
}

console.log(output(JSON.stringify(envs)));
async function handleSuggestions() {
    do {
        const selectionsRes = await (new enquirer.Select({
            type: "select",
            choices: Object.keys(tidyOptions),
            message: "Select prettier and eslint configurations",
            multiple: true,
        }).run() as Promise<Array<keyof typeof tidyOptions>>);

        envs.NODE_ENV === "production" && console.dir(chalk.gray(JSON.stringify({ selectionsRes })));

        const installables = selectionsRes.map((choice) => tidyOptions[choice]?.npm?.join("\n")).join(" ");
        const installScript = `npm i -D ${installables}`;
        console.log("\n\nrun \n".toString(), output(installScript), "\n\n");

        // const spinner = ora("Loading unicorns").start();
        // const {stdout:installOutput} = await execa`${installScript.replace("run", "")}`;
        // console.log(output(installOutput));
        // const installOutput = await execa('ls');
        // spinner.succeed("packages installed");

        const eslintConfigs = selectionsRes.map((choice) => tidyOptions[choice].eslint);

        const reducedEslintConfs = eslintConfigs.reduce(
            (acc, eslconf) => {
                acc.plugins = { ...acc.plugins, ...eslconf.plugins };
                acc.rules = { ...acc.rules, ...eslconf.rules };
                return acc;
            },
            { plugins: {}, rules: {} }
        );
        // console.log(
        //     "add to eslint default export {\n\n\t\\\\...other configs\n%s\n}: \n,%O",
        //     output(eslintConfigs),
        //     "\n\n",
        //     JSON.stringify(eslintConfigs, null, 2)
        // );

        console.dir(reducedEslintConfs);

        const prettierPlugins = selectionsRes.flatMap((choice) => (tidyOptions[choice]?.prettier?.length ? ('\t"' + tidyOptions[choice]?.prettier + '"' ?? []) : [])).join(",\n");

        console.log("add to prettier plugins: [\n\n\t\\\\...some other plugins\n%s\n]\n", output(prettierPlugins));
    } while (envs.NODE_ENV !== "production");
}

async function handleEslintConfMigration() {
    const eslintConfigPath = path.join(process.cwd(), ".eslintrc.json");
    const fileExists = fs.existsSync(eslintConfigPath);
    console.log({ eslintConfigPath, fileExists });

    if (fileExists) {
        const migrate = await (new enquirer.Confirm({
            name: "migrate",
            message: "Existing .eslintrc.json found. Do you want to migrate to flat config format?",
        }).run() as Promise<boolean>);

        if (migrate) {
            return new Promise((res, rej) => {
                exec(`yes | npx  @eslint/migrate-config .eslintrc.json`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error migrating ESLint config: ${error.message}`);
                        rej(error.message);

                        return;
                    }
                    if (stderr) {
                        console.error(`stderr: ${stderr}`);
                        rej(stderr);
                        return;
                    }
                    res(stdout);
                    console.log(`ESLint config migrated to flat format: ${stdout}`);
                });
            });
        }
    }
}

async function main() {
    await handleEslintConfMigration();
    await handleSuggestions();
}

main().catch(console.log);
