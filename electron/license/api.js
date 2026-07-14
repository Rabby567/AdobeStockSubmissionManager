const { getDeviceId } = require("./device");

const LICENSE_SERVER =
  "https://adobe-stock-license-server.onrender.com/licenses";

async function activateLicense(
  licenseKey
) {

  try {

    const deviceId =
      getDeviceId();

    const response =
      await fetch(
  `${LICENSE_SERVER}/activate`,
        {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            licenseKey,

            deviceId,

          }),

        }
      );

    return await response.json();

  }

  catch (err) {

  console.log("NETWORK ERROR");
  console.log(err.message);

  return {

    success: false,

    networkError: true,

    message: err.message,

  };

}

}

async function checkLicenseOnline(
  licenseKey
) {

  try {

    const deviceId =
      getDeviceId();

    const response =
      await fetch(
  `${LICENSE_SERVER}/check`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

            body: JSON.stringify({

            licenseKey,

            deviceId,

          }),

        }
      );

    return await response.json();

  }

  catch (err) {

  console.log("NETWORK ERROR");
  console.log(err.message);

  return {

    success: false,

    networkError: true,

    message: err.message,

  };

}

}



module.exports = {

  activateLicense,

  checkLicenseOnline,

};