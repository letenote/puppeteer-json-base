export const actions = async ({ page, scenarioName, action, props }) => {
  switch (action) {
    case "goto":
      await page.goto(props.path);
      return Promise.resolve();
    case "screenshot":
      await page.screenshot({
        path: `${scenarioName.split(" ").join("-")}.png`,
      });
      return Promise.resolve();
    default:
      return Promise.resolve();
  }
};
