import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/palestrantes")({
  loader: () => {
    throw redirect({ to: "/", hash: "speakers" });
  },
  component: () => null,
});
