import type { TemplateItem } from "../../types/template";
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

  isValid: boolean;
  allErrors: string[];
};

export default function ReviewCompactCard({
  item,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "18px",
      }}
    >
      <h3>{item.title}</h3>
    </div>
  );
}