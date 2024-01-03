import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "@packages/api";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
