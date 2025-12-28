import supabase from "./supabase";
import type { UserData, AuthData, AuthPayload } from "../types/auth";

export async function signup({
  fullName,
  email,
  password,
}: AuthPayload): Promise<AuthData> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({
  email,
  password,
}: AuthPayload): Promise<AuthData | null> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser(): Promise<UserData | null> {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user ?? null;
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}
