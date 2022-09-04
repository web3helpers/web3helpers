#!/usr/bin/env ts-node

import path from "path";
import fs from "fs";
import { Web3ToolsApp } from "types";
import { chains } from "../utils";

const sourceDirPath = path.join(__dirname, "../pages/apps/");
const targetPath = path.join(__dirname, "./app_list.json");
const appList: Web3ToolsApp[] = [];

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
        throw new Error(`Manifest not fount in ${appPath}`);
      }
      const chain = chains.find(
        (c) => c.name.toLowerCase() === file.toLowerCase()
      );
      if (!chain) {
        throw new Error(`Chain not fount in ${appPath}`);
      }
      const app = {
        name: data.name,
        chain,
        path: `/apps/${file}/${appDir}`,
      };
      appList.push(app);
    }
  }
  fs.writeFile(targetPath, JSON.stringify(appList), () => {});
};

readApps().catch((err) => console.log(err));
