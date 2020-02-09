import Home from "./screen/views/Home";
import Navbar from "./screen/components/Navbar";
import Error from "./screen/views/Error";

import { route } from "./index";

class App {
  constructor(params) {
    this.routerView = params.view;
  }
  func() {
    return {
      page: path => {
        route.route_and_render(path); //works
      },
      sort_table: n => {
        var table,
          rows,
          switching,
          i,
          x,
          y,
          shouldSwitch,
          dir,
          switchcount = 0;
        table = route.target("tableRoot");
        switching = true;
        dir = "asc";

        while (switching) {
          switching = false;
          rows = table.rows;

          for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;

            x = rows[i].getElementsByTagName("td")[n];
            y = rows[i + 1].getElementsByTagName("td")[n];

            if (dir == "asc") {
              if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
              }
            } else if (dir == "desc") {
              if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
              }
            }
          }
          if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
          } else {
            if (switchcount == 0 && dir == "asc") {
              dir = "desc";
              switching = true;
            }
          }
        }
      }
    };
  }
  html() {
    return `
    ${Navbar({
      appName: "PostAPP"
    })}
    <div id="load" class="loaderWrapper">
      <div class="loader"></div>
    </div>
    <div style="display:none" :target="errorTarget">
      ${Error.err(500, "Something went wrong! Perhaps a wrong request?")}
    </div>
    <div style="display:block" :target="pageContentCont" class="pageContent">
      ${this.routerView}
    </div>
    `;
  }
}
export default App;
