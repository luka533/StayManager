import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateApartment as duplicateApartmentApi } from "../../services/apiApartments";

export function useDuplicateApartment() {
  const queryClient = useQueryClient();

  const { isPending: isDuplicating, mutate: duplicateApartment } = useMutation<
    void,
    Error,
    number
  >({
    mutationFn: duplicateApartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["apartments"],
      });
    },
  });

  return { isDuplicating, duplicateApartment };
}
