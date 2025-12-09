export interface AuthUser {
  id: string;
  userName: string;
  email: string;
  displayName: string;
  role?: string;
  status?: string;
  avatarUri?: string;
}

export interface User {
  id: string;
  userName: string;
  email: string;
  password: string;
  displayName: string | null;
  avatarUri: string | null;
  role: RoleUser;
  status: Status;
  createdAt: string;
  updatedAt: string;
  isPremium: boolean;
  premiumUntil: string | null;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface RegisterResponse {
  user: AuthUser;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  displayName: string;
}

export type Status = "ACTIVE" | "INACTIVE" | "PENDING";
export type RoleUser = "USER" | "ADMIN";
