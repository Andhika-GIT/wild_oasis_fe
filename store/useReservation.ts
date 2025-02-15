import { DateRange } from "react-day-picker";
import { create } from "zustand";

type States = {
  range: DateRange | undefined;
};

type Actions = {
  setRange: (range: DateRange) => void;
  resetRange: () => void;
};

const defaultInitState: DateRange = {
  from: undefined,
  to: undefined,
};

export const useReservation = create<States & Actions>((set) => ({
  range: defaultInitState,
  setRange: (range) => set({ range: range }),
  resetRange: () => set({ range: defaultInitState }),
}));
