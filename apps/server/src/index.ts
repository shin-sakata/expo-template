import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "@packages/api";

const server = createHTTPServer({
  router: appRouter,
});

console.log("Listening on port 3000...");
server.listen(3000);
