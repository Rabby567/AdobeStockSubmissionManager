import { styles } from "./reviewStyles";
import Button from "../ui/Button";

type GoogleUploadCardProps = {
  progress: number;
  onRedetect: () => void;
};

export default function GoogleUploadCard({
  progress,
  onRedetect,
}: GoogleUploadCardProps) {
  return (
 <div
  style={{
    ...styles.card,
    marginBottom: "24px",

    height: "100%",
    boxSizing: "border-box",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}
>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 700,
          }}
        >
          Google Sheet Upload
        </h3>

        <span
          style={{
            background: "#eef4ff",
            color: "#2563eb",
            padding: "6px 12px",
            borderRadius: "999px",
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          {progress}%
        </span>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2563eb",
            transition: "0.3s",
          }}
        />
      </div>

      <Button
  color="blue"
  variant="outline"
  size="lg"
  loadingText="Updating..."
  successText="Updated"
  onClick={onRedetect}
>
  Re-Detect Categories
</Button>
    </div>
  );
}