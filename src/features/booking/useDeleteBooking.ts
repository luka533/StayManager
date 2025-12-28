import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useNavigate } from "react-router";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteBooking,
    isPending: isDeleting,
    error,
  } = useMutation<void, Error, number>({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      navigate(-1);
    },
  });

  return { deleteBooking, isDeleting, error };
}
