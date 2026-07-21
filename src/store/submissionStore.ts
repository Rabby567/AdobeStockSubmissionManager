import { create } from "zustand";

interface SubmissionState {
  date: string;
  batchNumber: string;

  setDate: (date: string) => void;
  setBatchNumber: (batch: string) => void;
}

export const useSubmissionStore = create<SubmissionState>((set) => ({
  date: "",
  batchNumber: "",

  setDate: (date) =>
    set({
      date,
    }),

  setBatchNumber: (batchNumber) =>
    set({
      batchNumber,
    }),
}));