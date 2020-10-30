const electron = require("electron");
const path = require("path");
const ipc = electron.ipcRenderer;

// BrowserWindow Instance is a part of the Main Process,
// To fetch its instance from the Main Process,
// Use electron.remote
const BrowserWindow = electron.remote.BrowserWindow;

var update = document.getElementById("value");
var button = document.getElementById("new");

button.addEventListener("click", function (event) {
  // Linking to new-window.html
  const newPath = path.join("file://", __dirname, "new-window.html");
  let win = new BrowserWindow({
    // To display the Default Frame of the Window
    // consisting of default Menu
    frame: true,

    // Makes the Renderer Window Sticky,
    // Will always stay on top despite focus change
    alwaysOnTop: true,
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Destroy the BrowserWindow Instance on close
  win.on("close", function () {
    win = null;
  });

  // win.webContents.openDevTools();
  win.loadURL(newPath);
  win.show();
});
let list = [];
// Using the ipcRenderer.on() method
// Implementing the Callback Function for Asynchronous IPC,
// To receive the data based on the key set in the main.js file
ipc.on("updateValue", function (event, arg) {
  console.log(arg);

  // Updating the value of the HTML Tag with the Data Received
  // In Case the Data Received is not a Number and is
  // some arbitary Value,display will show as NaN (Not a Number)
  list.push(arg);
  console.log(list);
  h = "<ul>";
  list.forEach((element) => {
    h += "<li>" + element + "</li>";
  });
  h += "</ul>";
  update.innerHTML = h;
});
