import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";
import type { AuthData, AuthPayload } from "../../types/auth";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation<AuthData, Error, AuthPayload>({
    mutationFn: signupApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data?.user);
      navigate("/");
    },
  });

  return { signup, isLoading, error };
}
