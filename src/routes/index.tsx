import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/forum/Hero";
import { Navbar } from "@/components/forum/Navbar";
import { About } from "@/components/forum/About";
import { WhatToExpect } from "@/components/forum/WhatToExpect";
import { AmbitionStrategy } from "@/components/forum/AmbitionStrategy";
import { NaturePatchwork } from "@/components/forum/NaturePatchwork";
import { Stats } from "@/components/forum/Stats";
import { Agenda } from "@/components/forum/Agenda";
import { CLevelExperience } from "@/components/forum/CLevelExperience";
import { Audience } from "@/components/forum/Audience";
import { Sponsors } from "@/components/forum/Sponsors";
import { Waitlist } from "@/components/forum/Waitlist";
import { Contact } from "@/components/forum/Contact";
import { PactoGlobalInfo } from "@/components/forum/PactoGlobalInfo";
import { Footer } from "@/components/forum/Footer";
import { Speakers } from "@/components/forum/Speakers";
import { Venue } from "@/components/forum/Venue";
import { Gallery } from "@/components/forum/Gallery";
import { Faq } from "@/components/forum/Faq";

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
        <Hero />
        <About />
        <AmbitionStrategy />
        <WhatToExpect />
        <Stats />
        <Speakers />
        <Agenda />
        <CLevelExperience />
        <NaturePatchwork />
        <Audience />
        <Gallery />
        <Venue />
        <Faq />
        <Sponsors />
        <Waitlist />
        <Contact />
        <PactoGlobalInfo />
        <Footer />
      </main>
    </>
  );
}
