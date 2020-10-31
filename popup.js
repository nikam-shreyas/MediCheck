const electron = require("electron");

const ipc = electron.ipcRenderer;

document
  .getElementById("updateBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let val = document.getElementById("fetchFeature").value;
    if (document.getElementById("feature").value != "categorical") {
      let min = Number(
        document.getElementById("fetchFeature").getAttribute("min")
      );
      let max = Number(
        document.getElementById("fetchFeature").getAttribute("max")
      );
      val = Number(val);
      if (val > max || val < min) {
        document.getElementById("updateBtn").classList.remove("btn-primary");
        document.getElementById("updateBtn").classList.add("btn-danger");
        document.getElementById("errMsg").innerHTML =
          "Value must be between <b>" + min + "</b> and <b>" + max + "</b>";
      } else {
        let featureList = ipc.send("update-feature", val);
        electron.remote.getCurrentWindow().close();
      }
    } else {
      let featureList = ipc.send("update-feature", val);
      electron.remote.getCurrentWindow().close();
    }
  });
