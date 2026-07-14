import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuStyle = ({ isActive }: { isActive: boolean }) => ({
    display: "block",
    padding: "14px 18px",
    marginBottom: "8px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 500,
    transition: "0.2s",

    background: isActive
      ? "#3B82F6"
      : "transparent",

    color: isActive
      ? "#fff"
      : "#d1d5db",
  });

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        background: "#111827",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        boxSizing: "border-box",
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            color: "#ffffff",
          }}
        >
          Adobe Stock
        </h2>

        <p
          style={{
            marginTop: "6px",
            color: "#ffffff",
            fontSize: "14px",
          }}
        >
          Submission Manager
        </p>
      </div>

      <nav
        style={{
          marginTop: "40px",
        }}
      >
        <NavLink
          to="/"
          style={menuStyle}
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/review"
          style={menuStyle}
        >
          📋 Review
        </NavLink>

        <NavLink
          to="/settings"
          style={menuStyle}
        >
          ⚙ Settings
        </NavLink>

        <NavLink
  to="/guide"
  style={menuStyle}
>
  📖 User Guide
</NavLink>

      </nav>

      

      <div
        style={{
          marginTop: "auto",
          borderTop: "1px solid #374151",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            color: "#9ca3af",
            fontSize: "13px",
          }}
        >
          Developed by Fazle Rabby <br />
          © 2026 All Rights Reserved. <br />
          Version 1.0.0
          
        </div>

        <div
          style={{
            color: "#9ca3af",
            fontSize: "10px",
          }}
        >
          Built with the assistance of AI tools for development,
debugging, and content generation.
        </div>

      </div>
    </aside>
  );
}