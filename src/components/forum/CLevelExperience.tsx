"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, GlassWater, MapPin, Users } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { identityAssets } from "./identity-assets";

const coquételPhotos = import.meta.glob(
  "../../../assets/img/coquetel-ceos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

const photos = Object.values(coquételPhotos);

const experienceDetails = [
  { icon: Users, label: "Público e Capacidade", value: "CEO · 80 convidados" },
  { icon: MapPin, label: "Local", value: "Cidade Matarazzo — Aya Hub, São Paulo" },
  { icon: GlassWater, label: "Formato", value: "Keynote + Coquetel de Relacionamento" },
];

function PhotoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (photos.length === 0) return null;

  return (
    <div className="mt-6">
      {/* carousel with overlay controls */}
      <div className="relative overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {photos.map((src, i) => (
            <div key={src} className="relative flex-[0_0_100%]">
              <div className="flex gap-1.5">
                {/* show this photo and the next one side by side */}
                {[photos[i], photos[i + 1]].filter(Boolean).map((p, j) => (
                  <img
                    key={j}
                    src={p}
                    alt={`Aya Earth Hub · Foto ${i + j + 1}`}
                    width={600}
                    height={400}
                    loading="lazy"
                    className="aspect-[3/2] w-full flex-1 rounded-xl object-cover"
                  />
                ))}
              </div>
              {/* gradient overlay bottom */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-forum-ink/70 via-transparent to-transparent" />
              {/* logo + location overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
                <img
                  src={identityAssets.aya}
                  alt="Aya Earth Partners"
                  className="h-5 w-auto object-contain brightness-0 invert opacity-70"
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-white/55">
                  Cidade Matarazzo · São Paulo
                </span>
              </div>
            </div>
          )).filter((_, i) => i % 2 === 0)}
        </div>

        {/* side arrows */}
        <button
          type="button"
          aria-label="Foto anterior"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-forum-ink/60 text-white/80 backdrop-blur-sm transition-all hover:border-forum-cyan/60 hover:bg-forum-ink/80 hover:text-forum-cyan"
        >
          <ChevronLeft aria-hidden="true" size={14} />
        </button>
        <button
          type="button"
          aria-label="Próxima foto"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-forum-ink/60 text-white/80 backdrop-blur-sm transition-all hover:border-forum-cyan/60 hover:bg-forum-ink/80 hover:text-forum-cyan"
        >
          <ChevronRight aria-hidden="true" size={14} />
        </button>
      </div>

      {/* dots */}
      {photos.length > 2 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {Array.from({ length: Math.ceil(photos.length / 2) }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para foto ${i * 2 + 1}`}
              onClick={() => emblaApi?.scrollTo(i * 2)}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                Math.floor(selectedIndex / 2) === i ? "w-5 bg-forum-cyan" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CLevelExperience() {
  return (
    <section id="coquetel" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          {/* left — description */}
          <AnimatedSection>
            <SectionHeader
              eyebrow="Experiência Exclusiva"
              title="Coquetel"
              outline="com CEOs"
              description="Uma agenda complementar para conexões qualificadas entre a alta liderança."
            />
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/78">
              <p>
                Na véspera do Fórum Ambição 2030, um grupo seleto de até 80 CEOs se reúne num ambiente exclusivo e reservado.
              </p>
              <p>
                Uma conversa inspiradora abrirá o encontro — seguida de um espaço pensado para que lideranças que compartilham os mesmos desafios tenham trocas genuínas e conexões estratégicas.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {experienceDetails.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-forum-cyan/30 bg-forum-cyan/10 text-forum-cyan">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/42">{label}</p>
                    <p className="font-display text-lg font-bold uppercase tracking-tight text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* right — agenda card + photos below */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {/* agenda card */}
            <div className="forum-glass relative overflow-hidden rounded-2xl p-8 sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-forum-cyan/10 blur-[80px]" />

              <h3 className="mb-8 font-display text-2xl font-black uppercase tracking-tight text-white">
                Agenda Preliminar <span className="text-forum-cyan">· 01/06</span>
              </h3>

              <div className="relative space-y-8 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-white/10">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-4 border-forum-ink bg-forum-cyan" />
                  <time className="text-[10px] font-black uppercase tracking-widest text-forum-cyan">18h30 às 19h10</time>
                  <p className="mt-1 font-display text-lg font-bold uppercase text-white">Keynote Speaker</p>
                </div>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-4 border-forum-ink bg-white/20" />
                  <time className="text-[10px] font-black uppercase tracking-widest text-white/42">19h10 às 20h00</time>
                  <p className="mt-1 font-display text-lg font-bold uppercase text-white">Coquetel de Relacionamento</p>
                </div>
              </div>

              <p className="mt-10 text-[9px] font-bold uppercase tracking-widest text-white/32">
                * Informações preliminares, sujeitas a alteração.
              </p>
            </div>

            {/* photos below agenda card */}
            {photos.length > 0 && (
              <div className="forum-glass rounded-2xl p-5">
                <PhotoCarousel />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
