import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

interface Settings {
  breakfastPrice: number;
  checkInTime: string;
  checkOutTime: string;
  cleaningFee: number;
  created_at: string;
  id: number;
  maxGuests: number;
  maxNights: number;
  minNights: number;
  notes: string;
}

export function useSettings() {
  const {
    data: settings,
    isLoading,
    error,
  } = useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { settings, isLoading, error };
}
