import path from "node:path";
import fs from "node:fs";
import prompts from "prompts";
import prettier from "prettier";
import { red, green, yellow, blue, magenta } from "kolorist";

async function init() {
  let targetDir = path.join(__dirname, "../pages/apps");
  let result: prompts.Answers<"chain" | "helperName" | "displayName" | "description">;
  let name;
  try {
    result = await prompts(
      [
        {
          type: "select",
          name: "chain",
          message: "Helper chain\n",
          choices: [
            {
              title: yellow("Evm based chain"),
              value: "evm"
            },
            {
              title: blue("Filecoin"),
              value: "filecoin"
            },
            {
              title: magenta("Solana"),
              value: "solana"
            },
            {
              title: green("Substrate"),
              value: "subtrate"
            }
          ]
        },
        {
          type: "text",
          name: "helperName",
          message: "Helper name\n",
          initial: "",
          validate: (value) => (isValidHelperName(value) ? true : "Invalid helper name"),
          onState: (state) => (name = state.value)
        },
        {
          type: "text",
          name: "displayName",
          message: "Display name\n",
          validate: (value) => (isValidHelperDisplayName(value) ? true : "Invalid display name"),
          initial: () => convertHelperName(name)
        },
        {
          type: "text",
          name: "description",
          message: "Description\n",
          initial: ""
        }
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        }
      }
    );

    const sourcePath = path.join(__dirname, "./helper-template");
    const { description, chain, helperName, displayName } = result;
    const randomId = Array.from({ length: 6 }, () => getRandomInt(10)).join("");
    targetDir = path.join(targetDir, `/${chain}/${helperName}`);
    const manifest = {
      name: displayName,
      description,
      chain,
      id: parseInt(randomId)
    };
    if (isNotEmpty(targetDir)) throw new Error(red("✖") + "Direction existed");

    copyDir(sourcePath, targetDir);
    const manifestPath = path.join(targetDir, "./manifest.json");

    const config = path.join(__dirname, "../.prettierrc");
    const text = fs.readFileSync(config, "utf8");
    prettier.resolveConfig(text).then((options) => {
      const formatted = prettier.format(JSON.stringify(manifest), { ...options, parser: "json" });
      fs.writeFile(manifestPath, formatted, () => {});
    });
    console.log(green("🎉 Successfully\n") + `New helper at ${targetDir}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return;
  }

  function copy(src: string, dest: string) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      copyDir(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
  }

  function copyDir(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true });
    for (const file of fs.readdirSync(srcDir)) {
      const srcFile = path.resolve(srcDir, file);
      const destFile = path.resolve(destDir, file);
      copy(srcFile, destFile);
    }
  }
}

function getRandomInt(value: number) {
  return Math.floor(Math.random() * value);
}

function isNotEmpty(path: string) {
  try {
    const files = fs.readdirSync(path);
    return files && files.length !== 0;
  } catch (error) {
    return false;
  }
}

function convertHelperName(name: string) {
  return name
    .split("-")
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1))
    .join(" ");
}

function isValidHelperName(name: string) {
  return /^[a-z0-9]+[a-z0-9-]*$/.test(name);
}
function isValidHelperDisplayName(name: string) {
  return /^([A-Z0-9][a-z0-9]*)( [A-Z0-9][a-z0-9]*)*$/.test(name);
}

init().catch((e) => {
  console.error(e);
});
