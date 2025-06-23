import { Elysia } from "elysia";
import { auth } from "../handler/auth";
import { users } from "../handler/users";

export const v1 = new Elysia({ prefix: "/api/v1" }).use(auth).use(users);
