import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/inscricao")({
  loader: () => {
    // Sem inscrições abertas para a 5ª edição: links antigos caem em "Sobre o Fórum".
    throw redirect({ to: "/", hash: "sobre" });
  },
  component: () => null,
});
