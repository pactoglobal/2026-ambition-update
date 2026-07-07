import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sobre")({
  loader: () => {
    throw redirect({ to: "/", hash: "sobre" });
  },
  component: () => null,
});
