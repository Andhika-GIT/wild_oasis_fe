import { getSpesificUserBooking } from "@/app/action/booking";
import EditReservationForm from "@/components/page/reservation/EditReservationForm";
import { NextPage } from "next";
import React from "react";

type ReservationEditPageProps = {
  params: {
    bookingId: string;
  };
};

const page: NextPage<ReservationEditPageProps> = async ({ params }) => {
  const { bookingId } = params;

  const booking = await getSpesificUserBooking(parseInt(bookingId));

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <EditReservationForm booking={booking} bookingId={bookingId} />
    </div>
  );
};

export default page;
