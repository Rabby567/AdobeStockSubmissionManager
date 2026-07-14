import type { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  page: {
    padding: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(0,0,0,.06)",
  },

  headerCard: {
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 12px 30px rgba(15,23,42,.08)",
    marginBottom: "24px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 700,
    color: "#1f2937",
  },

  badge: {
    background: "#eef4ff",
    color: "#2563eb",
    padding: "8px 16px",
    borderRadius: "999px",
    fontWeight: 700,
    fontSize: "14px",
  },

};