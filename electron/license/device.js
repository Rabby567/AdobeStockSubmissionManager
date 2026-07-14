const { machineIdSync } = require("node-machine-id");
const crypto = require("crypto");

function getDeviceId() {

  const machineId = machineIdSync();

  return crypto
    .createHash("sha256")
    .update(machineId)
    .digest("hex");

}

module.exports = {
  getDeviceId,
};