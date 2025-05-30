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
  created_at: string;
  cabin: { name: string; image: string, max_capacity: number };
};

export type BookedDates = string[];
