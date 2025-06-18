import { drizzle } from "drizzle-orm/bun-sqlite";
import * as authSchema from "./schema/auth";
import * as todoSchema from "./schema/todo";

const schema = {
  ...authSchema,
  ...todoSchema,
};

export const db = drizzle(process.env.DB_URL!, { schema });
