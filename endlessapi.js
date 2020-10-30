var request = require("request");
const axios = require("axios");
let sessionId = "";
let analysis = "";
async function initSession() {
  var options = {
    method: "GET",
    url: "https://endlessmedicalapi1.p.rapidapi.com/InitSession",
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "5812113f4bmshfa9aaa56fd6325cp1518c7jsn2e3209951355",
      useQueryString: true,
    },
  };

  await request(options, function (error, response, body) {
    if (error) throw new Error(error);

    sessionId = JSON.parse(body)["SessionID"];
    console.log(sessionId);
    return sessionId;
  });
}
function acceptTermsOfUse() {
  var options = {
    method: "POST",
    url: "https://endlessmedicalapi1.p.rapidapi.com/AcceptTermsOfUse",
    qs: {
      SessionID: sessionId,
      passphrase:
        "I have read, understood and I accept and agree to comply with the Terms of Use of EndlessMedicalAPI and Endless Medical services. The Terms of Use are available on endlessmedical.com",
    },
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "5812113f4bmshfa9aaa56fd6325cp1518c7jsn2e3209951355",
      "content-type": "application/x-www-form-urlencoded",
      useQueryString: true,
    },
    form: {},
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
    return body["status"];
  });
}

function updateFeature(feature, value) {
  var options = {
    method: "POST",
    url: "https://endlessmedicalapi1.p.rapidapi.com/UpdateFeature",
    qs: { SessionID: sessionId, name: feature, value: value },
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "5812113f4bmshfa9aaa56fd6325cp1518c7jsn2e3209951355",
      "content-type": "application/x-www-form-urlencoded",
      useQueryString: true,
    },
    form: {},
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

function deleteFeature(feature) {
  var options = {
    method: "POST",
    url: "https://endlessmedicalapi1.p.rapidapi.com/DeleteFeature",
    qs: { name: feature, SessionID: sessionId },
    headers: {
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "5812113f4bmshfa9aaa56fd6325cp1518c7jsn2e3209951355",
      "content-type": "application/x-www-form-urlencoded",
      useQueryString: true,
    },
    form: {},
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });
}

async function analyze() {
  axios({
    method: "GET",
    url: "https://endlessmedicalapi1.p.rapidapi.com/Analyze",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "endlessmedicalapi1.p.rapidapi.com",
      "x-rapidapi-key": "5812113f4bmshfa9aaa56fd6325cp1518c7jsn2e3209951355",
      useQueryString: true,
    },
    params: {
      SessionID: sessionId,
    },
  })
    .then((response) => {
      let count = 0;
      display =
        "<br /><div><button class='btn btn-block btn-light'>Probable Diseases:</button><br>";
      response["data"]["Diseases"].forEach((element) => {
        for (const k in element) {
          if (element.hasOwnProperty(k)) {
            const el = element[k];
            display +=
              "<div class='m-2 collapsible'>" +
              k +
              ": " +
              (el * 100).toFixed(2) +
              "%</div><div class='progress progress-secondary' style='height: 2px;'><div class='progress-bar' role='progressbar' style='width: 25%;' aria-valuenow='" +
              el * 100 +
              " aria-valuemin='0' aria-valuemax='100'></div></div><div class='content'>";

            response["data"]["VariableImportances"][count][k].forEach((i) => {
              display +=
                "<small><b>" +
                i[0] +
                "</b> </small><small class='mr-1'>(" +
                (i[1] * 100).toFixed(2) +
                "%)</small><br>";
            });
            display += "</div>";
            count = count + 1;
          }
        }
      });

      display += "</div><script>collapser();</script>";

      document.getElementById("analysis").innerHTML = display;
      var coll = document.getElementsByClassName("collapsible");
      var i;
      for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var content = this.nextElementSibling.nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  sessionId,
  analysis,
  initSession,
  acceptTermsOfUse,
  analyze,
  updateFeature,
  deleteFeature,
};
