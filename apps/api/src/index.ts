import { RPCHandler } from "@orpc/server/fetch";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { appRouter } from "./routes";
import { cors } from "hono/cors";
import { createContext } from "~/lib/context";
import { env } from "hono/adapter";

const app = new Hono();

app.use(logger());
app.use(
  "/*",
  cors({
    origin: (_, c) => env<{ CORS_ORIGIN: string }>(c).CORS_ORIGIN,
    credentials: true,
  }),
);

app.get("/ping", (c) => {
  return c.body("OK");
});

// Orpc
const handler = new RPCHandler(appRouter);
app.use("/rpc/*", async (c, next) => {
  console.log(c.req.path);
  const context = await createContext({ context: c });
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  });
  if (matched) {
    return c.newResponse(response.body, response);
  }
  await next();
});

export default app;
