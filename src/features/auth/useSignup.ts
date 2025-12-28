import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

import { signup as signupApi } from "../../services/apiAuth";
import type { AuthData, AuthPayload } from "../../types/auth";

export function useSignup() {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending: isLoading,
    error,
  } = useMutation<AuthData, Error, AuthPayload>({
    mutationFn: signupApi,
    onSuccess: () => {
      navigate("/");
    },
  });

  return { signup, isLoading, error };
}
