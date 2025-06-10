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
      await page.screenshot({
        path: `./${outputDir}/${scenarioName.split(" ").join("-")}.png`,
      });
      return Promise.resolve();
    default:
      return Promise.resolve();
  }
};
