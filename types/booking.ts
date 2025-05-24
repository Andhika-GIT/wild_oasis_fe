export type BookingReservation = {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status: string;
  created_at: string;
  cabins: { name: string; image: string };
};

export type Booking = {
  id: number;
  start_date: string;     // ISO 8601 format (timestamp string)
  end_date: string;
  num_nights: number;
  num_guests: number;
  cabin_price: number;
  extras_price: number;
  total_price: number;
  status: string;
  has_breakfast: boolean;
  is_paid: boolean;
  observations: string;
  cabin_id: number;
};

export type BookedDates = string[];
