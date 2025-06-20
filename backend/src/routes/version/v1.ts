import { Elysia } from "elysia";
import { auth } from "../auth";
import { users } from "../users";

export const v1 = new Elysia({ prefix: "/api/v1" }).use(auth).use(users);
