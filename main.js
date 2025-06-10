import { readFiles, getPath } from "./core/readFiles/index.js";
import { core } from "./core/index.js";
import fs from "fs";

export const main = async ({ source }) => {
  try {
    let counter = 0;
    const allFiles = await readFiles(source);
    console.info("===== 🔥🔥 START:ALL:SCENARIO:TEST 🔥🔥 =====", "\n");
    for await (let [fileIndex, file] of allFiles.entries()) {
      counter = fileIndex + 1;
      const getFile = await fs.promises.readFile(file, "utf8");
      const getOutputPath = getPath(file);
      await fs.promises.mkdir(`./${getOutputPath.outputDir}`, {
        recursive: true,
      });
      await core({
        json: JSON.parse(getFile),
        inputDir: getOutputPath.inputDir,
        outputDir: getOutputPath.outputDir,
        isLastJob: counter === allFiles.length,
        fileDir: file,
      });
    }
    console.info("===== 🔥🔥 END:ALL:SCENARIO:TEST 🔥🔥 =====", "\n");
  } catch (err) {
    console.error("Error test:", err);
  }
};
