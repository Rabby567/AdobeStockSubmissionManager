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

 useEffect(() => {


  async function run() {

    try {

      console.log("Checking License...");

      const result =
        await window.electronAPI.checkLicense();

      console.log("License Result:", result);

      setLicensed(
        result?.activated === true
      );

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

  if (!licensed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;

}