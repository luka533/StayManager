import { useQuery } from "@tanstack/react-query";
import { getApartments } from "../../services/apiApartments.ts";

import type { Apartments } from "../../types/apartments.ts";

export function useApartments() {
  const {
    isLoading,
    data: apartments,
    error,
  } = useQuery<Apartments[], Error>({
    queryKey: ["apartments"],
    queryFn: getApartments,
  });
  return { isLoading, apartments, error };
}
