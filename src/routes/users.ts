import { Elysia, t } from "elysia";
import { getUsers } from "../services/users";

export const users = new Elysia({ prefix: "/users" }).get("/", getUsers);
