import { styles } from "./reviewStyles";
import Button from "../ui/Button";

type ReviewHeaderProps = {
  onGenerateExcel: () => void;
  onGeneratePackages: () => void;
};

export default function ReviewHeader({
  onGenerateExcel,
  onGeneratePackages,
}: ReviewHeaderProps) {
  return (
    <div style={styles.headerCard}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "36px",
              fontWeight: 700,
              color: "#1f2937",
            }}
          >
            Review Templates
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Review scanned templates before generating Excel and ZIP packages.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <Button
  color="blue"
  variant="solid"
  size="lg"
  loadingText="Generating..."
  successText="Done"
  onClick={onGenerateExcel}
>
  Generate Excel
</Button>

          <Button
  color="green"
  variant="solid"
  size="xl"
  loadingText="Generating..."
  successText="Done"
  onClick={onGeneratePackages}
>
  Generate ZIP Packages
</Button>

        </div>
      </div>
    </div>
  );
}