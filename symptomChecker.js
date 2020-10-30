const electron = require("electron");
const path = require("path");
const browserWindow = electron.remote.BrowserWindow;

const ipc = require("electron").ipcMain;
document.getElementById("btn"),
  addEventListener("click", function () {
    let modalPath = path.join("file://", __dirname, "index.html");
    let win = new browserWindow({
      width: 500,
      height: 300,
      frame: true,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    });

    win.on("close", function () {
      win = null;
    });
    win.loadURL(modalPath);
    win.show();
  });

ipc.on("update-feature", function (event, arg) {
  win.webContents.send("updateFeatureSelectionList", arg);
});
