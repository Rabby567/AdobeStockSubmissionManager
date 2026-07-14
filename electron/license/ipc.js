const { ipcMain } = require("electron");

const {
  activateLicense,
  checkLicenseOnline,
} = require("./api");

const {
  getDeviceId,
} = require("./device");

const {
  saveLicense,
  loadLicense,
  clearLicense,
  isActivated,
} = require("./storage");

function registerLicenseIPC() {

    console.log("REGISTER LICENSE IPC FUNCTION");

  ipcMain.handle(
    "get-device-id",
    async () => {

      return getDeviceId();

    }
  );

ipcMain.handle(
  "activate-license",
  async (event, data) => {

    console.log("ACTIVATE IPC");
    console.log(data);

    const result =
      await activateLicense(data.licenseKey);

    console.log("API RESULT");
    console.log(result);

    if (result.success) {

      console.log("SAVING LICENSE");

      saveLicense({

  licenseKey: data.licenseKey,

  deviceId: getDeviceId(),

  customer: result.customer || "",

  email: result.email || "",

  plan: result.plan || "",

  expiry: result.expiry || "",

  activated: true,

  lastCheck: new Date().toISOString(),

  lastOnlineVerification:
    new Date().toISOString(),

});

    }

    return result;

  }
);

 ipcMain.handle(
  "check-license",
  async () => {

    const license = loadLicense();

    console.log("LICENSE FROM STORAGE");
    console.log(license);

    if (!license) {
      return null;
    }

    const result =
      await checkLicenseOnline(
        license.licenseKey
      );

    console.log("ONLINE CHECK");
    console.log(result);

 if (!result.success) {

 if (result.networkError) {

  console.log("OFFLINE MODE");

  const lastOnline =
    new Date(
      license.lastOnlineVerification
    );

  const now = new Date();

  const diffDays =
    Math.floor(
      (now - lastOnline) /
      (1000 * 60 * 60 * 24)
    );

  console.log(
    "Offline Days:",
    diffDays
  );

  if (diffDays <= 7) {

    console.log(
      "OFFLINE GRACE PERIOD"
    );

    return license;

  }

  console.log(
    "OFFLINE LIMIT EXCEEDED"
  );

  return null;

}

  console.log("LICENSE INVALID");

  clearLicense();

  return null;

}

if (result.status !== "Active") {

  console.log("LICENSE DISABLED");

  clearLicense();

  return null;

}



const updatedLicense = {

  ...license,

  customer: result.customer || "",

  email: result.email || "",

  plan: result.plan || "",

  expiry: result.expiry || "",

  activated: true,

  lastCheck: new Date().toISOString(),

  lastOnlineVerification:
    new Date().toISOString(),

};

saveLicense(updatedLicense);

console.log("UPDATED LICENSE");
console.log(updatedLicense);

return updatedLicense;

  }
);

}

module.exports = {
  registerLicenseIPC,
};