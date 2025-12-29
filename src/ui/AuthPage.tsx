import { useState, type FormEvent } from "react";
import Spinner from "../ui/Spinner";
import { Link } from "react-router";
import type { UseMutateFunction } from "@tanstack/react-query";
import type { AuthData, AuthPayload } from "../types/auth";

type AuthPageProps = {
  header: string;
  actionText: string;
  signIn: boolean;
  action: UseMutateFunction<AuthData | null, Error, AuthPayload>;
  isLoading: boolean;
  error?: Error | null;
};

export default function AuthPage({
  header = "Welcome back",
  actionText = "Log in",
  signIn = false,
  action,
  isLoading,
  error,
}: AuthPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  if (isLoading) return <Spinner />;

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (signIn) {
      action({ fullName, email, password });
    } else {
      action({ email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {header}
        </h2>
        <p className="text-center text-gray-500 mb-8">{actionText}</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {signIn && (
            <div className="relative">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-emerald-500 peer-focus:text-xs transition-all">
                Full name
              </label>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-emerald-500 peer-focus:text-xs transition-all">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=" "
              className="peer w-full px-4 py-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <label className="absolute left-4 top-3 text-gray-400 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-emerald-500 peer-focus:text-xs transition-all">
              Password
            </label>
          </div>

          {error && <p className="text-red-500 text-center">{error.message}</p>}

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
          >
            {actionText}
          </button>
        </form>

        {signIn ? (
          <p className="text-center text-gray-500 mt-6 text-sm">
            Already have an account?
            <Link
              to="/login"
              className="text-emerald-500 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>
        ) : (
          <p className="text-center text-gray-500 mt-6 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-emerald-500 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
