import supabase from "./supabase";

import type { Bookings } from "../types/bookings";
import type { RecentBookings } from "../types/bookings";
import type { Booking } from "../types/booking";

export async function getBookings(): Promise<{
  data: Bookings[];
  count: number | null;
}> {
  const query = supabase
    .from("bookings")
    .select(
      "id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, apartments(name, image), guests(fullName, email)",
      { count: "exact" }
    );

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return { data: data ?? [], count };
}

export async function getBooking(id: number): Promise<Booking> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, apartments(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

export async function updateBooking(
  id: number,
  obj: { status: "checked-in" | "checked-out" }
): Promise<void> {
  const { error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
}

export async function deleteBooking(id: number): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(
  date: string
): Promise<RecentBookings[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "created_at, totalPrice, extrasPrice, status, numNights, apartments(name, id)"
    )
    .gte("created_at", date)
    .lte("created_at", new Date().toISOString());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}
