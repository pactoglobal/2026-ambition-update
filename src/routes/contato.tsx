import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/contato")({
  loader: () => {
    throw redirect({ to: "/", hash: "seja-parceiro" });
  },
  component: () => null,
});
