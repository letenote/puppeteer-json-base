import puppeteer from "puppeteer";
import { getScriptInformation } from "./readFiles/index.js";
import { actions } from "./actions/index.js";
import { getUrlByTribeName } from "../env/index.js";

export const core = async ({ json, inputDir, outputDir }) => {
  const getInfo = await getScriptInformation();
  const browser = await puppeteer.launch({
    headless: getInfo.headless,
    devtools: getInfo.devtools,
  });

  console.info("===== ✨ SCENARIO:TEST ✨ =====");
  console.info("Name:", json.name);
  console.info("Source:", inputDir);
  console.info("Output:", outputDir);

  for await (let scenario of Object.keys(json)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    let scenarioName = json.name;
    if (scenario === "scenario") {
      console.info("===== ✨ ACTION ✨ =======");
      for await (const [scenarioIndex, scenario] of json.scenario.entries()) {
        const getUrl = getUrlByTribeName(scenario.props?.url || "");
        console.info(
          "✅",
          `${scenarioIndex + 1}.`,
          scenario.action,
          scenario.action === "goto" ? `=> ${getUrl}` : ""
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
