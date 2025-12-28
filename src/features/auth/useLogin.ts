import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth";
import type { AuthData, AuthPayload } from "../../types/auth";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoading,
    error,
  } = useMutation<AuthData | null, Error, AuthPayload>({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      navigate("/");
    },
    onError: (err) => {
      console.error(err.message);
    },
  });

  return { login, isLoading, error };
}
