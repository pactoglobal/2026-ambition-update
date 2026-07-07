import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/local")({
  loader: () => {
    throw redirect({ to: "/", hash: "local" });
  },
  component: () => null,
});
