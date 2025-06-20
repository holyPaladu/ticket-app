import { Elysia, t } from "elysia";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product";

export const productRoutes = new Elysia({ prefix: "/products" })
  .get("/", getProducts)
  .get("/:id", getProduct, {
    params: t.Object({ id: t.String({ pattern: "^[0-9]+$" }) }),
  })
  .post("/", createProduct, {
    body: t.Object({
      name: t.String(),
      price: t.Number(),
      categoryId: t.Number(),
    }),
  })
  .patch("/:id", updateProduct, {
    params: t.Object({ id: t.String({ pattern: "^[0-9]+$" }) }),
    body: t.Object({
      name: t.Optional(t.String()),
      price: t.Optional(t.Number()),
      categoryId: t.Optional(t.Number()),
    }),
  })
  .delete("/:id", deleteProduct, {
    params: t.Object({ id: t.String({ pattern: "^[0-9]+$" }) }),
  });
