// export interface Login {
//   email: string;
//   password: string;
// }

// export interface SignUp extends Login {
//   fullName: string;
// }

export interface AuthPayload {
  email: string;
  password: string;
  fullName?: string; // only for signup
}

export interface UserData {
  id: string;
  email?: string;
  user_metadata?: {
    fullName?: string;
    email?: string;
  };
  aud?: string;
  role?: string;
  // [key: string]: any; // allows other fields you don’t care about
}

export interface AuthData {
  session: {
    access_token: string;
    expires_at?: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
  } | null;
  user: UserData | null;
}
