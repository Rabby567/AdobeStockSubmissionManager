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
} = require("./storage");

function registerLicenseIPC() {
  console.log("REGISTER LICENSE IPC FUNCTION");

  ipcMain.handle("get-device-id", async () => {
    return getDeviceId();
  });

  // ====================================================
  // ACTIVATE LICENSE
  // ====================================================

  ipcMain.handle(
    "activate-license",
    async (event, data) => {
      console.log("ACTIVATE IPC");
      console.log(data);

      const result = await activateLicense(
        data.licenseKey
      );

      console.log("API RESULT");
      console.log(result);

      if (result.success) {
        saveLicense({
          licenseKey: data.licenseKey,

          deviceId:
            result.license.deviceId,

          customer:
            result.license.customer,

          email:
            result.license.email,

          plan:
            result.license.plan,

          expiry:
            result.license.expiry,

          activated: true,

          activatedOn:
            new Date().toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),

          lastCheck:
            new Date().toISOString(),

          lastOnlineVerification:
            new Date().toISOString(),
        });
      }

      return result;
    }
  );

  // ====================================================
  // CHECK LICENSE
  // ====================================================

  ipcMain.handle(
    "check-license",
    async () => {
      const license = loadLicense();

      console.log(
        "LICENSE FROM STORAGE"
      );
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

      // -----------------------
      // Network Error
      // -----------------------

      if (!result.success) {
        if (result.networkError) {
          console.log(
            "OFFLINE MODE"
          );

          const lastOnline =
            new Date(
              license.lastOnlineVerification
            );

          const now = new Date();

          const diffDays =
            Math.floor(
              (now - lastOnline) /
                (1000 *
                  60 *
                  60 *
                  24)
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

        console.log(
          "LICENSE INVALID"
        );

        clearLicense();

        return null;
      }

      const db =
        result.license;


        // -----------------------
// Expiry Check
// -----------------------

if (db.expiry_date) {

  const today = new Date();
  const expiry = new Date(db.expiry_date);

  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  if (today > expiry) {

    console.log("LICENSE EXPIRED");

    clearLicense();

    return null;

  }

}

      // -----------------------
      // Status Check
      // -----------------------

      if (db.status === "suspended") {
  console.log("LICENSE SUSPENDED");

  const suspendedLicense = {
    ...license,
    suspended: true,
    lastCheck: new Date().toISOString(),
    lastOnlineVerification: new Date().toISOString(),
  };

  saveLicense(suspendedLicense);

  console.log("AFTER SAVE:");
console.log(loadLicense());

  return suspendedLicense;
}

      // -----------------------
      // Device Check
      // -----------------------

      if (
        db.device_id !==
        license.deviceId
      ) {
        console.log(
          "DEVICE MISMATCH"
        );

        clearLicense();

        return null;
      }

      const updatedLicense = {
        ...license,

        customer:
          db.customer_name,

        email:
          db.email,

        plan:
          db.plan,

        expiry:
          db.expiry_date,

        activated: true,
        suspended: false,

        activatedOn:
          license.activatedOn,

        lastCheck:
          new Date().toISOString(),

        lastOnlineVerification:
          new Date().toISOString(),
      };

      saveLicense(
        updatedLicense
      );

      console.log(
        "UPDATED LICENSE"
      );

      console.log(
        updatedLicense
      );

      return updatedLicense;
    }
  );

  ipcMain.handle(
    "get-license-info",
    async () => {
      return loadLicense();
    }
  );
}

module.exports = {
  registerLicenseIPC,
};