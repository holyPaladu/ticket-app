import { Elysia } from "elysia";
import dotenv from "dotenv";
import { swagger } from "@elysiajs/swagger";

import { users } from "./routes/users";
import { auth } from "./routes/auth";
import { jwtPlugin } from "./plugins/jwt";

dotenv.config();

const app = new Elysia()
  .use(swagger())
  .use(jwtPlugin)
  .use(auth)
  .use(users)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
