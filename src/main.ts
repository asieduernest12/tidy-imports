#!/bin/env node

import { envs } from "@src/envService";
import { tidyOptions } from "@src/tidyOptions";
import chalk from "chalk";
const enquirer = require("enquirer");

function output(text:string){
    return chalk.green(text)
}

console.log(output(JSON.stringify(envs)))
async function main() {
    do {
        const selectionsRes = await new enquirer.Select({
            type: "select",
            choices: Object.keys(tidyOptions),
            message: "Select prettier and eslint configurations",
            multiple: true,
        }).run();

        envs.NODE_ENV==='production' && console.dir(chalk.gray(JSON.stringify({ selectionsRes })));

        const installables = selectionsRes.map((choice) => tidyOptions[choice]?.npm?.join("\n")).join(" ");
        const installScript = `npm i -D ${installables}`;
        console.log(chalk.bgCyan("run \n").toString(), output(installScript), "\n\n");

        // const spinner = ora("Loading unicorns").start();
        // const installOutput = await execa`${installScript.replace("run", "")}`;
        // console.log(chalk.gray(installOutput));
        // const installOutput = await execa('ls');
        // spinner.succeed("packages installed");

        const eslintConfigs = selectionsRes.map((choice) => `tidyOptions.${choice}.eslint`);
        console.log(chalk.bgCyan("add to eslint config: \n"), output(eslintConfigs),'\n\n');

        const prettierPlugins = selectionsRes.map((choice) => tidyOptions[choice]?.prettier ?? "").join(" ");
        console.log(chalk.bgCyan("add to prettier plugins:[]\n"), output(prettierPlugins));
    } while (envs.NODE_ENV !== "production");
}

main().catch(console.log);

export {};
