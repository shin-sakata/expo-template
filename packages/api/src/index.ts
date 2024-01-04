import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { prisma } from "@packages/db";

export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input: { name } }) => {
      return `Hello ${name}!`;
    }),
  getPosts: publicProcedure.query(async () => {
    const posts = await prisma.posts.findMany();
    return posts;
  }),
  createPost: publicProcedure
    .input(z.object({ title: z.string(), content: z.string() }))
    .mutation(async ({ input: { title, content } }) => {
      const post = await prisma.posts.create({
        data: {
          title,
          content,
        },
      });
      return post;
    }),
  deletePost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input: { id } }) => {
      const post = await prisma.posts.delete({ where: { id } });
      return post.id;
    }),
});

export type AppRouter = typeof appRouter;
