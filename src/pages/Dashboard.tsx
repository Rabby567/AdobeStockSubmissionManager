import Layout from "../components/Layout";
import type { TemplateItem } from "../types/template";
import { useTemplateStore } from "../store/useTemplateStore";
import { detectCategory } from "../services/categoryDetector";
import { detectColorspace } from "../services/colorspaceDetector";
import { useState, useEffect } from "react";
import { useCategoryStore } from "../store/useCategoryStore";
import Button from "../components/ui/Button";
import { validateTemplate } from "../services/validationEngine";

type ScanResult = TemplateItem;

export default function Dashboard() {
  const [date, setDate] = useState("20260623");
  const [batchNumber, setBatchNumber] = useState("273");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [foldersFound, setFoldersFound] = useState(0);
  const [missingFiles, setMissingFiles] = useState(0);
  const [validationErrors, setValidationErrors] = useState(0);
  const [scanResults, setScanResults] = useState<ScanResult[]>([]);
  const rules =useCategoryStore((state) => state.rules);
  const setTemplates = useTemplateStore(
    (state) => state.setTemplates
  );
  const setRules =
  useCategoryStore(
    (state) => state.setRules
  );

  useEffect(() => {
  console.log("Dashboard loadRules()");
  const loadRules = async () => {

    const savedRules =
      await window.electronAPI
        .loadCategoryRules();

    if (
      savedRules &&
      savedRules.length > 0
    ) {
      console.log("Dashboard setRules", savedRules.length);
      setRules(savedRules);
    }
  };

  loadRules();

}, [setRules]);

const handleFolderSelect = async () => {

  console.log("RULES:");
  console.log(rules);

  const folder =
    await window.electronAPI.selectFolder();

  if (!folder) return;

  setSelectedFolder(folder);

  const folders =
    await window.electronAPI.scanFolder(folder);

  const enhancedFolders =
    folders.map((item) => {

      const detectedCategory =
        detectCategory(
          item.title,
          rules
        );

      console.log({
  name: item.name,
  title: item.title,
});

      const template = {
    ...item,

    filename: `${date}_Batch${batchNumber}_${item.title}.zip`,

    title: item.title,

    category: detectedCategory,

    colorspace: detectColorspace(item.title),

    pages: item.pages || "",

    comments: item.comments || "",

    keywords: item.keywords || "",

    templateSize: item.templateSize || "",

    keywordCount: item.keywordCount || 0,
};

const validationErrors =
    validateTemplate(template);

return {
    ...template,

    validationErrors,

    valid: validationErrors.length === 0,
};
    });


  setFoldersFound(enhancedFolders.length);

  const missing = enhancedFolders.filter(
    (f) => !f.thumbnail || !f.preview
  ).length;

  const errors = enhancedFolders.filter(
  (f) => !f.valid
).length;

  setMissingFiles(missing);
  setValidationErrors(errors);

  setScanResults(enhancedFolders);
  setTemplates(enhancedFolders);

  console.log(enhancedFolders);
};

  return (
  <Layout>
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        
      }}
    >
      <div
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "35px",
    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
    marginBottom: "30px",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "38px",
      lineHeight: 1.2,
      fontWeight: 700,
      color: "#1f2937",
    }}
  >
    Adobe Stock Submission Manager
  </h1>

  <p
    style={{
      marginTop: "12px",
      color: "#6b7280",
      fontSize: "17px",
    }}
  >
    Upload template folders, validate metadata, generate Excel and submission
    packages for Adobe Stock.
  </p>

  <div
    style={{
      display: "flex",
      gap: "20px",
      marginTop: "30px",
      alignItems: "flex-start",
    }}
  >
    <div
      style={{
        flex: 1,
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: 600,
        }}
      >
        Date
      </label>

      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
        }}
      />
    </div>

    <div
      style={{
        flex: 1,
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: 600,
        }}
      >
        Batch Number
      </label>

      <input
        value={batchNumber}
        onChange={(e) =>
          setBatchNumber(e.target.value)
        }
        style={{
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
        }}
      />
    </div>
  </div>
</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        

       
      </div>

      <div
  style={{
    marginTop: "30px",
    background: "#ffffff",
    border: "2px dashed #cbd5e1",
    borderRadius: "18px",
    padding: "48px 40px",
    textAlign: "center",
    transition: "0.2s",
    boxShadow: "0 10px 25px rgba(0,0,0,.05)",
  }}
>
        <h2
  style={{
    margin: 0,
    fontSize: "30px",
    color: "#1f2937",
  }}
>
  📂 Upload Template Folders
</h2>

        <p
  style={{
    marginTop: "15px",
    color: "#6b7280",
    fontSize: "16px",
    lineHeight: 1.7,
  }}
>
  Drag & Drop template folders here
  <br />
  or click the button below
</p>

  <div
    style={{
        marginTop: "18px",
        display: "flex",
        justifyContent: "center",
    }}
>
    <Button
        color="blue"
        variant="solid"
        size="lg"
        animated={false}
        onClick={handleFolderSelect}
    >
        Select Folder
    </Button>
</div>

        {selectedFolder && (
          <div
            style={{
              marginTop: "20px",
              fontWeight: "bold",
            }}
          >
            Selected Folder:
            <br />
            {selectedFolder}
          </div>
        )}
      </div>

     <div
  style={{
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
  }}
>
        <div
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,.05)",
    border: "1px solid #eef2f7",
    transition: "0.2s",
  }}
>
          <div
  style={{
    fontSize: "34px",
  }}
>
  📁
</div>

<div
  style={{
    marginTop: "14px",
    color: "#64748b",
    fontWeight: 600,
    fontSize: "15px",
  }}
>
  Templates Found
</div>

<div
  style={{
    marginTop: "12px",
    fontSize: "48px",
    fontWeight: 700,
    color: "#0f172a",
  }}
>
  {foldersFound}
</div>
        </div>

        <div
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,.05)",
    border: "1px solid #eef2f7",
    transition: "0.2s",
  }}
>
  <div
    style={{
      fontSize: "34px",
    }}
  >
    ⚠️
  </div>

  <div
    style={{
      marginTop: "14px",
      color: "#64748b",
      fontWeight: 600,
      fontSize: "15px",
    }}
  >
    Missing Files
  </div>

  <div
    style={{
      marginTop: "12px",
      fontSize: "48px",
      fontWeight: 700,
      color: "#f59e0b",
    }}
  >
    {missingFiles}
  </div>
</div>

        <div
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,.05)",
    border: "1px solid #eef2f7",
    transition: "0.2s",
  }}
>
  <div
    style={{
      fontSize: "34px",
    }}
  >
    ❌
  </div>

  <div
    style={{
      marginTop: "14px",
      color: "#64748b",
      fontWeight: 600,
      fontSize: "15px",
    }}
  >
    Validation Errors
  </div>

  <div
    style={{
      marginTop: "12px",
      fontSize: "48px",
      fontWeight: 700,
      color: "#ef4444",
    }}
  >
    {validationErrors}
  </div>
</div>
      </div>

      <div
  style={{
    marginTop: "30px",
    background: "#fff",
    borderRadius: "18px",
    padding: "28px",
    boxShadow: "0 10px 25px rgba(0,0,0,.05)",
    border: "1px solid #eef2f7",
  }}
>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "26px",
      color: "#1f2937",
    }}
  >
    📋 Scanned Templates
  </h2>

  <div
    style={{
      background: "#eff6ff",
      color: "#2563eb",
      padding: "8px 14px",
      borderRadius: "999px",
      fontWeight: 600,
      fontSize: "14px",
    }}
  >
    {scanResults.length} Templates
  </div>
</div>

        {scanResults.length === 0 ? (
          <div
  style={{
    textAlign: "center",
    padding: "60px 20px",
    color: "#94a3b8",
  }}
>
  <div
    style={{
      fontSize: "54px",
    }}
  >
    📂
  </div>

  <h3
    style={{
      marginTop: "12px",
      marginBottom: "10px",
    }}
  >
    No Templates Found
  </h3>

  <p>
    Select a template folder to scan Adobe Stock templates.
  </p>
</div>
        ) : (
          scanResults.map((item, index) => (
            <div
  key={index}
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 20px",
    marginBottom: "14px",
    borderRadius: "14px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  }}
>
  <div
  style={{
    flex: 1,
  }}
>
  <div
    style={{
      fontWeight: 700,
      fontSize: "18px",
      color: "#1e293b",
    }}
  >
    {item.title}
  </div>

  <div
    style={{
      marginTop: "6px",
      color: "#64748b",
      fontSize: "14px",
    }}
  >
    {item.filename}
  </div>

  <div
  style={{
    marginTop: "10px",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  }}
>
  <span
    style={{
      background: "#f1f5f9",
      padding: "6px 10px",
      borderRadius: "8px",
      fontSize: "12px",
    }}
  >
    Keywords: {item.keywordCount}
  </span>

  <span
    style={{
      background: "#f1f5f9",
      padding: "6px 10px",
      borderRadius: "8px",
      fontSize: "12px",
    }}
  >
    Pages: {item.pages || "-"}
  </span>

  <span
    style={{
      background: "#f1f5f9",
      padding: "6px 10px",
      borderRadius: "8px",
      fontSize: "12px",
    }}
  >
    Size: {item.templateSize || "-"}
  </span>
</div>

  {!item.valid && (
    <div
      style={{
        marginTop: "10px",
        color: "#dc2626",
        fontSize: "13px",
      }}
    >
      {item.validationErrors.join(", ")}
    </div>
  )}
</div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
  }}
>
  <div
  style={{
    background: "#eef4ff",
    color: "#2563eb",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "13px",
    minWidth: "60px",
    textAlign: "center",
  }}
>
  {item.templateType.toUpperCase()}
</div>

  <div
  style={{
    background: item.valid ? "#dcfce7" : "#fee2e2",
    color: item.valid ? "#15803d" : "#dc2626",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "13px",
    minWidth: "80px",
    textAlign: "center",
  }}
>
  {item.valid ? "VALID" : "INVALID"}
</div>
</div>


            </div>
          ))
        )}
      </div>
    </div>
    </Layout>
  );
}