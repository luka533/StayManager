import { useQuery } from "@tanstack/react-query";

import { getUser } from "../../services/apiAuth";
import type { UserData } from "../../types/auth";

export function useUser() {
  const { data: user, isLoading } = useQuery<UserData | null, Error>({
    queryFn: getUser,
    queryKey: ["user"],
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
