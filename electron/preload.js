console.log("PRELOAD LOADED");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  selectFolder: () =>
    ipcRenderer.invoke("select-folder"),

  scanFolder: (folderPath) =>
    ipcRenderer.invoke("scan-folder", folderPath),

  generateExcel: (templates) =>
    ipcRenderer.invoke("generate-excel", templates),

  generatePackages: (templates) =>
    ipcRenderer.invoke(
      "generate-packages",
      templates
    ),

  loadCategoryRules: () =>
    ipcRenderer.invoke(
      "load-category-rules"
    ),

  saveCategoryRules: (rules) =>
    ipcRenderer.invoke(
      "save-category-rules",
      rules
    ),

    saveGoogleSettings: (settings) =>
  ipcRenderer.invoke(
    "save-google-settings",
    settings
  ),

loadGoogleSettings: () =>
  ipcRenderer.invoke(
    "load-google-settings"
  ),

  onGoogleProgress: (callback) =>
  ipcRenderer.on(
    "google-progress",
    (_, progress) =>
      callback(progress)
  ),

  getDeviceId: () =>
  ipcRenderer.invoke("get-device-id"),

activateLicense: (data) =>
  ipcRenderer.invoke(
    "activate-license",
    data
  ),

checkLicense: () =>
  ipcRenderer.invoke(
    "check-license"
  ),

});
