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
  fileName = "",
  outputDir = "",
  action = "",
  props: {
    url = "",
    selector = "",
    value = "",
    timeout = 90000,
    request = "",
    duration = 1000,
    requests = [],
  } = {},
} = {}) => {
  switch (action) {
    case ACTION.GOTO:
      await page.goto(url, { waitUntil: "networkidle2", timeout: timeout });
      return Promise.resolve();
    case ACTION.SCREENSHOT:
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.screenshot({
        path: `./${outputDir}/${fileName}.png`,
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
    case ACTION.WAIT_FOR_SELECTOR_IMG_SMALL:
      await page.waitForSelector(selector, { timeout: 1000, visible: true });
      return Promise.resolve();
    case ACTION.WAIT_FOR_SELECTOR_IMG_MEDIUM:
      await page.waitForSelector(selector, { timeout: 5000, visible: true });
      return Promise.resolve();
    case ACTION.WAIT_FOR_SELECTOR_IMG_LARGE:
      await page.waitForSelector(selector, { timeout: 10000, visible: true });
      return Promise.resolve();
    case ACTION.WAIT_FOR_RESPONSE:
      await page.waitForResponse(request, { signal: 0, timeout });
      return Promise.resolve();
    case ACTION.WAIT:
      await new Promise((resolve) => setTimeout(resolve, duration));
      return Promise.resolve();
    case ACTION.SET_OFFLINE_MODE:
      await page.setOfflineMode(true);
      return Promise.resolve();
    case ACTION.REQUEST_ABORT:
      await page.setRequestInterception(false);
      await page.on("request", (iterceptedRequest) => {
        if (requests.includes(iterceptedRequest.url())) {
          iterceptedRequest.abort();
          return;
        }
        return iterceptedRequest.continue();
      });
      return Promise.resolve();
    default:
      return Promise.resolve();
  }
};

export const logByAction = ({
  startTime = 0,
  scenarioName = "",
  fileName = "",
  action = "",
  props: { label = "???", value = "" } = {},
  url = "",
  outputDir = "",
} = {}) => {
  switch (action) {
    case ACTION.GOTO:
      return `${ACTION.GOTO} => ${url}`;
    case ACTION.SCREENSHOT:
      return `${ACTION.SCREENSHOT} => output-dir => './${outputDir}/${fileName}.png'`;
    case ACTION.TYPE:
      return `${ACTION.TYPE} ${label !== "" && "=> " + label} => ${value}`;
    case ACTION.CLICK:
      return `${ACTION.CLICK} ${label !== "" ? "=> " : ""} ${label}`;
    case ACTION.DONE:
      const endTime = performance.now();
      return `done 😎 => in ${Math.ceil(endTime - startTime)} milliseconds`;
    default:
      return action;
  }
};
