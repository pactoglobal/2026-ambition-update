import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/parceiros")({
  loader: () => {
    throw redirect({ to: "/", hash: "sponsors" });
  },
  component: () => null,
});
