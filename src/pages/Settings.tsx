import Layout from "../components/Layout";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import {
  useCategoryStore
} from "../store/useCategoryStore";

import {
  useGoogleSheetStore,
} from "../store/useGoogleSheetStore";

import { useEffect } from "react";


export default function Settings() {


const saveRules = async () => {
  try {
    console.log("Before Save", rules);

await window.electronAPI.saveCategoryRules(rules);

console.log("After Save", rules);

    // Force new state reference
   // setRules([...rules]);

    console.log("Category Rules Saved");
    toast.success("Category rules saved successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to save category rules");
  }
};



const saveGoogleSettings =
  async () => {

    try {

      await window.electronAPI
        .saveGoogleSettings({

          enabled:
            googleEnabled,

          scriptUrl,

          sheetName,

        });

      console.log("Google Settings Saved");
      toast.success("Google settings saved successfully");
    } catch (error) {

      console.error(error);

      toast.error("Failed to save Google settings");

    }

  };


  const rules =
    useCategoryStore(
      (state) => state.rules
    );

  const addRule =
    useCategoryStore(
      (state) => state.addRule
    );

  const deleteRule =
    useCategoryStore(
      (state) => state.deleteRule
    );

  const updateRule =
    useCategoryStore(
      (state) => state.updateRule
    );

    const setRules =
  useCategoryStore(
    (state) => state.setRules
  );


  const googleEnabled =
  useGoogleSheetStore(
    (state) => state.enabled
  );

const scriptUrl =
  useGoogleSheetStore(
    (state) => state.scriptUrl
  );

const sheetName =
  useGoogleSheetStore(
    (state) => state.sheetName
  );

const setGoogleEnabled =
  useGoogleSheetStore(
    (state) => state.setEnabled
  );

const setScriptUrl =
  useGoogleSheetStore(
    (state) => state.setScriptUrl
  );

const setSheetName =
  useGoogleSheetStore(
    (state) => state.setSheetName
  );


useEffect(() => {

  const loadRules = async () => {

    const savedRules =
      await window.electronAPI
        .loadCategoryRules();

    if (
      savedRules &&
      savedRules.length > 0
    ) {
      setRules(savedRules);
    }
  };

  loadRules();

  const loadGoogleSettings =
  async () => {

    const settings =
      await window.electronAPI
        .loadGoogleSettings();

    setGoogleEnabled(
      settings.enabled
    );

    setScriptUrl(
      settings.scriptUrl
    );

    setSheetName(
      settings.sheetName
    );

  };

loadGoogleSettings();

}, [
  setRules,
  setGoogleEnabled,
  setScriptUrl,
  setSheetName,
]);


const inputStyle = {
  width: "100%",
  height: "44px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  padding: "0 14px",
  fontSize: "14px",
  outline: "none",
  background: "#fff",
  boxSizing: "border-box" as const,
};


  return (
    <Layout>
    <div
      style={{
        padding: "20px",
      }}
    >
      <div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "32px",
    marginBottom: "28px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
  }}
>
  <h1
    style={{
      margin: 0,
      fontSize: "34px",
      fontWeight: 700,
      color: "#111827",
    }}
  >
    Settings
  </h1>

  <p
    style={{
      marginTop: "10px",
      color: "#6b7280",
      fontSize: "16px",
      lineHeight: 1.7,
    }}
  >
    Configure category detection rules and Google Sheets
    integration for Adobe Stock Submission Manager.
  </p>
  
</div>

      <div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    }}
  >
    <div>
      <h2
        style={{
          margin: 0,
          fontSize: "24px",
          color: "#111827",
        }}
      >
        🎯 Smart Category Detection
      </h2>

      <p
        style={{
          marginTop: "8px",
          color: "#6b7280",
        }}
      >
        Automatically detect Adobe Stock category numbers from
        template titles.
      </p>
    </div>

    <div
      style={{
        background: "#eff6ff",
        color: "#2563eb",
        padding: "8px 16px",
        borderRadius: "999px",
        fontWeight: 700,
      }}
    >
      {rules.length} Rules
    </div>
  </div>




      <table
  style={{
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 12px",
  }}
>
        <thead>
  <tr>
    <th
      style={{
        textAlign: "left",
        padding: "0 14px 12px",
        color: "#64748b",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      Keywords
    </th>

    <th
      style={{
        width: "130px",
        textAlign: "center",
        paddingBottom: "12px",
        color: "#64748b",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      Category
    </th>

    <th
      style={{
        width: "90px",
        textAlign: "center",
        paddingBottom: "12px",
        color: "#64748b",
        fontSize: "13px",
        fontWeight: 700,
      }}
    >
      Action
    </th>
  </tr>
</thead>

        <tbody>
          {rules.map((rule, index) => (
            <tr
  key={index}
  style={{
    background: "#f8fafc",
  }}
>
              <td>
                <input
                  value={rule.keyword}
                  onChange={(e) =>
                    updateRule(
                      index,
                      "keyword",
                      e.target.value
                    )
                  }
                  style={{
  ...inputStyle,
}}
                />
              </td>

              <td
  style={{
    padding: "8px",
  }}
>
               <input
  type="text"
  value={rule.category}
  onChange={(e) =>
    updateRule(
      index,
      "category",
      e.target.value
    )
  }
  style={{
  ...inputStyle,
  width: "90px",
  textAlign: "center",
  fontWeight: 700,
}}
/>
              </td>

              <td
  style={{
    padding: "8px",
  }}
>
  <Button
    color="red"
    variant="outline"
    size="sm"
    onClick={() => deleteRule(index)}
>
    Delete
</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>
      <p
  style={{
    marginTop: "10px",
    fontSize: "12px",
    color: "#666",
  }}
>
  Example:
  brochure,catalog,magazine,lookbook
</p>

      <div
  style={{
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  }}
>
        <Button
    color="blue"
    variant="outline"
    size="md"
    onClick={() => {
        console.log("ADD CLICK");
        addRule();
    }}
>
    + Add Rule
</Button>

 <Button
    color="blue"
    size="md"
    loadingText="Saving..."
    successText="Saved"
    onClick={saveRules}
>
    Save Rules
</Button>
      </div>
<div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "28px",
    marginTop: "30px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "24px",
      color: "#111827",
    }}
  >
    ☁ Google Sheets
  </h2>

  <p
    style={{
      marginTop: "8px",
      color: "#6b7280",
    }}
  >
    Automatically upload metadata after generating your templates.
  </p>

  <div
    style={{
      marginTop: "24px",
    }}
  >
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontWeight: 600,
      }}
    >
      <input
        type="checkbox"
        checked={googleEnabled}
        onChange={(e) =>
          setGoogleEnabled(e.target.checked)
        }
      />

      Enable Google Sheet Sync
    </label>
  </div>

  <div
    style={{
      marginTop: "24px",
    }}
  >
    <label>Apps Script URL</label>

    <input
      disabled={!googleEnabled}
      value={scriptUrl}
      onChange={(e) =>
        setScriptUrl(e.target.value)
      }
      style={{
        ...inputStyle,
        marginTop: "8px",
      }}
    />
  </div>

  <div
    style={{
      marginTop: "20px",
    }}
  >
    <label>Worksheet Name</label>

    <input
      disabled={!googleEnabled}
      value={sheetName}
      onChange={(e) =>
        setSheetName(e.target.value)
      }
      style={{
        ...inputStyle,
        width: "350px",
        marginTop: "8px",
      }}
    />
  </div>

<div
  style={{
    
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "28px",
    marginLeft: "0px",
  }}
>
  <Button
    color="green"
    size="xl"
    loadingText="Saving..."
    successText="Saved"
    onClick={saveGoogleSettings}
  >
    Save Google Settings
  </Button>
</div>

</div>


    </div>
    </Layout>
  );
}