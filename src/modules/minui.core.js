class MinuiFramework {
  constructor(rootElement) {
    this.rootElement = document.querySelector("#app");
    this.eventTargets = [];
    this.renderTimes = [];
    this.dynamicTargets = [];

    // this.lastRender = {};
  }

  initalize_event_listeners() {
    this.eventTargets.forEach(event => {
      document.addEventListener(event.type, e => {
        if (e.target.getAttribute("data") == event.target) {
          event.func(event.funcParams[2]);
          // console.log(event.funcParams);
        }
      });
    });
  }
  generate_hash() {
    var result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 7; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  target(targetName) {
    let targetHash;
    for (let i = 0; i < this.dynamicTargets.length; i++) {
      if (this.dynamicTargets[i].targetName == targetName) {
        targetHash = this.dynamicTargets[i].targetAttr;
      }
    }
    return document.querySelector(`[data='${targetHash}']`);
  }
  proccess_html(view_html, data, functions) {
    //TARGET PROCCESSIGN

    const targets = view_html.match(/:target="(.*?)"/g);
    if (/:target="(.*?)"/g.test(view_html)) {
      for (let i = 0; i < targets.length; i++) {
        var targetName = targets[i].match(/:target="(.*?)"/)[1];
        var targetHash = this.generate_hash();
        view_html = view_html.replace(/:target="(.*?)"/, "data=" + targetHash);
        this.dynamicTargets.push({
          targetName: targetName,
          targetAttr: targetHash
        });
      }
    }

    //DATA PROCCESSING

    var varMatches = view_html.match(/{\s\$(.*?)\s}/g);
    if (/{\s\$(.*?)\s}/g.test(view_html)) {
      for (let i = 0; i < varMatches.length; i++) {
        const variableMatch = varMatches[i].match(/{\s\$(.*?)\s}/);
        view_html = view_html.replace(variableMatch[0], eval(variableMatch[1]));
      }
    }

    //EVENT PROCCESSING

    var clickMatches = view_html.match(/:click="(.*?)"/g);
    if (/:click="(.*?)"/g.test(view_html)) {
      for (let i = 0; i < clickMatches.length; i++) {
        var functionTrigger = clickMatches[i].match(/:click="(.*?)"/)[1];
        var dataName = this.generate_hash();
        view_html = view_html.replace(
          clickMatches[i],
          "data='" + dataName + "'"
        );
        // if (!functions === undefined) {
        this.eventTargets.push({
          target: dataName,
          type: "click",
          func: functions[functionTrigger.replace(/\((.*?)\)/, "")],
          funcParams: functionTrigger.match(/(.*?)\((.*?)\)/)
        });

        // } else {
        //   this.eventTargets.push({
        //     target: dataName,
        //     type: "click"
        //   });
        // }
      }
    }
    return view_html;
  }

  render(domObj, dataObj, functionObj) {
    this.rootElement.innerHTML = this.proccess_html(
      domObj,
      dataObj,
      functionObj
    );
    this.initalize_event_listeners();
  }
}
export default MinuiFramework;
