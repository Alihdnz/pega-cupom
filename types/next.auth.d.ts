import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "SUPER_ADMIN" | "STORE_ADMIN";
    };
  }

  interface User {
    id: string;
    role: "SUPER_ADMIN" | "STORE_ADMIN";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "SUPER_ADMIN" | "STORE_ADMIN";
  }
}