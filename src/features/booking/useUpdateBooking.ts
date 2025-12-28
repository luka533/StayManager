import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import { useParams } from "react-router";

export function useUpdateBooking() {
  const queryClient = useQueryClient();

  const { bookingId } = useParams();

  const {
    mutate: updateBooking,
    isPending: isUpdating,
    error,
  } = useMutation<
    void,
    Error,
    {
      bookingId: number;
      newData: { status: "checked-in" | "checked-out" };
    }
  >({
    mutationFn: function ({ bookingId, newData }) {
      return updateBookingApi(bookingId, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking", Number(bookingId)],
      });
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error) => {
      console.warn(error.message);
    },
  });

  return { updateBooking, isUpdating, error };
}
