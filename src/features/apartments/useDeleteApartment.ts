import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartment as deleteApartmentApi } from "../../services/apiApartments";

export function useDeleteApartment() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteApartment } = useMutation<
    void,
    Error,
    number
  >({
    mutationFn: (id) => deleteApartmentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });

  return { isDeleting, deleteApartment };
}
