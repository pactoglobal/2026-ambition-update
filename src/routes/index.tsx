import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hero } from "@/components/forum/Hero";
import { Navbar } from "@/components/forum/Navbar";
import { About } from "@/components/forum/About";
import { WhatToExpect } from "@/components/forum/WhatToExpect";
import { AmbitionStrategy } from "@/components/forum/AmbitionStrategy";
import { Stats } from "@/components/forum/Stats";
import { Agenda } from "@/components/forum/Agenda";
import { CLevelExperience } from "@/components/forum/CLevelExperience";
import { Sponsors } from "@/components/forum/Sponsors";
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
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://forumambicao2030.pactoglobal.org.br/" },
      { property: "og:title", content: "4º Fórum Ambição 2030 - A Década da Implementação" },
      {
        property: "og:description",
        content:
          "02 de Junho de 2026 · MASP, São Paulo. A Década da Implementação: como as empresas estão redesenhando o futuro do Brasil.",
      },
      { property: "og:image", content: "https://forumambicao2030.pactoglobal.org.br/identity/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "675" },
      { property: "og:image:alt", content: "4º Fórum Ambição 2030 · 02 de Junho · MASP, São Paulo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "4º Fórum Ambição 2030 - A Década da Implementação" },
      {
        name: "twitter:description",
        content: "02 de Junho de 2026 · MASP, São Paulo. A Década da Implementação: como as empresas estão redesenhando o futuro do Brasil.",
      },
      { name: "twitter:image", content: "https://forumambicao2030.pactoglobal.org.br/identity/og-image.jpg" },
    ],
  }),
});

function useHashScroll() {
  useEffect(() => {
    // Prevent the browser from restoring its own scroll position, which can
    // conflict with our programmatic scroll.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    let cancelled = false;

    const scrollToHash = (): boolean => {
      if (cancelled) return false;
      const el = document.getElementById(hash);
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top, behavior: "instant" });
      return true;
    };

    // Use two rAF to ensure the browser has painted layout before measuring
    // element positions. This avoids the race where getBoundingClientRect
    // returns stale values right after mount.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollToHash()) return;

        // Fallback: poll until the element appears (lazy-rendered sections)
        let attempts = 0;
        const interval = setInterval(() => {
          if (scrollToHash() || ++attempts >= 30) clearInterval(interval);
        }, 100);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);
}

function Index() {
  useHashScroll();

  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* ATO 1 — A PROMESSA (above-the-fold, eager) */}
        <Hero />
        <About />

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
        <Contact />
        <Footer />
      </main>
    </>
  );
}
