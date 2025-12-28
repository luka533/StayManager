import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editApartment as editApartmentApi } from "../../services/apiApartments";
import type { Apartments } from "../../types/apartments";

export function useEditApartment() {
  const queryClient = useQueryClient();

  const { mutate: editApartment, isPending: isEditing } = useMutation<
    void,
    Error,
    { id: number; data: Apartments }
  >({
    mutationFn: ({ id, data }: { id: number; data: Apartments }) =>
      editApartmentApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });
  return { editApartment, isEditing };
}
