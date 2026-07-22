import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";

type Props = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

export default function LicenseGate({
  children,
  fallback,
}: Props) {

  console.log("LicenseGate Loaded");

  const [checking, setChecking] = useState(true);
  const [licensed, setLicensed] = useState(false);
  const [suspended, setSuspended] = useState(false);

 useEffect(() => {


  async function run() {

    try {

      console.log("Checking License...");

      const result =
        await window.electronAPI.checkLicense();

      console.log("License Result:", result);

      if (result?.suspended) {
  setSuspended(true);
  setLicensed(false);
} else {
  setSuspended(false);
  setLicensed(result?.activated === true);
}

    } catch (err) {

      console.error(err);

      setLicensed(false);

    } finally {

      setChecking(false);

    }

  }

  run();

}, []);

  if (checking) {
    return <LoadingScreen />;
}

  if (suspended) {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2>License Suspended</h2>
        <p>
          Your license has been suspended.
          <br />
          Please contact the administrator.
        </p>
      </div>
    </div>
  );
}

if (!licensed) {
  return <>{fallback}</>;
}

  return <>{children}</>;

}