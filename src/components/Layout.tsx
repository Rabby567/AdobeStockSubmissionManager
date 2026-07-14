import type { ReactNode } from "react";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f3f4f6",
      }}
    >
      <Sidebar />

      <main
  style={{
    flex: 1,
    height: "100vh",
    overflowY: "auto",
    padding: "24px",
    boxSizing: "border-box",
  }}
>
        {children}
      </main>
    </div>
  );
}