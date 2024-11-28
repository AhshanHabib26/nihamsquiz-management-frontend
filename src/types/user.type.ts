export type TUser = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilePhoto?: string;
  role: "admin" | "user" | "guest";
};
