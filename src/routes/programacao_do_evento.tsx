import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/programacao_do_evento")({
  loader: () => {
    throw redirect({ to: "/", hash: "agenda" });
  },
  component: () => null,
});
