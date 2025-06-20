import { Elysia, t } from "elysia";
import { categoryRoutes } from "./category";
import { users } from "./users";
import { productRoutes } from "./product";

export const admin = new Elysia({ prefix: "/api/admin" })
  .use(users)
  .use(categoryRoutes)
  .use(productRoutes);
