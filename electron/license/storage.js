const Store = require("electron-store");
const CryptoJS = require("crypto-js");

const store = new Store({
  name: "license",
});

const SECRET = "ASM_2026_PRIVATE_7A9D83B2";

console.log("STORE PATH:");
console.log(store.path);

function saveLicense(data) {

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    SECRET
  ).toString();

  store.set("license", encrypted);
}

function loadLicense() {

  const data = store.get("license");

  if (!data) {
    return null;
  }

  // -------------------------
  // New encrypted license
  // -------------------------

  if (typeof data === "string") {

    try {

      const bytes = CryptoJS.AES.decrypt(
        data,
        SECRET
      );

      const json =
        bytes.toString(CryptoJS.enc.Utf8);

      return JSON.parse(json);

    } catch (err) {

      console.log("Invalid encrypted license.");

      return null;

    }

  }

  // -------------------------
  // Old JSON license
  // -------------------------

  if (typeof data === "object") {

    console.log(
      "Old license detected. Migrating..."
    );

    saveLicense(data);

    return data;

  }

  return null;

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