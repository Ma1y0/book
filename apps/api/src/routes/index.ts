import { publicProcedure, protectedProcedure } from "~/lib/orpc";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return { message: "Secret Psss", user: context.session.user };
  }),
};
export type AppRouter = typeof appRouter;
