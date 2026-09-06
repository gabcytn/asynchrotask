export type User = {
  id: string;
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  user: Omit<User, "password">;
  token: string;
};
