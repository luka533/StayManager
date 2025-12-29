import { useSignup } from "../features/auth/useSignup.ts";
import AuthPage from "../ui/AuthPage";

function Signup() {
  const { signup, isLoading, error } = useSignup();

  return (
    <AuthPage
      header={"Welcome"}
      actionText={"Sign up"}
      signIn={true}
      action={signup}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default Signup;
