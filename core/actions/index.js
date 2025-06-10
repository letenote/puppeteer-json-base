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
  props = {
    url: "",
    selector: "",
    value: "",
  },
}) => {
  switch (action) {
    case ACTION.GOTO:
      await page.goto(props.url);
      return Promise.resolve();
    case ACTION.SCREENSHOT:
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.screenshot({
        path: `./${outputDir}/${Slugify(scenarioName)}.png`,
      });
      return Promise.resolve();
    case ACTION.TYPING:
      await page.waitForSelector(props.selector);
      await page.type(props.selector, props.value, { delay: 100 });
      return Promise.resolve();
    case ACTION.CLICK:
      await page.waitForSelector(props.selector);
      await page.click(props.selector);
      return Promise.resolve();
    default:
      return Promise.resolve();
  }
};

export const logByAction = ({
  scenarioName = "",
  action = "",
  props = { label: "", value: "" },
  url = "",
  outputDir = "",
}) => {
  switch (action) {
    case ACTION.GOTO:
      return `${ACTION.GOTO} => ${url}`;
    case ACTION.SCREENSHOT:
      return `${ACTION.SCREENSHOT} => output-dir => './${outputDir}/${Slugify(
        scenarioName
      )}.png'`;
    case ACTION.TYPING:
      return `typing ${props.label !== "" && "=> " + props.label} => ${
        props.value
      }`;
    case ACTION.CLICK:
      return `${ACTION.CLICK} ${props.label !== "" && "=> " + props.label}`;
    case ACTION.DONE:
      return `done 😎`;
    default:
      return action;
  }
};
