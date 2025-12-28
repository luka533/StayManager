import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";

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

export function useEditSettings() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSettings,
    isPending: isUpdating,
    error,
  } = useMutation<Settings, Error, Settings>({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return { updateSettings, isUpdating, error };
}
