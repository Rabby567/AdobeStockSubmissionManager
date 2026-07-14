console.log("MAIN JS LOADED");
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const fs = require("fs");
const { exiftool } = require("exiftool-vendored");

const sizeOf = require("image-size").imageSize;
console.log("IMAGE SIZE =", sizeOf);



const XLSX = require("xlsx");
const archiver = require("archiver");
const { machineIdSync } = require("node-machine-id");

const {
  registerLicenseIPC,
} = require("./license");


const LICENSE_SERVER =
  "https://script.google.com/macros/s/AKfycbwc4ixyTUHG6JpY7WFh5gw2f4ZOp0dLnUiucV6r26uU9qRg6lzq-_GusUOVYqbmjOyC/exec";

function createWindow() {

  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, "../dist/index.html")}`
    : "http://localhost:5173";

if (app.isPackaged) {
    win.loadURL(startUrl);
    autoUpdater.checkForUpdatesAndNotify();
} else {
    win.loadURL(startUrl);
}

}


autoUpdater.on("checking-for-update", () => {
  console.log("Checking for updates...");
});

autoUpdater.on("update-available", (info) => {
  console.log("Update available:", info.version);
});

autoUpdater.on("update-not-available", () => {
  console.log("No update available");
});

autoUpdater.on("error", (err) => {
  console.log("Update error:", err);
});

autoUpdater.on("download-progress", (progress) => {
  console.log(
    `Downloading ${Math.round(progress.percent)}%`
  );
});

autoUpdater.on("update-downloaded", (info) => {

  dialog.showMessageBox({
    type: "info",
    title: "Update Ready",
    message: `Version ${info.version} downloaded successfully.`,
    buttons: ["Restart Now"],
  }).then(() => {

    autoUpdater.quitAndInstall();

  });

});


app.whenReady().then(() => {

  console.log("REGISTER LICENSE IPC");

  registerLicenseIPC();

  createWindow();

});

ipcMain.handle(
  "generate-excel",
  async (event, templates) => {




    console.log("===== GENERATE EXCEL CALLED =====");

    const settings = JSON.parse(
  fs.readFileSync(
    path.join(
      app.getPath("userData"),
      "google-settings.json"
    ),
    "utf8"
  )
);


    console.log("GENERATE EXCEL STARTED");
    console.log(templates.length);


    const rows = templates.map((item) => ({
      Filename: item.filename,
      Title: item.title,
      "Template Category": item.category,
      Keywords: item.keywords,
      "Template Size": item.templateSize,
      Colorspace: item.colorspace,
      "Number of Pages or Options": item.pages,
      Disclaimers:
        "Photos or design elements shown in the preview are for display only and are not included in the downloaded file",
    }));

    const worksheet =
      XLSX.utils.json_to_sheet(rows);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Adobe Stock"
    );

    const savePath = path.join(
      app.getPath("desktop"),
      "AdobeStockMetadata.xlsx"
    );

    XLSX.writeFile(workbook, savePath);

    event.sender.send(
  "google-progress",
  10
);

    if (settings.enabled) {

      event.sender.send(
  "google-progress",
  20
);

  try {

  console.log("START FETCH");

  console.log("Google Settings:");
  console.log(settings);

  console.log("Template Count:");
  console.log(templates.length);

  console.log("Sheet:");
  console.log(settings.sheetName);

  console.log("URL:");
  console.log(settings.scriptUrl);


  const uploadTemplates = templates.map((t) => ({
  filename: t.filename,
  title: t.title,
  category: t.category,
  keywords: t.keywords,
  templateSize: t.templateSize,
  colorspace: t.colorspace,
  pages: t.pages,
}));

console.log("Upload Size:");
console.log(JSON.stringify(uploadTemplates).length);

console.log("First Template:");
console.log(uploadTemplates[0]);

console.log("Keys:");
console.log(Object.keys(uploadTemplates[0]));


const response = await fetch(settings.scriptUrl, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    sheetName: settings.sheetName,
    templates: uploadTemplates,
  }),
});


  console.log("Status:", response.status);
  console.log("OK:", response.ok);

  const result = await response.text();

  console.log("Response:");
  console.log(result);

  event.sender.send("google-progress", 100);

} catch (error) {

  event.sender.send("google-progress", 0);

  console.error(error);

}

}

return savePath;
  }
);

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled) {
    return null;
  }

  return result.filePaths[0];
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


ipcMain.handle("scan-folder", async (event, folderPath) => {
  const folders = [];

  const items = fs.readdirSync(folderPath, {
    withFileTypes: true,
  });

  for (const item of items) {
    if (!item.isDirectory()) continue;

    const templateFolder = path.join(folderPath, item.name);

    const files = fs.readdirSync(templateFolder);

    const hasThumbnail = files.includes("Thumbnail.jpg");
    const hasPreview = files.includes("Preview1.jpg");

    const templateFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();

      return [".psdt", ".ait", ".indt"].includes(ext);
    });

    const title =
  templateFiles.length > 0
    ? path.parse(templateFiles[0]).name
    : item.name;

    console.log("Template File:", templateFiles);
console.log("Generated Title:", title);

    const thumbnailPath = path.join(
  templateFolder,
  "Thumbnail.jpg"
);

const previewPath = path.join(
  templateFolder,
  "Preview1.jpg"
);
let thumbnail = "";

let thumbnailWidth = 0;
let thumbnailHeight = 0;

let previewWidth = 0;
let previewHeight = 0;



if (hasThumbnail) {

  const imageBuffer =
    fs.readFileSync(thumbnailPath);

  console.log(sizeOf(imageBuffer));

  thumbnail =
    `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  const thumbInfo =
    sizeOf(imageBuffer);

  thumbnailWidth =
    thumbInfo.width;

  thumbnailHeight =
    thumbInfo.height;
}

if (hasPreview) {

  const previewBuffer =
    fs.readFileSync(previewPath);

  console.log(sizeOf(previewBuffer));

  const previewInfo =
    sizeOf(previewBuffer);

  previewWidth =
    previewInfo.width;

  previewHeight =
    previewInfo.height;
}



console.log("Thumbnail Base64:");
console.log(thumbnail.substring(0, 100));



let keywords = "";
let templateSize = "";
let pages = "";
let comments = "";

if (hasThumbnail) {
  try {
    const meta = await exiftool.read(thumbnailPath);

    console.log("META DATA:");
    console.log(meta);

    if (meta.Keywords) {
      keywords = Array.isArray(meta.Keywords)
        ? meta.Keywords.join(", ")
        : meta.Keywords.toString();
    }

    if (meta.XPComment) {
      comments = meta.XPComment.toString();

      const parts = comments.split(",");

templateSize = parts[0]?.trim() || "";
pages = parts[1]?.trim() || "";

    } else {
      pages = "01 Pages";
    }
  } catch (error) {
    console.log("Metadata Read Error:", error);
  }
}


const validationErrors = [];

if (
  hasThumbnail &&
  (
    thumbnailWidth !== 2048 ||
    thumbnailHeight !== 1424
  )
) {
  validationErrors.push(
    "Thumbnail Size Invalid"
  );
}

if (
  hasPreview &&
  (
    previewWidth !== 2048 ||
    previewHeight < 1536 ||
    previewHeight > 6144
  )
) {
  validationErrors.push(
    "Preview Size Invalid"
  );
}



if (!hasThumbnail) {
  validationErrors.push("Missing Thumbnail");
}

if (!hasPreview) {
  validationErrors.push("Missing Preview");
}

if (templateFiles.length !== 1) {
  validationErrors.push("Template File Error");
}

if (!keywords) {
  validationErrors.push("Missing Keywords");
}

const keywordCount =
  keywords
    ? keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean).length
    : 0;

if (keywordCount < 20) {
  validationErrors.push(
    `Keywords Too Low (${keywordCount}/20)`
  );
}

if (keywordCount > 50) {
  validationErrors.push(
    `Keywords Too High (${keywordCount}/50)`
  );
}

if (!templateSize) {
  validationErrors.push("Missing Template Size");
}

if (!pages) {
  validationErrors.push("Missing Pages");
}


const valid = validationErrors.length === 0;

console.log({
  folderName: item.name,
  title,
  filename: title + ".zip",
});

console.log("BEFORE PUSH");
console.log({
  title,
  thumbnailWidth,
  thumbnailHeight,
  previewWidth,
  previewHeight,
});

 folders.push({
  name: item.name,
  path: templateFolder,

  thumbnail,
  thumbnailWidth,
  thumbnailHeight,

  previewWidth,
  previewHeight,

  thumbnailValid:
   thumbnailWidth === 2048 &&
   thumbnailHeight === 1424,

  previewValid:
    previewWidth === 2048 &&
    previewHeight >= 1536 &&
    previewHeight <= 6144,

  preview: hasPreview,

  filename: title + ".zip",
  title,
  category: "",
  colorspace: "RGB",

  templateCount: templateFiles.length,

  templateType:
    templateFiles.length > 0
      ? path.extname(templateFiles[0]).replace(".", "")
      : "",

  keywordCount,
  valid,

  validationErrors,

  keywords,
  templateSize,
  pages,
  comments,
});
  }

  return folders;
});

ipcMain.handle(
  "generate-packages",
  async (event, templates) => {

    try {

    let totalTemplates = templates.length;
    let generatedCount = 0;
    let skippedCount = 0;
    let invalidTemplates = [];

    const outputFolder = path.join(
      app.getPath("desktop"),
      "AdobeStockPackages"
    );

    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, {
        recursive: true,
      });
    }

    for (const item of templates) {

      console.log("================================");
      console.log("TITLE:", item.title);
      console.log("FILENAME:", item.filename);
      console.log("PATH:", item.path);
      console.log("================================");

      const runtimeErrors = [];

      if (!item.templateSize) {
        runtimeErrors.push("Missing Template Size");
      }

      if (!item.category) {
        runtimeErrors.push("Missing Category");
      }

      if (
        item.validationErrors &&
        item.validationErrors.length > 0
      ) {
        runtimeErrors.push(
          ...item.validationErrors
        );
      }

      if (runtimeErrors.length > 0) {

        skippedCount++;

        invalidTemplates.push({
          title: item.title,
          issues: runtimeErrors.join(", "),
        });

        console.log(
          `SKIPPED: ${item.title}`
        );

        continue;
      }

      let fileName =
        item.filename || item.title;

      if (
        !fileName
          .toLowerCase()
          .endsWith(".zip")
      ) {
        fileName += ".zip";
      }

      const zipPath = path.join(
        outputFolder,
        fileName
      );

      console.log("ZIP:", zipPath);

      const output =
        fs.createWriteStream(zipPath);

        console.log("TYPE:", typeof archiver);
        console.log("VALUE:", archiver);

      const archive = archiver("zip", {
        zlib: {
          level: 9,
        },
      });

      archive.on("error", (err) => {
        throw err;
      });

      archive.pipe(output);

      // ZIP NAME (without extension)
      const zipName = path.parse(fileName).name;

      // Temp Workspace
      const tempRoot = path.join(
        app.getPath("temp"),
        "AdobeStockPackageTemp"
      );

      if (fs.existsSync(tempRoot)) {
        fs.rmSync(tempRoot, {
          recursive: true,
          force: true,
        });
      }

      fs.mkdirSync(tempRoot, {
        recursive: true,
      });

      // Folder that will finally be zipped
      const packageFolder = path.join(
        tempRoot,
        zipName
      );

      fs.mkdirSync(packageFolder);

      const files = fs.readdirSync(item.path);

      for (const file of files) {

        const source = path.join(
          item.path,
          file
        );

        const ext = path.extname(file).toLowerCase();

        let destination;

        // Rename ONLY template file
        if (
          [
            ".ait",
            ".psdt",
            ".indt",
            ".ai",
            ".psd",
            ".indd",
          ].includes(ext)
        ) {

          destination = path.join(
            packageFolder,
            zipName + ext
          );

          console.log(
            "Template Renamed:",
            zipName + ext
          );

        } else {

          destination = path.join(
            packageFolder,
            file
          );

        }

        fs.copyFileSync(
          source,
          destination
        );

      }

      console.log(
        "ZIP FOLDER:",
        packageFolder
      );

      // ZIP THE WHOLE FOLDER
      archive.directory(
        packageFolder,
        zipName
      );

      await archive.finalize();

      await new Promise((resolve, reject) => {

        output.on(
          "close",
          resolve
        );

        output.on(
          "error",
          reject
        );

      });

      fs.rmSync(tempRoot, {
        recursive: true,
        force: true,
      });

      generatedCount++;

          }

    // Submission Report
    const reportPath = path.join(
      outputFolder,
      "SubmissionReport.txt"
    );

    const reportContent = `
Adobe Stock Submission Report

Generated Date:
${new Date().toLocaleString()}

Total Templates:
${totalTemplates}

Generated:
${generatedCount}

Skipped:
${skippedCount}
`;

    fs.writeFileSync(
      reportPath,
      reportContent
    );

    // Invalid Report
    if (invalidTemplates.length > 0) {

      const invalidPath = path.join(
        outputFolder,
        "InvalidTemplates.txt"
      );

      let invalidContent =
        "INVALID TEMPLATES REPORT\n\n";

      invalidTemplates.forEach((item) => {

        invalidContent +=
          `Title: ${item.title}\n`;

        invalidContent +=
          `Issues: ${item.issues}\n\n`;

      });

      fs.writeFileSync(
        invalidPath,
        invalidContent
      );

    }

    return `
Packages Folder:
${outputFolder}

Total Templates:
${totalTemplates}

Generated:
${generatedCount}

Skipped:
${skippedCount}
`;


} catch (err) {

  console.error("ZIP ERROR");
  console.error(err);

  throw err;

}


  }
);


ipcMain.handle(
  "save-category-rules",
  async (event, rules) => {

    const filePath = path.join(
      app.getPath("userData"),
      "category-rules.json"
    );

    fs.writeFileSync(
      filePath,
      JSON.stringify(
        rules,
        null,
        2
      )
    );

    return true;
  }
);

ipcMain.handle(
  "load-category-rules",
  async () => {

    const filePath = path.join(
      app.getPath("userData"),
      "category-rules.json"
    );

    if (!fs.existsSync(filePath)) {
      return [];
    }

    return JSON.parse(
      fs.readFileSync(
        filePath,
        "utf8"
      )
    );
  }
);

ipcMain.handle(
  "save-google-settings",
  async (event, settings) => {

    const filePath = path.join(
      app.getPath("userData"),
      "google-settings.json"
    );

    fs.writeFileSync(
      filePath,
      JSON.stringify(
        settings,
        null,
        2
      )
    );

    return true;
  }
);

ipcMain.handle(
  "load-google-settings",
  async () => {

    const filePath = path.join(
      app.getPath("userData"),
      "google-settings.json"
    );

    if (!fs.existsSync(filePath)) {
      return {
        enabled: false,
        scriptUrl: "",
        sheetName: "Templates",
      };
    }

    return JSON.parse(
      fs.readFileSync(
        filePath,
        "utf8"
      )
    );
  }
);
