export interface Bookings {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  totalPrice: number;
  status: "checked-in" | "checked-out" | "unconfirmed";

  apartments: {
    name: string;
    image: string;
  }[];

  guests: {
    fullName: string;
    email: string;
  }[];
}

export interface RecentBookings {
  apartments: {
    id: number;
    name: string;
  }[];
  created_at: string;
  extrasPrice: number;
  numNights: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  totalPrice: number;
}

export interface RevenueItem {
  date: string;
  revenue: number;
}
