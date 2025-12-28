import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

import type { Bookings } from "../../types/bookings";

// return actually bookings.data from bookings so name might be misleading
export function useBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery<{ data: Bookings[]; count: number | null }>({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return { bookings, isLoading, error };
}
