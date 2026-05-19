import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

// Above-the-fold — load eagerly
import { Hero } from "@/components/forum/Hero";
import { Navbar } from "@/components/forum/Navbar";
import { About } from "@/components/forum/About";

// Below-the-fold — lazy load to split the bundle
const Speakers = lazy(() => import("@/components/forum/Speakers").then((m) => ({ default: m.Speakers })));
const Agenda = lazy(() => import("@/components/forum/Agenda").then((m) => ({ default: m.Agenda })));
const Venue = lazy(() => import("@/components/forum/Venue").then((m) => ({ default: m.Venue })));
const CLevelExperience = lazy(() => import("@/components/forum/CLevelExperience").then((m) => ({ default: m.CLevelExperience })));
const WhatToExpect = lazy(() => import("@/components/forum/WhatToExpect").then((m) => ({ default: m.WhatToExpect })));
const Stats = lazy(() => import("@/components/forum/Stats").then((m) => ({ default: m.Stats })));
const Gallery = lazy(() => import("@/components/forum/Gallery").then((m) => ({ default: m.Gallery })));
const AmbitionStrategy = lazy(() => import("@/components/forum/AmbitionStrategy").then((m) => ({ default: m.AmbitionStrategy })));
const PactoGlobalInfo = lazy(() => import("@/components/forum/PactoGlobalInfo").then((m) => ({ default: m.PactoGlobalInfo })));
const Sponsors = lazy(() => import("@/components/forum/Sponsors").then((m) => ({ default: m.Sponsors })));
const Faq = lazy(() => import("@/components/forum/Faq").then((m) => ({ default: m.Faq })));
const Waitlist = lazy(() => import("@/components/forum/Waitlist").then((m) => ({ default: m.Waitlist })));
const Contact = lazy(() => import("@/components/forum/Contact").then((m) => ({ default: m.Contact })));
const Footer = lazy(() => import("@/components/forum/Footer").then((m) => ({ default: m.Footer })));

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "4º Fórum Ambição 2030 - A Década da Implementação" },
      {
        name: "description",
        content:
          "02 de Junho de 2026, das 09h às 18h, no MASP, São Paulo. O 4° Fórum Ambição 2030 reúne lideranças para transformar compromissos em posicionamento estratégico.",
      },
      { property: "og:title", content: "4º Fórum Ambição 2030 - A Década da Implementação" },
      {
        property: "og:description",
        content:
          "02 de Junho de 2026 · MASP, São Paulo. A Década da Implementação: como as empresas estão redesenhando o futuro do Brasil.",
      },
      { property: "og:image", content: "/identity/kv-4-edicao.jpg" },
    ],
  }),
});

function Index() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ATO 1 — A PROMESSA (above-the-fold, eager) */}
        <Hero />
        <About />

        {/* Below-the-fold sections lazy-loaded */}
        <Suspense>
          <Speakers />
          <Agenda />
          <Venue />
          <CLevelExperience />
          <WhatToExpect />
          <Stats />
          <Gallery />
          <AmbitionStrategy />
          <PactoGlobalInfo />
          <Sponsors />

          {/* CONVERSÃO */}
          <Faq />
          <Waitlist />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
