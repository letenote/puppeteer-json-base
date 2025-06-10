import fs from "fs";
import path from "path";

const readFilesRecursively = async (directory) => {
  let results = [];
  const items = await fs.promises.readdir(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = await fs.promises.stat(itemPath);

    if (stat.isDirectory()) {
      results = results.concat(await readFilesRecursively(itemPath)); // Recursively call for subdirectories
    } else {
      results.push(itemPath);
    }
  }
  return results;
};

const readHeadless = (val) => {
  switch (val) {
    case "headless":
      return true;
    default:
      return false;
  }
};

export const getPath = (filePath) => {
  const parts = filePath.split("/");
  parts.pop();
  const pathMapping = {
    inputDir: JSON.parse(JSON.stringify(parts)),
    outputDir: JSON.parse(JSON.stringify(parts)),
  };
  pathMapping.outputDir[0] = "output";
  return {
    inputDir: pathMapping.inputDir.join("/"),
    outputDir: pathMapping.outputDir.join("/"),
  };
};

export const getScriptInformation = async () => {
  const getEvent = process.env["npm_lifecycle_event"] || "";
  const _event = getEvent.split(":");
  return {
    tribe: "",
    headless: readHeadless(_event?.[1] || ""),
    devtools: false,
  };
};

export const readFiles = async () => {
  try {
    const folderPath = "./scenario";
    const allFiles = await readFilesRecursively(folderPath);

    return allFiles;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};
