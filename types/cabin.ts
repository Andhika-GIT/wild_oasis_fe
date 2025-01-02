export type Cabin = {
  id: number;
  name: string;
  description: string;
  max_capacity: number;
  regular_price: number;
  discount: number;
  image: string;
};

export type CabinCapacityFilter = {
  maxCapacityFilter: number | null;
};
