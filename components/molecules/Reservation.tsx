import { getBookedDatesByCabinId } from "@/app/action/booking";
import { getSetting } from "@/app/action/setting";
import { DateSelector } from "./DateSelector";
import { ReservationForm } from "./ReservationForm";
import { Cabin } from "@/types";
import { NextPage } from "next";

type ReservationProps = {
  cabin: Cabin | undefined;
};

export const Reservation: NextPage<ReservationProps> = async ({ cabin }) => {
  const [setting, bookedDates] = await Promise.all([
    getSetting(),
    getBookedDatesByCabinId(cabin?.id),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector setting={setting} bookedDates={bookedDates} cabin={cabin} />
      <ReservationForm cabin={cabin} />
    </div>
  );
};
