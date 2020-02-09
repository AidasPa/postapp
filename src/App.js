import Home from "./screen/views/Home";
import Navbar from "./screen/components/Navbar";

import { route } from "./index";

class App {
  constructor(params) {
    this.routerView = params.view;
  }
  func() {
    return {
      page: path => {
        route.route_and_render(path); //works
      }
    };
  }
  html() {
    // console.log()
    return `
    ${Navbar({
      appName: "PostAPP"
    })}
    <div id="load" class="loaderWrapper">
      <div class="loader"></div>
    </div>
    <div class="pageContent">
    ${this.routerView}
    </div>
    `;
  }
}
export default App;
