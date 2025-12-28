import { useQuery } from "@tanstack/react-query";
import { getApartment } from "../../services/apiApartments";
import type { Apartments } from "../../types/apartments";

export function useApartment(id: number) {
  const {
    data: apartment,
    isLoading,
    error,
  } = useQuery<Apartments, Error>({
    queryKey: ["apartment"],
    queryFn: () => getApartment(id),
  });

  return { apartment, isLoading, error };
}
