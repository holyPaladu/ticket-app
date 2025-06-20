import { Elysia, t } from "elysia";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/category";

export const categoryRoutes = new Elysia({ prefix: "/api/categories" })
  .get("/", getCategories)
  .get("/:id", getCategory, {
    params: t.Object({ id: t.String({ pattern: "^[0-9]+$" }) }),
  })
  .post("/", createCategory, {
    body: t.Object({ name: t.String() }),
  })
  .patch("/:id", updateCategory, {
    params: t.Object({ id: t.String({ pattern: "^[0-9]+$" }) }),
    body: t.Object({ name: t.Optional(t.String()) }),
  })
  .delete("/:id", deleteCategory, {
    params: t.Object({ id: t.String({ pattern: "^[0-9]+$" }) }),
  });
