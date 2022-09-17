#!/usr/bin/env ts-node

import path from "path";
import fs from "fs";
import prettier from "prettier";
import { Web3ToolsApp } from "types";
import { chains } from "../utils";
import { red } from "kolorist";

const sourceDirPath = path.join(__dirname, "../pages/apps/");
const targetPath = path.join(__dirname, "./app_list.json");
let appList: Web3ToolsApp[] = [];

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
  prettier.resolveConfig(text).then((options) => {
    const formatted = prettier.format(JSON.stringify(appList), { ...options, parser: "json" });
    fs.writeFile(targetPath, formatted, () => {});
  });
};

readApps().catch((err) => console.log(err));
