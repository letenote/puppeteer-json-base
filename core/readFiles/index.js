import fs from "fs";
import path from "path";

const readFilesRecursively = async (directory) => {
  let results = [];
  const items = await fs.promises.readdir(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = await fs.promises.stat(itemPath);

    if (stat.isDirectory()) {
      results = results.concat(await readFilesRecursively(itemPath));
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

export const getPath = (filePath = "") => {
  const filePathClean = filePath.replaceAll("\\", "/");
  const parts = filePathClean.split("/");
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

const getEventName = () => process.env["npm_lifecycle_event"] || "";
const isDevMode = () => {
  switch (getEventName()) {
    case "dev":
      return true;
    default:
      return false;
  }
};

export const getScriptInformation = async () => {
  const getEvent = getEventName();
  const _event = getEvent.split(":");
  return {
    tribe: "",
    headless: readHeadless(_event?.[1] || ""),
    devtools: false,
  };
};

export const readFiles = async (source = { dev: "", all: "" }) => {
  try {
    if (isDevMode() && source.dev.includes(".json")) {
      return [source.dev.replace("./", "")];
    }
    const getSource = isDevMode() ? source.dev : source.all;
    const allFiles = await readFilesRecursively(getSource);
    return allFiles;
  } catch (err) {
    console.error("Error reading directory:", err);
  }
};

export const getFileNameByFileDir = (fileDir = "") => {
  try {
    const fileDirClean = fileDir.replaceAll("\\", "/");
    const fileDirSplit = fileDirClean.split("/");
    const fileName = fileDirSplit[fileDirSplit.length - 1].replace(".json", "");
    return fileName;
  } catch (error) {
    console.error("Error Get Filename:", error);
  }
};
