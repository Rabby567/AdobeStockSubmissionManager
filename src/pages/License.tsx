import { useState } from "react";
import { APP_CONFIG } from "../config/app";
export default function License() {

  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const activate = async () => {
        console.log("BUTTON CLICKED");

  setError("");

  if (!licenseKey.trim()) {
    setError("Please enter a license key.");
    return;
  }

  try {

    setLoading(true);

    const result =
      await window.electronAPI.activateLicense({
        licenseKey,
      });

    if (result.success) {

  window.location.reload();
  return;

} else {

      setError(
        result.message ||
        "Activation failed."
      );

    }

  } catch {

    setError(
      "Unable to connect to License Server."
    );

  } finally {

    setLoading(false);

  }

};

 

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#fff",
          borderRadius: "22px",
          padding: "40px",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.08)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              color: "#111827",
            }}
          >
            Adobe Stock
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#6b7280",
            }}
          >
            Submission Manager
          </p>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            color: "#111827",
          }}
        >
          🔒 License Activation
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: "#6b7280",
            lineHeight: 1.7,
          }}
        >
          Enter your license key to activate the
          application.
        </p>

        <div
          style={{
            marginTop: "28px",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            License Key
          </label>

          <input
            value={licenseKey}
            onChange={(e) =>
              setLicenseKey(e.target.value)
            }
            placeholder="ASSM-XXXX-XXXX-XXXX"
            style={{
              width: "100%",
              padding: "14px 16px",
              fontSize: "16px",
              borderRadius: "10px",
              border: "1px solid #d1d5db",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

       <button
  onClick={activate}
  disabled={loading}
  style={{
    width: "100%",
    marginTop: "24px",
    padding: "15px",
    background: loading
      ? "#9ca3af"
      : "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 700,
    cursor: loading
      ? "default"
      : "pointer",
  }}
>
  {loading
    ? "Activating..."
    : "Activate License"}
</button>

{
  error && (
    <div
      style={{
        marginTop: 16,
        color: "#dc2626",
        fontWeight: 600,
      }}
    >
      {error}
    </div>
  )
}

        <div
          style={{
            marginTop: "35px",
            paddingTop: "20px",
            borderTop: "1px solid #e5e7eb",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
          }}
        >
          Need a license?

          <br />

          Contact the software provider.

          <br /><br />

          Version {APP_CONFIG.VERSION}
        </div>

      </div>
    </div>
  );

}