let data = require("./SymptomsOutput.json");
convert_data = {};
titles = [];
for (let i = 0; i < data.length; i++) {
  const element = data[i];
  convert_data[i] = element;
  titles.push(element["name"]);
}
function update(name, value) {
  console.log(name, value);
  eapi.updateFeature(name, value);
  window.alert("Updated!");
}
function convert(val) {
  element = convert_data[Number(val)];
  let button =
    "<button onclick='update(" +
    element["name"] +
    ",document.getElementById(" +
    element["name"] +
    ").value)'>Add Symptom</button>";
  if (element["type"] == "integer" || element["type"] == "double") {
    let inputField =
      "<h4>" +
      element["text"] +
      "</h4><br />" +
      element["laytext"] +
      '<br /> <input type="number" min="' +
      element["min"] +
      '" name="' +
      element["name"] +
      '" id="' +
      element["name"] +
      '" max="' +
      element["max"] +
      '" value="' +
      element["default"] +
      '" /><br />';
    return inputField;
  } else {
    let inputField =
      "<h4>" +
      element["text"] +
      "</h4><br />" +
      element["laytext"] +
      "<br /><select id='" +
      element["name"] +
      "'>";
    element["choices"].forEach((i) => {
      inputField +=
        '<option value="' + i["value"] + '" >' + i["laytext"] + "</option>";
    });
    return inputField + "</select><br />";
  }
}

// let v = "";
// for (let i = 10; i < 20; i++) {
//   const element = data[i];
//   v += convert(element);
// }
// document.getElementById("values").innerHTML = v;

module.exports = { convert_data, titles, convert, update };
