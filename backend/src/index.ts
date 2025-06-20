import { Elysia } from "elysia";
import dotenv from "dotenv";
import { swagger } from "@elysiajs/swagger";
import { staticPlugin } from "@elysiajs/static";

import { admin } from "./routes/admin";
import { jwtPlugin } from "./plugins/jwt";
import { v1 } from "./routes/version/v1";

dotenv.config();

const app = new Elysia()
  .use(swagger())
  .use(jwtPlugin)
  .use(
    staticPlugin({
      prefix: "/admin", // 👉 путь, с которого раздается фронт
      assets: "/app/admin-dist", // 👉 путь до dist
      alwaysStatic: true, // позволяет отдавать даже если route совпадает
    })
  )
  .use(v1)
  .get("/admin/*", () => Bun.file("/app/admin-dist/index.html"))
  .use(admin)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
