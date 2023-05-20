#!/usr/bin/env ts-node

import path from "path";
import fs from "fs";
import prettier from "prettier";
import { Web3ToolsApp } from "types";
import { chains } from "../utils/contants";
import { red } from "kolorist";

const sourceDirPath = path.join(__dirname, "../pages/apps/");
const targetPath = path.join(__dirname, "./app_list.json");
const mdTargetPath = path.join(__dirname, "./app_index.md");
let appList: Web3ToolsApp[] = [];

function _sortByName(items: any[]) {
  return items.sort((a, b) => {
    const nameA = a.chain.name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.chain.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}

const readApps = async () => {
  const files = await fs.promises.readdir(sourceDirPath);
  for (const file of files) {
    const filePath = path.join(sourceDirPath, file);
    const chainFiles = await fs.promises.readdir(filePath);
    for (const appDir of chainFiles) {
      const appPath = path.join(filePath, appDir);
      const manifestPath = path.join(appPath, "manifest.json");
      const data = await import(manifestPath);
      if (!data) {
        throw new Error(red("✖") + `Manifest not fount in ${appPath}`);
      }
      const chain = chains.find((c) => c.name.toLowerCase() === file.toLowerCase());
      if (!chain) {
        throw new Error(red("✖") + `Chain not fount in ${appPath}`);
      }
      const app = {
        name: data.name,
        id: data.id,
        chain,
        path: `/apps/${file}/${appDir}`
      };
      appList.push(app);
      appList = appList.sort((a, b) => a.id - b.id);
    }
  }
  const config = path.join(__dirname, "../.prettierrc");
  const text = fs.readFileSync(config, "utf8");
  let appIndex = "# Helpers Index \n |Chain|Name|Link|Source code|\n |--|--|--|--|";
  _sortByName(appList).forEach(
    (app) =>
      (appIndex += `\n|${app.chain.name}|${app.name}|[Use](https://web3helpers.xyz${app.path})|[Code](pages${app.path})|`)
  );
  prettier.resolveConfig(text).then((options) => {
    const formatted = prettier.format(JSON.stringify(appList), { ...options, parser: "json" });
    fs.writeFile(targetPath, formatted, () => {});
    const formattedIndex = prettier.format(appIndex, { ...options, parser: "markdown" });
    fs.writeFile(mdTargetPath, formattedIndex, () => {});
  });
};

readApps().catch((err) => console.log(err));
