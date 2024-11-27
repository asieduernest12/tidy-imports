#!/usr/bin/env node

import chalk from "chalk";
import enquirer from "enquirer";
import {  execa } from "execa";
import ora from "ora";
import { tidyOptions } from "./tidyOptions";

const selectionsRes = await new enquirer.Select({
    type: "select",
    choices: Object.keys(tidyOptions),
    message: "Select prettier and eslint configurations",
    multiple: true,
}).run();
console.log(chalk.gray({ selectionsRes }));

const installables = selectionsRes.map((choice:string) => tidyOptions[choice]?.npm?.join("\n")).join(" ");

const installScript = `npm i -D ${installables}`;
console.log(chalk.bgCyan("run \n").toString(),installScript);

const spinner = ora("Loading unicorns").start();
// const installOutput = await execa`${installScript.replace("run", "")}`;
// const installOutput = await execa('ls');
spinner.succeed("packages installed");
// console.log(chalk.gray(installOutput));

const eslintConfigs = selectionsRes.map((choice:string) => `tidyOptions.${choice}.eslint`);

console.log(chalk.bgCyan('add to eslint config: '),chalk.green(eslintConfigs));


const prettierPlugins = selectionsRes.map((choice:string) => tidyOptions[choice]?.prettier ?? "").join(" ");
console.log(chalk.bgCyan('add to prettier plugins:[]'),(prettierPlugins));
