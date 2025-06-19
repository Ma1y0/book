import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "~/db";
import * as schema from "~/db/schema/auth";

export const auth = betterAuth({
  emailAndPassword: {
    minPasswordLength: 4,
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema,
    usePlural: true,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
