import type { TemplateItem } from "../../types/template";

type Props = {
  templates: TemplateItem[];
  onClose: () => void;
};

export default function AssetValidationReport({
  templates,
  onClose,
}: Props) {

  const invalidTemplates =
    templates.filter(
      t =>
        !t.thumbnailValid ||
        !t.previewValid
    );

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >

     <div
  style={{
    width: 980,
    maxWidth: "92vw",

    maxHeight: "85vh",

    overflowY: "auto",

    background: "#fff",

    borderRadius: 20,

    padding: 30,

    boxShadow:
      "0 20px 60px rgba(0,0,0,.18)",
  }}
>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 24,
          }}
        >

          <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: 12,
  }}
>
  <span
    style={{
      fontSize: 24,
    }}
  >
    🖼️
  </span>

  <h2
    style={{
      margin: 0,
      fontSize: 28,
      fontWeight: 800,
      color: "#111827",
    }}
  >
    Asset Validation Report
  </h2>
</div>

          <button
  onClick={onClose}
  style={{
    width: 38,
    height: 38,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    fontSize: 18,
    fontWeight: 700,
    color: "#64748b",

    transition: ".2s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = "#f8fafc";
    e.currentTarget.style.borderColor = "#cbd5e1";
    e.currentTarget.style.color = "#ef4444";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = "#fff";
    e.currentTarget.style.borderColor = "#e5e7eb";
    e.currentTarget.style.color = "#64748b";
  }}
>
  ✕
</button>

        </div>

        {invalidTemplates.length === 0 ? (

          <div
            style={{
              color: "#16a34a",
              fontWeight: 700,
            }}
          >
            ✔ All Assets Valid
          </div>

        ) : (

          invalidTemplates.map(
            (item, index) => (

              <div
  key={index}
  style={{
    border: "1px solid #e5e7eb",

    borderLeft: "6px solid #ef4444",

    borderRadius: 16,

    padding: 22,

    marginBottom: 22,

    background: "#fafafa",
  }}
>

                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    marginBottom: 10,
                  }}
                >
                  Template # {templates.indexOf(item) + 1}
                </div>

                <div
                  style={{
    fontWeight:700,
    fontSize:20,
    color:"#111827",
    marginBottom:20,
}}
                >
                  {item.title}
                </div>

                {!item.thumbnailValid && (

                  <div
                    style={{
                      marginBottom: 20,
                    }}
                  >

                    <b>thumbnail.jpg</b>

                    <br /><br />

                    <div
style={{
fontWeight:700,
color:"#dc2626",
marginBottom:6,
}}
>
Found
</div>

                    <br />

                    {item.thumbnailWidth} × {item.thumbnailHeight}

                    <br /><br />

                   <div
style={{
fontWeight:700,
color:"#16a34a",
marginTop:12,
marginBottom:6,
}}
>
Expected
</div>

                    <br />

                    2048 × 1424

                  </div>

                )}

                {!item.previewValid && (

                  <div>

                    <b>preview1.jpg</b>

                    <br /><br />

                   <div
style={{
fontWeight:700,
color:"#dc2626",
marginBottom:6,
}}
>
Found
</div>

                    <br />

                    {item.previewWidth} × {item.previewHeight}

                    <br /><br />

                    <div
style={{
fontWeight:700,
color:"#16a34a",
marginTop:12,
marginBottom:6,
}}
>
Expected
</div>

                    <br />

                    Width : 2048

                    <br />

                    Height : 1536–6144

                  </div>

                )}

              </div>

            )
          )

        )}

      </div>

    </div>

  );

}