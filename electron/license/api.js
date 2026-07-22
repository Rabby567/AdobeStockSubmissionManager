const supabase = require("../supabase");
const { getDeviceId } = require("./device");

async function activateLicense(licenseKey) {
  try {
    const deviceId = getDeviceId();

    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("license_key", licenseKey)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: "License not found.",
      };
    }


    if (data.status === "unused") {

  const { error: updateError } = await supabase
    .from("licenses")
    .update({
      device_id: deviceId,
      status: "active",
      last_check: new Date().toISOString(),
    })
    .eq("license_key", licenseKey);

  if (updateError) {
    return {
      success: false,
      message: updateError.message,
    };
  }

  data.device_id = deviceId;
  data.status = "active";
}




    if (data.status === "suspended") {
      return {
        success: false,
        message: "License suspended.",
      };
    }

    if (
      data.device_id &&
      data.device_id !== "" &&
      data.device_id !== deviceId
    ) {
      return {
        success: false,
        message: "License already activated on another device.",
      };
    }

 

    return {
      success: true,
      license: {
        key: data.license_key,
        plan: data.plan,
        expiry: data.expiry_date,
        customer: data.customer_name,
        email: data.email,
        status: "active",
        deviceId,
      },
    };
  } catch (err) {
    return {
      success: false,
      networkError: true,
      message: err.message,
    };
  }
}

async function checkLicenseOnline(licenseKey) {
  try {
    const deviceId = getDeviceId();

    const { data, error } = await supabase
      .from("licenses")
      .select("*")
      .eq("license_key", licenseKey)
      .single();

    if (error || !data) {
      return {
        success: false,
        message: "License not found.",
      };
    }

if (
  data.status === "active" &&
  !data.device_id
) {
  return {
    success: false,
    message: "Invalid license state.",
  };
}


    if (data.device_id !== deviceId) {
      return {
        success: false,
        message: "Device mismatch.",
      };
    }

const { error: heartbeatError } = await supabase
  .from("licenses")
  .update({
    last_check: new Date().toISOString(),
  })
  .eq("license_key", licenseKey);

if (heartbeatError) {
  console.log("HEARTBEAT ERROR");
  console.log(heartbeatError);
} else {
  console.log("HEARTBEAT UPDATED");
}

    return {
      success: true,
      license: data,
    };
  } catch (err) {
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