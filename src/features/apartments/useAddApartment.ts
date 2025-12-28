import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addApartment as addApartmentApi } from "../../services/apiApartments";
import type { FormData } from "../../types/apartments";

export function useAddApartment() {
  const queryClient = useQueryClient();

  const { mutate: addApartment, isPending: isCreating } = useMutation<
    void,
    Error,
    FormData
  >({
    mutationFn: addApartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });

  return { addApartment, isCreating };
}
