export type User = {
  id: string;
  email: string;
  password: string;
};

export type AuthenticatedUser = {
  user: Omit<User, "password">;
  token: string;
};

export type Task = {
  id: string;
  user: Omit<User, "password">;
  title: string;
  description: string;
  status: "PENDING" | "DONE";
};

export type TaskDto = Omit<Task, "user">;
