import Layout from "../components/Layout";
import { APP_CONFIG } from "../config/app";
export default function UserGuide() {
    const appScript = String.raw`
function doPost(e) {

  try {

    const data = JSON.parse(e.postData.contents);

    const sheet =
      SpreadsheetApp
        .getActiveSpreadsheet()
        .getSheetByName(data.sheetName);

    // Clear previous uploaded data
    const lastRow = sheet.getLastRow();

    if (lastRow > 2) {
      sheet.getRange(
        3,
        1,
        lastRow - 2,
        8
      ).clearContent();
    }

    if (!sheet) {
      throw new Error(
        "Worksheet not found: " +
        data.sheetName
      );
    }

    if (sheet.getLastRow() > 2) {
      sheet.getRange(
        3,
        1,
        sheet.getLastRow() - 2,
        8
      ).clearContent();
    }

    const rows =
      data.templates.map(item => [

        item.filename,

        item.title,

        item.category,

        item.keywords,

        item.templateSize,

        item.colorspace,

        item.pages,

        "Photos or design elements shown in the preview are for display only and are not included in the downloaded file"

      ]);

    if (rows.length > 0) {

      sheet.getRange(
        3,
        1,
        rows.length,
        8
      ).setValues(rows);

    }

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: true
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

  catch (err) {

    return ContentService
      .createTextOutput(
        JSON.stringify({
          success: false,
          error: err.toString()
        })
      )
      .setMimeType(
        ContentService.MimeType.JSON
      );

  }

}
`;

const copyScript = async () => {
  try {
    await navigator.clipboard.writeText(appScript);

    alert("Apps Script copied successfully!");
  } catch (error) {
    console.error(error);

    alert("Failed to copy Apps Script.");
  }
};



  return (
    <Layout>
      <div
        style={{
           width: "100%",
        maxWidth: "100%",
        }}
      >
        {/* Hero */}

        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "32px",
            boxShadow: "0 10px 28px rgba(0,0,0,.05)",
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              color: "#111827",
            }}
          >
            📖 User Guide
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "16px",
              color: "#6b7280",
              lineHeight: 1.8,
            }}
          >
            Learn how to configure, prepare templates,
            generate metadata and submit Adobe Stock
            templates using Adobe Stock Submission
            Manager.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "#eff6ff",
                color: "#2563eb",
                padding: "8px 16px",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              Version {APP_CONFIG.VERSION}
            </div>

            <div
              style={{
                background: "#ecfdf5",
                color: "#15803d",
                padding: "8px 16px",
                borderRadius: "999px",
                fontWeight: 600,
              }}
            >
              Setup Time 10–15 Minutes
            </div>
          </div>
        </div>

        <div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
    marginBottom: "28px",
  }}
>
  <h2
    style={{
      margin: 0,
      fontSize: "24px",
      color: "#111827",
    }}
  >
    🚀 Quick Start
  </h2>

  <p
    style={{
      marginTop: "8px",
      color: "#6b7280",
    }}
  >
    Follow these four steps to prepare and submit your Adobe Stock templates.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "20px",
      marginTop: "28px",
    }}
  >

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <div style={{ fontSize: "34px" }}>①</div>

      <h3>Configure Settings</h3>

      <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
        Configure Category Rules and Google Sheets before scanning templates.
      </p>
    </div>

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <div style={{ fontSize: "34px" }}>②</div>

      <h3>Prepare Templates</h3>

      <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
        Organize every template inside its own folder with the required files.
      </p>
    </div>

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <div style={{ fontSize: "34px" }}>③</div>

      <h3>Generate Excel</h3>

      <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
        Review the detected metadata and generate the Adobe Stock Excel file.
      </p>
    </div>

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <div style={{ fontSize: "34px" }}>④</div>

      <h3>Create ZIP Files</h3>

      <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
        Generate final ZIP packages and upload them to Adobe Stock.
      </p>
    </div>

  </div>
</div>


<div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "28px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
  }}
>

<h2
style={{
margin:0,
fontSize:"24px",
color:"#111827"
}}
>
📁 Template Folder Structure
</h2>

<p
style={{
marginTop:"8px",
color:"#6b7280",
lineHeight:1.8
}}
>
Every Adobe Stock template must be placed inside its own folder. The application scans the folder and automatically extracts metadata from the template file.
</p>

<div
style={{
display:"grid",
gridTemplateColumns:"1.2fr .8fr",
gap:"30px",
marginTop:"25px"
}}
>

<div>

<div
style={{
background:"#0f172a",
color:"#e5e7eb",
padding:"22px",
borderRadius:"14px",
fontFamily:"Consolas, monospace",
fontSize:"15px",
lineHeight:"30px"
}}
>

📂 Modern Business Flyer Template

<br/>

├── Modern Business Flyer Template.ait

<br/>

├── Thumbnail.jpg

<br/>

└── Preview1.jpg

</div>

</div>

<div>

<div
style={{
background:"#eff6ff",
borderRadius:"14px",
padding:"20px"
}}
>

<h3
style={{
marginTop:0,
color:"#1d4ed8"
}}
>
Application Rules
</h3>

<ul
style={{
paddingLeft:"18px",
lineHeight:"30px",
color:"#374151"
}}
>

<li>Only one template file per folder.</li>

<li>Supported file types:
<b> AIT, PSDT, INDT</b></li>

<li>Thumbnail.jpg is required.</li>

<li>Preview1.jpg is required.</li>

<li>The template filename becomes the Title.</li>

<li>The template filename is also used for the ZIP package.</li>

</ul>

</div>

</div>

</div>

</div>




<div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "28px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
  }}
>

<h2
style={{
margin:0,
fontSize:"24px",
color:"#111827",
}}
>
☁ Configure Google Sheets
</h2>

<p
style={{
marginTop:"8px",
color:"#6b7280",
lineHeight:1.8,
}}
>
Google Sheets integration allows the application to automatically upload template metadata after generating your Excel file.
</p>

<div
style={{
marginTop:"28px",
display:"grid",
gridTemplateColumns:"1fr 1fr",
gap:"24px",
}}
>

<div
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"22px",
}}
>

<h3 style={{marginTop:0}}>
Step 1
</h3>

<p>
Create a new Google Spreadsheet in your Google Drive.
</p>

</div>

<div
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"22px",
}}
>

<h3 style={{marginTop:0}}>
Step 2
</h3>

<p>
Open the spreadsheet and navigate to
<b> Extensions → Apps Script.</b>
</p>

</div>

<div
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"22px",
}}
>

<h3 style={{marginTop:0}}>
Step 3
</h3>

<p>
Delete the default Apps Script and replace it with the script provided below.
</p>

</div>

<div
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"22px",
}}
>

<h3 style={{marginTop:0}}>
Step 4
</h3>

<p>
Deploy the script as a
<b> Web App </b>
and copy the generated Web App URL.
</p>

</div>

<div
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"22px",
}}
>

<h3 style={{marginTop:0}}>
Step 5
</h3>

<p>
Open the application's
<b> Settings </b>
page.
</p>

</div>

<div
style={{
border:"1px solid #e5e7eb",
borderRadius:"14px",
padding:"22px",
}}
>

<h3 style={{marginTop:0}}>
Step 6
</h3>

<p>
Paste the Web App URL into
<b> Apps Script URL </b>
and enter the Worksheet Name.

Click
<b> Save Google Settings.</b>
</p>

</div>

</div>

</div>





<div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "28px",
    boxShadow: "0 10px 28px rgba(0,0,0,.05)",
  }}
>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  }}
>

  <h2
    style={{
      margin: 0,
      fontSize: "24px",
      color: "#111827",
    }}
  >
    📜 Google Apps Script
  </h2>

  <button
    onClick={copyScript}
    style={{
      background: "#2563eb",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "14px",
    }}
  >
    📋 Copy Script
  </button>

</div>

<p
style={{
marginTop:"8px",
color:"#6b7280",
lineHeight:1.8,
}}
>
Copy the following Apps Script and replace the default code inside your Google Apps Script project.
</p>

<div
style={{
marginTop:"25px",
background:"#0f172a",
color:"#e5e7eb",
borderRadius:"16px",
padding:"24px",
overflowX:"auto",
fontFamily:"Consolas, monospace",
fontSize:"14px",
lineHeight:"28px",
maxHeight:"420px",
overflowY:"auto",
}}
>

<pre
  style={{
    margin: 0,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    fontFamily: "Consolas, monospace",
    fontSize: "14px",
    lineHeight: "26px",
    color: "#ffffff",
  }}
>
{appScript}

</pre>

</div>

</div>


<div
  style={{
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    marginBottom: "28px",
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
    ❓ Frequently Asked Questions
  </h2>

  <p
    style={{
      marginTop: "10px",
      color: "#6b7280",
      lineHeight: 1.8,
    }}
  >
    Common questions and solutions when using Adobe Stock Submission Manager.
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "30px",
    }}
  >

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "22px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#111827",
        }}
      >
        Why isn't my template detected?
      </h3>

      <ul
        style={{
          color: "#4b5563",
          lineHeight: "28px",
          paddingLeft: "18px",
        }}
      >
        <li>Only AIT, PSDT and INDT files are supported.</li>
        <li>One template file per folder.</li>
        <li>Make sure the template file isn't corrupted.</li>
      </ul>
    </div>

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "22px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#111827",
        }}
      >
        Wrong category detected?
      </h3>

      <ul
        style={{
          color: "#4b5563",
          lineHeight: "28px",
          paddingLeft: "18px",
        }}
      >
        <li>Open the Settings page.</li>
        <li>Edit the Category Rules.</li>
        <li>Click Save Rules.</li>
        <li>Run Re-Detect Categories.</li>
      </ul>
    </div>

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "22px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#111827",
        }}
      >
        Google Sheet upload failed?
      </h3>

      <ul
        style={{
          color: "#4b5563",
          lineHeight: "28px",
          paddingLeft: "18px",
        }}
      >
        <li>Check the Apps Script URL.</li>
        <li>Verify the Worksheet Name.</li>
        <li>Deploy the Apps Script as a Web App.</li>
        <li>Allow access to Anyone.</li>
      </ul>
    </div>

    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "14px",
        padding: "22px",
      }}
    >
      <h3
        style={{
          marginTop: 0,
          color: "#111827",
        }}
      >
        ZIP package is incomplete?
      </h3>

      <ul
        style={{
          color: "#4b5563",
          lineHeight: "28px",
          paddingLeft: "18px",
        }}
      >
        <li>Thumbnail.jpg must exist.</li>
        <li>Preview1.jpg must exist.</li>
        <li>The template file must be inside the same folder.</li>
      </ul>
    </div>

  </div>

</div>



      </div>
    </Layout>
  );
}