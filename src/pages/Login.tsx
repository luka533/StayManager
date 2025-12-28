import { useLogin } from "../features/auth/useLogin.ts";
import AuthPage from "../ui/AuthPage";

function Login() {
  const { login, isLoading } = useLogin();

  return (
    <AuthPage
      header={"Welcome back"}
      actionText={"Log in"}
      signIn={false}
      action={login}
      isLoading={isLoading}
    />
  );
}

export default Login;
