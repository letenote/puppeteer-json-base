import puppeteer from "puppeteer";
import { actions } from "./actions/index.js";
const json = {
  name: "open browser google",
  scenario: [
    {
      action: "goto",
      props: {
        path: "https://google.com",
      },
    },
    {
      action: "screenshot",
    },
    {
      action: "done",
    },
  ],
};

export const core = async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: false });
  console.info("===== SCENARIO =====");
  console.info(json.name);
  for await (let scenario of Object.keys(json)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    let scenarioName = json.name;

    if (scenario === "scenario") {
      console.info("===== ACTION =======");
      for await (const [scenarioIndex, scenario] of json.scenario.entries()) {
        console.info(`${scenarioIndex + 1}.`, scenario.action);
        await actions({
          page,
          scenarioName,
          action: scenario.action,
          props: scenario.props,
        });
      }
    }
  }

  await browser.close();
};
