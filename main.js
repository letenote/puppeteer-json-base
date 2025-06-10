import { readFiles, getPath } from "./core/readFiles/index.js";
import { core } from "./core/index.js";
import fs from "fs";

const main = async () => {
  try {
    const allFiles = await readFiles();
    for await (let file of allFiles) {
      const getFile = await fs.promises.readFile(file, "utf8");
      const getOutputPath = getPath(file);
      await fs.promises.mkdir(`./${getOutputPath.outputDir}`, {
        recursive: true,
      });
      await core({
        json: JSON.parse(getFile),
        inputDir: getOutputPath.inputDir,
        outputDir: getOutputPath.outputDir,
      });
    }
  } catch (err) {
    console.error("Error test:", err);
  }
};

main();
