import { main } from "./main.js";

main({
  source: {
    /**
     * :: dev mode
     * single file, example => "scenario/portal-pmn-prod/login-failed-invalid-password.json",
     * multiple file, example => "./scenario/portal-pmn-prod"
     */
    dev: "scenario/portal-pmn-prod/login-failed-invalid-password.json",
    all: "./scenario",
  },
});
