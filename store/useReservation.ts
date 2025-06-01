import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { create } from "zustand";

type States = {
  range: DateRange | undefined;
};

type Actions = {
  setRange: SelectRangeEventHandler;
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
