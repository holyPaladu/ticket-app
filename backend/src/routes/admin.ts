import { Elysia, t } from "elysia";
import {
  getUsers,
  findUser,
  deleteUser,
  updateUser,
  createUser,
} from "../services/users";

export const admin = new Elysia({ prefix: "/api/admin" })
  .get("/users", getUsers)
  .get(`/users/:id`, findUser, {
    params: t.Object({
      id: t.String({ pattern: "^[0-9]+$" }),
    }),
  })
  .post("/users", createUser, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
      password: t.String(),
      role: t.Optional(t.Enum({ user: "user", admin: "admin" })),
    }),
  })
  .patch(`/users/:id`, updateUser, {
    params: t.Object({
      id: t.String({ pattern: "^[0-9]+$" }),
    }),
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String()),
      role: t.Optional(t.Enum({ user: "user", admin: "admin" })),
    }),
  })
  .delete(`/users/:id`, deleteUser, {
    params: t.Object({
      id: t.String({ pattern: "^[0-9]+$" }),
    }),
  });
