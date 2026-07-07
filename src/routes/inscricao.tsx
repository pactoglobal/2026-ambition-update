import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/inscricao")({
  loader: () => {
    throw redirect({ to: "/", hash: "lista-de-espera" });
  },
  component: () => null,
});
