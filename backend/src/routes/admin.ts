import { Elysia, t } from "elysia";
import { getUsers } from "../services/users";

export const admin = new Elysia({ prefix: "/api/admin" }).get(
  "/users",
  getUsers
);
