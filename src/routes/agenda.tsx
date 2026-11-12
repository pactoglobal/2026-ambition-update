import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/agenda")({
  loader: () => {
    throw redirect({ to: "/", hash: "ultima-edicao" });
  },
  component: () => null,
});
