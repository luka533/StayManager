import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { getBooking } from "../../services/apiBookings";
import type { Booking } from "../../types/booking";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    isLoading,
    error,
  } = useQuery<Booking>({
    queryKey: ["booking", Number(bookingId)],
    queryFn: () => getBooking(Number(bookingId)),
  });

  return { booking, isLoading, error };
}
