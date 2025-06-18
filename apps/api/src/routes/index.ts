import { db } from "~/db";
import { publicProcedure } from "~/lib/orpc";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  getToDos: publicProcedure.handler(() => {
    return db.query.todo.findMany();
  }),
};
export type AppRouter = typeof appRouter;
