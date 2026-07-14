import type { TemplateItem } from "../../types/template";
import Button from "../ui/Button";
import type { CategoryRule } from "../../types/category";

type Props = {
  item: TemplateItem;
  index: number;
  rules: CategoryRule[];
  updateTemplate: (
    index: number,
    field: keyof TemplateItem,
    value: string
  ) => void;

  removeTemplate: (index: number) => void;

  isValid: boolean;
  allErrors: string[];
};

export default function ReviewDesktopCard({
  item,
  index,
  rules,
  updateTemplate,
  removeTemplate,
  isValid,
  allErrors,
}: Props) {
return (
  <div
    style={{
  background: "#fff",
  padding: "14px 18px",
  display: "grid",
  gridTemplateColumns:
  "6% 24% 6% 9% 7% 7% 16% 8% 9%",
  gap: "14px",
  alignItems: "center",
  borderBottom: "1px solid #e5e7eb",
}}
  >

    {/* Thumbnail */}


<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: 0,
  }}
>
  <div
    style={{
      width: 18,
      textAlign: "center",
      fontWeight: 600,
      color: "#64748b",
    }}
  >
    {index + 1}
  </div>

  <div
    style={{
      width: "54px",
      height: "54px",
      borderRadius: "6px",
      overflow: "hidden",
      background: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >


   

    {item.thumbnail ? (
     <img
  src={item.thumbnail}
  alt=""
  onLoad={() => console.log("Loaded")}
  onError={() => {
    console.log("Image Error");
    console.log(item.thumbnail?.substring(0, 60));
  }}
  loading="lazy"
  draggable={false}
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }}
/>
    ) : (
      <span
        style={{
          fontSize: 20,
          opacity: .45,
        }}
      >
        📄
      </span>
    )}
  </div>
</div>

    {/* Title */}

    <div
  style={{
    minWidth: 0,
    overflow: "hidden",
  }}
>
      <input
        spellCheck={false}
        value={item.title}
        onChange={(e) => {
  const newTitle = e.target.value;

  updateTemplate(index, "title", newTitle);

  const prefix = item.filename
    .split("_")
    .slice(0, 2)
    .join("_");

  const safeTitle = newTitle
    .replace(/[\\/:*?"<>|]/g, "")
    .trim();

  updateTemplate(
    index,
    "filename",
    `${prefix}_${safeTitle}.zip`
  );
}}
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize:"17px",
          lineHeight:"24px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "8px",
          maxWidth: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          boxSizing: "border-box",
        }}
      />

   

      <div
      title={item.filename}
        style={{
          fontSize: "13px",
          color: "#64748b",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          width:"100%",
          display:"block",
        }}
      >
        {item.filename}
      </div>
    </div>
{/* Category */}

<div
  style={{
    minWidth: 0,
  }}
>

<select
  value={item.category}
  onChange={(e) =>
    updateTemplate(
      index,
      "category",
      e.target.value
    )
  }
  style={{
    width: "100%",
    height: "38px",
    borderRadius: "8px",
    border: item.category
      ? "1px solid #d1d5db"
      : "2px solid #ef4444",
    padding: "0 12px",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    boxSizing:"border-box",
  }}
>
  <option value="">Select</option>

  {[...new Set(rules.map((r) => r.category))].map(
    (category) => (
      <option
        key={category}
        value={category}
      >
        {category}
      </option>
    )
  )}
</select>
</div>

{/* Template Size */}

<div
  style={{
    minWidth:0,
  }}
>
<input
  value={item.templateSize}
  onChange={(e) =>
    updateTemplate(
      index,
      "templateSize",
      e.target.value
    )
  }
  style={{
    width: "100%",
    height: "42px",
    borderRadius: "10px",
    border: item.templateSize
      ? "1px solid #d1d5db"
      : "2px solid #ef4444",
    padding: "0 12px",
    fontSize:"14px",

    overflow: "hidden",
textOverflow: "ellipsis",
whiteSpace: "nowrap",
boxSizing:"border-box",
  }}
/>
</div>

{/* Pages */}

<div
  style={{
    minWidth: 0,
  }}
>
  <input
    value={item.pages}
    onChange={(e) =>
      updateTemplate(
        index,
        "pages",
        e.target.value
      )
    }
    style={{
      width: "100%",
      height: "42px",
      borderRadius: "10px",
      border: item.pages
        ? "1px solid #d1d5db"
        : "2px solid #ef4444",
      padding: "0 12px",
      fontSize: "14px",
      boxSizing: "border-box",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }}
  />
</div>

{/* Colorspace */}

<div
  style={{
    minWidth:0,
  }}
>

<select
  value={item.colorspace}
  onChange={(e) =>
    updateTemplate(
      index,
      "colorspace",
      e.target.value
    )
  }
  style={{
    width: "100%",
    height: "42px",
    borderRadius: "10px",
    border: item.colorspace
  ? "1px solid #d1d5db"
  : "2px solid #ef4444",
    padding: "0 12px",
    background: "#fff",
    fontSize: "14px",
    cursor: "pointer",
    boxSizing:"border-box",
  }}
>
  <option value="">Select</option>
  <option value="RGB">RGB</option>
  <option value="CMYK">CMYK</option>
</select>
</div>

{/* Keywords */}

<div
style={{
    minWidth:0,
}}
>
<input
spellCheck={false}
  value={item.keywords}
  onChange={(e) =>
    updateTemplate(
      index,
      "keywords",
      e.target.value
    )
  }
  style={{
    width: "100%",
    height: "42px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    padding: "0 12px",
    fontSize:"14px",
    boxSizing:"border-box",
    overflow:"hidden",
    textOverflow:"ellipsis",
    whiteSpace:"nowrap",
  }}
/>

</div>


{/* Status */}

<div
style={{
    textAlign:"center",
    minWidth:0,
}}
>
  <div
    style={{
      display: "inline-block",
      minWidth: "90px",
      padding:"8px 14px",
      borderRadius: "999px",
      background: isValid
        ? "#dcfce7"
        : "#fee2e2",
      color: isValid
        ? "#15803d"
        : "#dc2626",
      fontWeight: 700,
      fontSize: "13px",
      textAlign: "center",
    }}
  >
    {isValid ? "VALID" : "INVALID"}
  </div>

  {!isValid && (
    <div
style={{
marginTop:"8px",
color:"#dc2626",
fontSize:"12px",

wordBreak:"break-word",
overflowWrap:"anywhere",
lineHeight:"16px",
}}
>
      {allErrors.join(", ")}
    </div>
  )}
</div>

<div
style={{
display:"flex",
justifyContent:"center",
minWidth:0,
}}
>
  <Button
    color="red"
    variant="outline"
    size="sm"
    onClick={() => removeTemplate(index)}
  >
    Delete
  </Button>
</div>

  </div>
);

}

