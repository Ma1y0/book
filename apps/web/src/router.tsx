import { createRouter as createTanstackRouter } from "@tanstack/react-router";
import Loader from "./components/loader";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { queryClient } from "./lib/query";
import { QueryClientProvider } from "@tanstack/react-query";

export const createRouter = () => {
  const router = createTanstackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: { queryClient },
    // defaultPreload: "intent",
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });
  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
