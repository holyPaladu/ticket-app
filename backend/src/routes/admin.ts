import { Elysia, t } from "elysia";
import { categoryRoutes } from "./handler/category";
import { users } from "./handler/users";
import { productRoutes } from "./handler/product";

export const admin = new Elysia({ prefix: "/api/admin" })
  .use(users)
  .use(categoryRoutes)
  .use(productRoutes);
