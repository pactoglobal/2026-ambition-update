import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hero } from "@/components/forum/Hero";
import { Navbar } from "@/components/forum/Navbar";
import { About } from "@/components/forum/About";
import { WhatToExpect } from "@/components/forum/WhatToExpect";
import { LastEdition } from "@/components/forum/LastEdition";
import { EventNumbers } from "@/components/forum/EventNumbers";
import { CLevelExperience } from "@/components/forum/CLevelExperience";
import { MemoryVideo } from "@/components/forum/MemoryVideo";
import { Speakers } from "@/components/forum/Speakers";
import { LastEditionBand, PartnerBand } from "@/components/forum/PhotoBand";
import { AmbitionStrategy } from "@/components/forum/AmbitionStrategy";
import { PactoGlobalInfo } from "@/components/forum/PactoGlobalInfo";
import { Gallery } from "@/components/forum/Gallery";
import { SocialFeed } from "@/components/forum/SocialFeed";
import { Faq } from "@/components/forum/Faq";
import { PartnerForm } from "@/components/forum/PartnerForm";
import { Footer } from "@/components/forum/Footer";

const TITLE = "5º Fórum Ambição 2030 | Pacto Global da ONU – Rede Brasil";
const DESCRIPTION =
  "O principal encontro de sustentabilidade corporativa do Brasil chega à 5ª edição. Estruturado a partir dos 10 Movimentos do Pacto Global da ONU – Rede Brasil, reúne altas lideranças para transformar intenção em ação.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://forumambicao2030.pactoglobal.org.br/" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      {
        property: "og:image",
        content: "https://forumambicao2030.pactoglobal.org.br/identity/og-image.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "675" },
      {
        property: "og:image:alt",
        content: "Fórum Ambição 2030 · Pacto Global da ONU – Rede Brasil",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      {
        name: "twitter:image",
        content: "https://forumambicao2030.pactoglobal.org.br/identity/og-image.jpg",
      },
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
      <main className="min-h-screen max-w-full overflow-x-hidden">
        {/* Estrutura da 5ª edição, definida pela comunicação: o que é o
            evento → a última edição → por que ser parceiro → contexto →
            registro → dúvidas → formulário. O menu (Navbar.tsx) segue a
            mesma ordem. */}

        {/* 0–2 · O EVENTO */}
        <Hero />
        <About />
        <WhatToExpect />

        {/* 3–7 · A ÚLTIMA EDIÇÃO (4ª, 2026) */}
        <LastEditionBand />
        <LastEdition />
        <EventNumbers />
        <CLevelExperience />
        <MemoryVideo />
        <Speakers />

        {/* CTA âncora → formulário no fim da página */}
        <PartnerBand />

        {/* 8–9 · CONTEXTO */}
        <AmbitionStrategy />
        <PactoGlobalInfo />

        {/* 10–12 · REGISTRO E DÚVIDAS */}
        <Gallery />
        <SocialFeed />
        <Faq />

        {/* 13 · SEJA PARCEIRO */}
        <PartnerForm />
        <Footer />
      </main>
    </>
  );
}
