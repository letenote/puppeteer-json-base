import { Slugify } from "../helpers/slugify.js";
import { ACTION } from "./types.js";
export const actions = async ({
  page = {
    goto: async () => Promise.resolve(),
    screenshot: async () => Promise.resolve(),
    waitForSelector: async () => Promise.resolve(),
    type: async () => Promise.resolve(),
    click: async () => Promise.resolve(),
  },
  scenarioName = "",
  outputDir = "",
  action = "",
  props: { url = "", selector = "", value = "" } = {},
} = {}) => {
  switch (action) {
    case ACTION.GOTO:
      await page.goto(url);
      return Promise.resolve();
    case ACTION.SCREENSHOT:
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.screenshot({
        path: `./${outputDir}/${Slugify(scenarioName)}.png`,
      });
      return Promise.resolve();
    case ACTION.TYPE:
      await page.waitForSelector(selector);
      await page.type(selector, value, { delay: 100 });
      return Promise.resolve();
    case ACTION.CLICK:
      await page.waitForSelector(selector);
      await page.click(selector);
      return Promise.resolve();
    default:
      return Promise.resolve();
  }
};

export const logByAction = ({
  scenarioName = "",
  action = "",
  props: { label = "???", value = "" } = {},
  url = "",
  outputDir = "",
} = {}) => {
  switch (action) {
    case ACTION.GOTO:
      return `${ACTION.GOTO} => ${url}`;
    case ACTION.SCREENSHOT:
      return `${ACTION.SCREENSHOT} => output-dir => './${outputDir}/${Slugify(
        scenarioName
      )}.png'`;
    case ACTION.TYPE:
      return `${ACTION.TYPE} ${label !== "" && "=> " + label} => ${value}`;
    case ACTION.CLICK:
      return `${ACTION.CLICK} ${label !== "" ? "=> " : ""} ${label}`;
    case ACTION.DONE:
      return `done 😎`;
    default:
      return action;
  }
};
