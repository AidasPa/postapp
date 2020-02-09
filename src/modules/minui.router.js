import MinuiFramework from "../modules/minui.core";

if (typeof Array.prototype.reIndexOf === "undefined") {
  Array.prototype.reIndexOf = function(rx) {
    for (var i in this) {
      if (this[i].toString().match(rx)) {
        return i;
      }
    }
    return -1;
  };
}

class MinuiRouter extends MinuiFramework {
  constructor(routes) {
    super();
    this.appRoutes = routes;
    this.routeData = {};
    this.initialize_router();
    window.onpopstate = (e) => {
      console.log(e.state)
      this.route_and_render(e.state.path);
    }
  }

  initialize_router() {
    let errorsIndex = 0;
    for (var routeName in this.appRoutes) {
      var pathMatch = new RegExp(
        "^" + this.appRoutes[routeName].path.replace(/:(.*)/, "(.*)") + "$"
      );
      console.log(pathMatch, window.location.pathname);
      if (pathMatch.test(window.location.pathname)) {
        if (/:(.*?)/.test(this.appRoutes[routeName].path)) {
          const nthVariable = this.appRoutes[routeName].path
            .split("/")
            .reIndexOf(/:(.*?)/);
          const variableName = this.appRoutes[routeName].path.match(
            /\:(.*)/
          )[1];
          this.routeData = {
            params: {
              [variableName]: window.location.pathname.split("/")[nthVariable]
            }
          };
          this.render(
            this.appRoutes[routeName].renderView(this.routeData).html(),
            { route: this.routeData },
            this.appRoutes[routeName].renderView(this.routeData).func()
          );
          this.appRoutes[routeName].onload(this.routeData);
        } else {
          this.render(
            this.appRoutes[routeName].renderView.html(),
            {},
            this.appRoutes[routeName].renderView.func()
          );
          this.appRoutes[routeName].onload();

          // if(!this.appRoutes[routeName].onload === undefined) {
          // this.appRoutes[routeName].onload().then(resp => {
          //   console.log(resp)
          // })
          // }
        }
        break;
      } else {
        errorsIndex++;
        if (errorsIndex == Object.keys(this.appRoutes).length) {
          console.error("404: Route Not Found!");
          break;
        }
      }
    }
  }
  route_and_render(path) {
    this.renderTimes.push(path);

   history.pushState({ path: path }, path, path);
    this.initialize_router();
  }
}
export default MinuiRouter;
