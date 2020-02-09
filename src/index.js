import MinuiFramework from "./modules/minui.core";
import "./assets/app.css";
import routes from "./routes.js";
import MinuiRouter from "./modules/minui.router";

const route = new MinuiRouter(routes);
window.route = route;

const app = new MinuiFramework("#app");

export { route, app };
