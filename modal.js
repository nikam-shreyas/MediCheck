const electron = require("electron");
const path = require("path");
const builder = require("./builder.js");
const eapi = require("./endlessapi.js");
eapi.initSession();
setTimeout(eapi.acceptTermsOfUse, 2000);
const BrowserWindow = electron.remote.BrowserWindow;
const popupBtn = document.getElementById("popupBtn");

const ipc = electron.ipcRenderer;
let symptom = 0;
let selectionList = {};
symptomsList = builder.titles;
symptoms = "";
for (let i = 0; i < symptomsList.length; i++) {
  const element = symptomsList[i];
  symptoms += "<option value='" + i + "'>" + element + "</option>";
}
document.getElementById("symptoms").innerHTML = symptoms;
popupBtn.addEventListener("click", function () {
  symptom = Number(document.getElementById("symptoms").value);

  const modalPath = path.join(
    "file://",
    __dirname,
    "files/" + symptom + ".html"
  );

  let win = new BrowserWindow({
    width: 500,
    height: 300,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.removeMenu();

  win.on("close", function () {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

function leaf(obj, path, value) {
  const pList = path.split(".");
  const key = pList.pop();
  const pointer = pList.reduce((accumulator, currentValue) => {
    if (accumulator[currentValue] === undefined) accumulator[currentValue] = {};
    return accumulator[currentValue];
  }, obj);
  pointer[key] = value;
  return obj;
}

ipc.on("updateFeatureSelectionList", function (event, arg) {
  let fetchedVal = Number(arg);
  let element = builder.convert_data[symptom];
  eapi.updateFeature(element["name"], fetchedVal);
  let displayText =
    "<small><div class='row'><div class='col-sm-9'><b>" +
    element["text"] +
    ": </b> </div><div class='col-sm-3'>";
  if (element["type"] == "categorical") {
    displayText += element["choices"][fetchedVal - 1]["text"];
  } else {
    displayText += fetchedVal;
  }
  displayText += "</div></div></small>";

  let c = element["category"] + "." + symptom;
  leaf(selectionList, c, displayText);

  let sl = "";
  for (const k in selectionList) {
    if (selectionList.hasOwnProperty(k)) {
      const element = selectionList[k];
      sl += "<button class='btn btn-sm btn-block btn-light'>" + k + "</button>";
      for (const key in element) {
        if (element.hasOwnProperty(key)) {
          const el = element[key];
          sl += el;
        }
      }
    }
  }
  document.getElementById("selectionList").innerHTML = sl;
});

document.getElementById("teamInfoBtn").addEventListener("click", function () {
  const modalPath = path.join("file://", __dirname, "teaminfo.html");

  let win = new BrowserWindow({
    width: 600,
    height: 300,
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.removeMenu();

  win.on("close", function () {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});
document.getElementById("analyzeBtn").addEventListener("click", function () {
  if (Object.keys(selectionList).length == 0) {
    document.getElementById("analysis").innerHTML =
      '<br /><div class="alert alert-danger">You need to update your <b>history</b> and/or <b>symptoms</b> first.</div>';
  } else {
    eapi.analyze();
  }
});

document.getElementById("suggestBtn").addEventListener("click", function () {
  let win = new BrowserWindow({
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.removeMenu();

  win.on("close", function () {
    win = null;
  });
  win.loadURL(
    "https://www.google.com/search?sxsrf=ALeKk03DeWAm3YWVBEQTYWleXXn95IDZNg%3A1604042134746&ei=lr2bX4OWLaLhz7sPo6GpiA8&q=doctors+near+me&oq=doctors+near+me&gs_lcp=CgZwc3ktYWIQAzIICAAQsQMQkQIyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgAEEc6BAgjECc6DQgAELEDEMkDEBQQhwI6BQgAEJIDOgQIABBDOgoILhDHARCjAhBDOgcIABAUEIcCUNYbWPMkYL4maABwA3gBgAGTAogB_wuSAQUwLjUuM5gBAKABAaoBB2d3cy13aXrIAQjAAQE&sclient=psy-ab&ved=0ahUKEwiDuZXN4tvsAhWi8HMBHaNQCvEQ4dUDCA0&uact=5"
  );
  win.show();
});

document.getElementById("hospitalBtn").addEventListener("click", function () {
  let win = new BrowserWindow({
    frame: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  win.removeMenu();

  win.on("close", function () {
    win = null;
  });
  win.loadURL(
    "https://www.google.com/search?q=hospitals+near+me&oq=hospitals+near+me&aqs=chrome..69i57j0l7.2598j0j7&sourceid=chrome&ie=UTF-8"
  );
  win.show();
});
