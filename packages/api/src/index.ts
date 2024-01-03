import { publicProcedure, router } from "./trpc";
import { z } from "zod";

export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input: { name } }) => {
      return `Hello ${name}!`;
    }),
});

export type AppRouter = typeof appRouter;
