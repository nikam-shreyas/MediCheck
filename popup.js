const electron = require("electron");

const ipc = electron.ipcRenderer;

document
  .getElementById("updateBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let featureList = ipc.send(
      "update-feature",
      document.getElementById("fetchFeature").value
    );
    electron.remote.getCurrentWindow().close();
  });
