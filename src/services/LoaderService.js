const loader = action => {
  const loaderElement = document.getElementById("load");
  switch (action) {
    case true:
      loaderElement.style.display = "block";
      loaderElement.style.opacity = 1;
      break;
    case false:
      loaderElement.style.opacity = 0;
      setTimeout(() => {
        loaderElement.style.display = "none";
      }, 300);
      break;
  }
};

export default loader;
