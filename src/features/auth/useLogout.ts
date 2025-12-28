import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout as logoutApi } from "../../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending: isLoading,
    error,
  } = useMutation<void, Error, void>({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login");
    },
  });

  return { logout, isLoading, error };
}
