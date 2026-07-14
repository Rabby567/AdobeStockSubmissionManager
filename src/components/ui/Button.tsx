import "./Button.css";
import { useState } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => Promise<void> | void;


  color?: "blue" | "green" | "red";

  variant?: "solid" | "outline";

  size?: "xsm" | "sm" | "md" | "lg" | "xl";

  loadingText?: string;
  successText?: string;

  animated?: boolean;

  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  color = "blue",
  variant = "solid",
  size = "md",
  loadingText = "Saving...",
  successText = "Saved",
  animated = true,
  disabled = false,
}: ButtonProps) {

  const [state, setState] =
    useState<"idle" | "loading" | "success">(
      "idle"
    );

  const handleClick = async () => {

  if (disabled) return;

  if (animated && state !== "idle") return;

  try {

    if (animated) {
      setState("loading");
    }

    await onClick?.();

    if (animated) {

      setState("success");

      setTimeout(() => {

        setState("idle");

      }, 1000);

    }

  } catch {

    if (animated) {
      setState("idle");
    }

  }

};

  return (

    <button
      className={`
        ui-btn
        ${variant}
        ${color}
        ${size}
        ${state}
      `}
      disabled={disabled}
      onClick={handleClick}
    >

      {state === "idle" && children}

      {state === "loading" && (

        <>

          <span className="spinner"></span>

          <span>{loadingText}</span>

        </>

      )}

      {state === "success" && (

        <span>{successText}</span>

      )}

    </button>

  );

}