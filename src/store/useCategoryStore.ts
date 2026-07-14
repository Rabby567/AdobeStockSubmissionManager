import { create } from "zustand";
import type { CategoryRule } from "../types/category";


interface CategoryStore {
  rules: CategoryRule[];

  setRules: (
    rules: CategoryRule[]
  ) => void;

  addRule: () => void;

  deleteRule: (
    index: number
  ) => void;

  updateRule: (
    index: number,
    field: string,
    value: string
  ) => void;
}

export const useCategoryStore =
  create<CategoryStore>((set) => ({

    rules: [
      {
        keyword: "brochure",
        category: "13",
      },
      {
        keyword: "business card",
        category: "14",
      },
      {
        keyword: "flyer",
        category: "19",
      },
    ],

    setRules: (rules) =>
      set({ rules }),

    addRule: () =>
      set((state) => ({
        rules: [
          ...state.rules,
          {
            keyword: "",
            category: "",
          },
        ],
      })),

    deleteRule: (index) =>
      set((state) => ({
        rules: state.rules.filter(
          (_, i) => i !== index
        ),
      })),

    updateRule: (
  index,
  field,
  value
) => {

  console.log(
    "UPDATE",
    index,
    field,
    value
  );

  set((state) => ({
    rules: state.rules.map(
      (rule, i) =>
        i === index
          ? {
              ...rule,
              [field]: value,
            }
          : rule
    ),
  }));

},
  }));