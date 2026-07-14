const Store = require("electron-store");

const store = new Store({
  name: "license",
});

console.log("STORE PATH:");
console.log(store.path);

function saveLicense(data) {

  store.set("license", data);

}

function loadLicense() {

  const data = store.get("license");

  console.log("STORE DATA");
  console.log(data);

  return data;

}

function clearLicense() {

  store.delete("license");

}

function isActivated() {

  const license = loadLicense();

  return !!(
    license &&
    license.activated
  );

}

module.exports = {
  saveLicense,
  loadLicense,
  clearLicense,
  isActivated,
};