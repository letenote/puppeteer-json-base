import puppeteer from "puppeteer";
import {
  getScriptInformation,
  getFileNameByFileDir,
} from "./readFiles/index.js";
import { actions, logByAction } from "./actions/index.js";
import { getUrlByTribeName } from "../env/index.js";
import { DateTime } from "./helpers/dateTime.js";

export const core = async ({
  json,
  inputDir = "",
  outputDir = "",
  fileDir = "",
  isLastJob = false,
}) => {
  const startTime = performance.now();
  const getInfo = await getScriptInformation();
  const browser = await puppeteer.launch({
    headless: getInfo.headless,
    devtools: getInfo.devtools,
    userDataDir: "dev/null",
  });
  const page = await browser.newPage();
  await page.setRequestInterception(false);
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });

  try {
    console.info("===== ✨ SCENARIO:TEST ✨ =====");
    console.info(`Name: ${json.name}`);
    console.info(`Date: ${DateTime.format(new Date())}`);
    console.info(`Source: './${fileDir}'`);
    console.info(`Output: './${outputDir}'`);

    for await (let scenario of Object.keys(json)) {
      let scenarioName = json.name;
      scenario === "name" &&
        console.info(`Expect: ${json?.["expect"] || "??"}`);
      if (scenario === "scenario") {
        console.info("===== ✨ ACTION ✨ =======");
        for await (const [scenarioIndex, scenario] of json.scenario.entries()) {
          const getUrl = getUrlByTribeName(scenario.props?.url || "");
          const getFileName = getFileNameByFileDir(fileDir);
          console.info(
            "✅",
            `${scenarioIndex + 1}.`,
            logByAction({
              startTime,
              scenarioName,
              fileName: getFileName,
              action: scenario.action,
              props: scenario.props,
              url: getUrl,
              outputDir,
            })
          );
          await actions({
            page,
            fileName: getFileName,
            scenarioName,
            outputDir,
            action: scenario.action,
            props: {
              ...scenario.props,
              url: getUrl,
            },
          });
        }
      }
    }
    await browser.close();
    console.info("\n");
  } catch (error) {
    await browser.close();
    console.error("Error Action", error);
  }
};
