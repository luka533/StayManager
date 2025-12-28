import { useSignup } from "../features/auth/useSignup.ts";
import AuthPage from "../ui/AuthPage";

function Signup() {
  const { signup, isLoading } = useSignup();

  return (
    <AuthPage
      header={"Welcome"}
      actionText={"Sign up"}
      signIn={true}
      action={signup}
      isLoading={isLoading}
    />
  );
}

export default Signup;
