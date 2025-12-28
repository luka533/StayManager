import React, { useEffect } from "react";
import { useUser } from "../features/auth/useUser.ts";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login", { replace: true });
    },
    [isAuthenticated, isLoading, navigate]
  );

  if (isLoading) return <Spinner />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
