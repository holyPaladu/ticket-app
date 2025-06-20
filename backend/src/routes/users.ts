import { Elysia, t } from "elysia";
import {
  getUsers,
  findUser,
  deleteUser,
  updateUser,
  createUser,
} from "../services/users";

export const users = new Elysia({ prefix: "/users" })
  .get("/", getUsers)
  .get(`/:id`, findUser, {
    params: t.Object({
      id: t.String({ pattern: "^[0-9]+$" }),
    }),
  })
  .post("/", createUser, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
      role: t.Optional(t.Enum({ user: "user", admin: "admin" })),
    }),
  })
  .patch(`/:id`, updateUser, {
    params: t.Object({
      id: t.String({ pattern: "^[0-9]+$" }),
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String()),
      role: t.Optional(t.Enum({ user: "user", admin: "admin" })),
    }),
  })
  .delete(`/:id`, deleteUser, {
    params: t.Object({
      id: t.String({ pattern: "^[0-9]+$" }),
    }),
  });
