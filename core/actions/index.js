export const actions = async ({
  page,
  scenarioName,
  outputDir,
  action,
  props,
}) => {
  switch (action) {
    case "goto":
      await page.goto(props.url);
      return Promise.resolve();
    case "screenshot":
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.screenshot({
        path: `./${outputDir}/${scenarioName.split(" ").join("-")}.png`,
      });
      return Promise.resolve();
    case "type":
      await page.waitForSelector(props.selector);
      await page.type(props.selector, props.value, { delay: 100 });
      return Promise.resolve();
    case "click":
      await page.waitForSelector(props.selector);
      await page.click(props.selector);
      return Promise.resolve();
    default:
      return Promise.resolve();
  }
};
