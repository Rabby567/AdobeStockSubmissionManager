import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { APP_CONFIG } from "../config/app";
import "../index.css";

export default function LicenseInfo() {

 type LicenseData = {
    status?: string;

    activated: boolean;

    customer: string;

    email: string;

    licenseKey: string;

    deviceId: string;

    plan: string;

    expiry: string;

    activatedOn?: string;

    lastCheck?: string;

    lastOnlineVerification?: string;
};

const [version,setVersion]=useState("");


const [license, setLicense] =
  useState<LicenseData | null>(null);


useEffect(() => {

  async function loadLicense() {



 const ver =
await window.electronAPI.getVersion();

setVersion(ver);




    const data =
  (await window.electronAPI.getLicenseInfo()) as LicenseData;

setLicense(data);

  }

  loadLicense();
}, []);

function getRemainingDays(expiry: string) {
  const expiryDate = new Date(expiry);
  const today = new Date();

  const diff =
    expiryDate.getTime() -
    today.getTime();

  return Math.max(
    0,
    Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    )
  );
}

if (!license) {
  return (
    <Layout>
      <div style={{ padding: 40 }}>
        Loading License...
      </div>
    </Layout>
  );
}

  return (
  <Layout>
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >

      {/* Hero */}

      <div
        style={{
          background: "#ffffff",
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
          🔐 License Information
        </h1>

        <p
          style={{
            marginTop: "12px",
            fontSize: "16px",
            color: "#6b7280",
            lineHeight: 1.8,
          }}
        >
          View your current software license information.
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
              background: "#ecfdf5",
              color: "#15803d",
              padding: "8px 16px",
              borderRadius: "999px",
              fontWeight: 600,
            }}
          >
            {license.activated
  ? "🟢 Active License"
  : "🔴 Inactive License"}
          </div>

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

        </div>

      </div>

      {/* License Information */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "30px",
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
          License Overview
        </h2>

        <p
          style={{
            marginTop: "8px",
            color: "#6b7280",
          }}
        >
          Current license details for this application.
        </p>

        <div
          style={{
            marginTop: "28px",
          }}
        >

          <Info
  title="License Status"
  value={license.activated ? "🟢 Active" : "🔴 Inactive"}
/>

<Info
  title="Customer"
  value={license.customer || "-"}
/>

<Info
  title="Email"
  value={license.email || "-"}
/>

<Info
  title="License Key"
  value={license.licenseKey || "-"}
/>

<Info
  title="Plan"
  value={license.plan || "-"}
/>

<Info
  title="Activated On"
  value={license.activatedOn || "-"}
/>

<Info
  title="Expires On"
  value={license.expiry || "-"}
/>

<Info
  title="Days Remaining"
  value={`${getRemainingDays(
    license.expiry
  )} Days`}
/>

<Info

title="Application Version"

value={version}

/>

<Info
  title="Device ID"
  value={license.deviceId || "-"}
/>

        </div>

      </div>

      {/* Bottom Cards */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "24px",
    marginTop: "28px",
  }}
>

  {/* Features */}

  <div
    style={{
      background: "#fff",
      borderRadius: "18px",
      padding: "24px",
      boxShadow: "0 10px 25px rgba(0,0,0,.05)",
    }}
  >

    <h3 style={{ marginTop: 0 }}>
      ⭐ License Features
    </h3>

    <ul
      style={{
        marginTop: "20px",
        lineHeight: 2,
        color: "#475569",
        paddingLeft: "20px",
      }}
    >
      <li>Unlimited Template Validation</li>
      <li>Google Sheets Upload</li>
      <li>Batch ZIP Generation</li>
      <li>Automatic Updates</li>
      <li>Priority Support</li>
    </ul>

  </div>

  {/* Tips */}

  <div
    style={{
      background: "#fff",
      borderRadius: "18px",
      padding: "24px",
      boxShadow: "0 10px 25px rgba(0,0,0,.05)",
    }}
  >

    <h3 style={{ marginTop: 0 }}>
      💡 License Tips
    </h3>

    <p
      style={{
        color: "#64748b",
        lineHeight: 1.8,
        marginTop: 20,
      }}
    >
      Keep your license key safe.
      Do not share it with others.
      Internet connection is required
      occasionally for license verification.
    </p>

  </div>

  {/* Support */}

  <div
    style={{
      background: "#ffffff",
      color: "#000000",
      borderRadius: "18px",
      padding: "24px",
      boxShadow: "0 10px 25px rgba(37,99,235,.25)",
    }}
  >

    <h3 style={{ marginTop: 0 }}>
      🛟 Need Help?
    </h3>

    <p
      style={{
        lineHeight: 1.8,
        opacity: .95,
        marginTop: 20,
      }}
    >
      Contact the developer if you have
      any license activation issues or
      renewal questions.
    </p>

    <div
      style={{
        marginTop: "18px",
        fontWeight: 700,
      }}
    >
      fazlerabbybogra24@gmail.com
    </div>

  </div>

</div>


    </div>
  </Layout>
);
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
  display: "grid",
  gridTemplateColumns: "220px 1fr",
  alignItems: "center",
  padding: "14px 0",
  borderBottom: "1px solid #e5e7eb",
  columnGap: "30px",
}}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: "15px",
          fontWeight: 500,
          minWidth: "180px",
        }}
      >
        {title}
      </div>

      <div
        style={{
  color: "#111827",
  fontSize: "16px",
  fontWeight: 600,
  textAlign: "left",
  wordBreak: "break-all",
}}
      >
        {value}
      </div>
    </div>
  );
}