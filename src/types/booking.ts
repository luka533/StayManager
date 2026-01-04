export type Apartment = {
  created_at: string;
  description: string;
  discount: number;
  id: number;
  image: string;
  maxCapacity: number;
  name: string;
  regularPrice: number;
};

export type Guests = {
  created_at: string;
  email: string;
  fullName: string;
  id: number;
};

export interface Booking {
  apartments: Apartment;
  guests: Guests;

  apartmentId: number;
  apartmentPrice: number;
  created_at: string;
  endDate: string;
  extrasPrice: number;
  guestId: number;
  hasBreakfast: boolean;
  id: number;
  isPaid: boolean;
  numGuests: number;
  numNights: number;
  observations: string;
  startDate: string;
  status: "unconfirmed" | "checked-out" | "checked-in";
  totalPrice: number;
}
