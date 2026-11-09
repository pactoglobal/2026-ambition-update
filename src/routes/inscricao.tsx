import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/inscricao")({
  loader: () => {
    // Inscricoes encerradas: links antigos para /inscricao caem na retrospectiva.
    throw redirect({ to: "/", hash: "numeros" });
  },
  component: () => null,
});
