import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 400ms ease",
      }}
    >
      <div style={{ width: 260 }}>
        <Lottie animationData={loadingAnimation} loop />
      </div>
    </div>
  );
}