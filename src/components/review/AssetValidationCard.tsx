import Button from "../ui/Button";
import type { TemplateItem } from "../../types/template";
type Props = {
  templates: TemplateItem[];
  onViewReport: () => void;
};

export default function AssetValidationCard({
  templates,
  onViewReport,
}: Props) {
  const thumbValid =
    templates.filter(t => t.thumbnailValid).length;

  const thumbInvalid =
    templates.length - thumbValid;

  const previewValid =
    templates.filter(t => t.previewValid).length;

  const previewInvalid =
    templates.length - previewValid;

  const allValid =
    thumbInvalid === 0 &&
    previewInvalid === 0;

  return (
  <div
  style={{
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    minWidth: 360,

    height: "100%",
    boxSizing: "border-box",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  }}

    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 18,
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        Asset Validation
      </h3>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span>Thumbnail</span>

        <span>
          ✅ {thumbValid} &nbsp;&nbsp;
          ❌ {thumbInvalid}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <span>Preview</span>

        <span>
          ✅ {previewValid} &nbsp;&nbsp;
          ❌ {previewInvalid}
        </span>
      </div>

      {allValid ? (
        <div
          style={{
            color: "#16a34a",
            fontWeight: 700,
          }}
        >
          All Assets Valid
        </div>
      ) : (
  <Button
  color="blue"
  size="lg"
  onClick={onViewReport}
  loadingText="Opening..."
  successText="Viewed"
>
  View Report
</Button>
      )}
    </div>
  );
}