import { create } from "zustand";

interface GoogleSheetStore {

  enabled: boolean;

  scriptUrl: string;

  sheetName: string;

  setEnabled: (
    value: boolean
  ) => void;

  setScriptUrl: (
    value: string
  ) => void;

  setSheetName: (
    value: string
  ) => void;
}

export const useGoogleSheetStore =
create<GoogleSheetStore>((set) => ({

  enabled: false,

  scriptUrl: "",

  sheetName: "Templates",

  setEnabled: (value) =>
    set({
      enabled: value,
    }),

  setScriptUrl: (value) =>
    set({
      scriptUrl: value,
    }),

  setSheetName: (value) =>
    set({
      sheetName: value,
    }),
}));