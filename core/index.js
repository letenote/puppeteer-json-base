import puppeteer from "puppeteer";
import { getScriptInformation } from "./readFiles/index.js";
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
  const getInfo = await getScriptInformation();
  const browser = await puppeteer.launch({
    headless: getInfo.headless,
    devtools: getInfo.devtools,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
  });

  console.info("===== ✨ SCENARIO:TEST ✨ =====");
  console.info(`Name: ${json.name}`);
  console.info(`Date: ${DateTime.format(new Date())}`);
  console.info(`Source: './${fileDir}'`);
  console.info(`Output: './${outputDir}'`);

  for await (let scenario of Object.keys(json)) {
    let scenarioName = json.name;
    if (scenario === "scenario") {
      console.info("===== ✨ ACTION ✨ =======");
      for await (const [scenarioIndex, scenario] of json.scenario.entries()) {
        const getUrl = getUrlByTribeName(scenario.props?.url || "");
        console.info(
          "✅",
          `${scenarioIndex + 1}.`,
          // scenario.action,
          logByAction({
            scenarioName,
            action: scenario.action,
            props: scenario.props,
            url: getUrl,
            outputDir,
          })
        );
        await actions({
          page,
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
};
