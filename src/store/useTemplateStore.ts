import { create } from "zustand";

import type { TemplateItem } from "../types/template";

interface TemplateStore {

  templates: TemplateItem[];

  setTemplates: (templates: TemplateItem[]) => void;

  updateTemplate: (
    index:number,
    field:string,
    value:string
  )=>void;

  removeTemplate: (
    index:number
  )=>void;

  updateFilenamePrefix: (
    date:string,
    batch:string
  )=>void;

}


export const useTemplateStore = create<TemplateStore>((set) => ({
  templates: [],

  setTemplates: (templates) =>
  set({
    templates: templates.map((item) => {

      const validationErrors = [
        ...(item.validationErrors || []),
      ];

      if (!item.category) {
        validationErrors.push(
          "Missing Category"
        );
      }

      return {
        ...item,
        valid:
          validationErrors.length === 0,
        validationErrors,
      };
    }),
  }),

  updateTemplate: (index, field, value) =>
  set((state) => ({
    templates: state.templates.map((item, i) => {

      if (i !== index) {
        return item;
      }

      const updatedItem = {
  ...item,
  [field]: value,
};

if (field === "title") {

  const cleanTitle =
    value
      .replace(/[\\/:*?"<>|]/g, "")
      .trim();

  const prefix =
    item.filename?.split("_")
      .slice(0, 2)
      .join("_") || "";

  updatedItem.filename =
    prefix
      ? `${prefix}_${cleanTitle}.zip`
      : `${cleanTitle}.zip`;
}

      const validationErrors = [];

      if (!updatedItem.templateSize) {
        validationErrors.push(
          "Missing Template Size"
        );
      }

      if (!updatedItem.pages) {
        validationErrors.push(
          "Missing Pages"
        );
      }

      if (!updatedItem.category) {

  validationErrors.push(
    "Missing Category"
  );

} else {

  const categoryNumber =
    Number(updatedItem.category);

  if (
    Number.isNaN(categoryNumber) ||
    categoryNumber < 1 ||
    categoryNumber > 50
  ) {
    validationErrors.push(
      "Invalid Category"
    );
  }
}

      return {
        ...updatedItem,
        valid: validationErrors.length === 0,
        validationErrors,
      };
    }),
  })),

  removeTemplate: (index) =>
  set((state) => ({
    templates: state.templates.filter(
      (_, i) => i !== index
    ),
  })),


  updateFilenamePrefix: (date, batch) =>
set((state) => ({

templates: state.templates.map(item => {

const title = item.filename
  .replace(/\.zip$/i, "")
  .replace(/^\d{8}_Batch\d+_/, "")
  .replace(/^_?Batch_?/i, "")
  .replace(/^_+/, "");

return {

...item,

filename:
`${date}_Batch${batch}_${title}.zip`

};

})

})),


}));