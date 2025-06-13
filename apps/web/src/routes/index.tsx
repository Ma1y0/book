import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { orpc } from "~/lib/orpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const [healthCheck, setHealthCheck] = useState<{
    isLoading: boolean;
    data: string | null;
  }>({
    isLoading: true,
    data: null,
  });

  useEffect(() => {
    orpc
      .healthCheck()
      .catch((e) => console.error(e))
      .then((a) => setHealthCheck({ isLoading: false, data: a ?? "???" }));
  });
  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <h1 className="overflow-x-auto font-mono text-sm">Hello World</h1>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-muted-foreground text-sm">
              {healthCheck.isLoading
                ? "Checking..."
                : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
