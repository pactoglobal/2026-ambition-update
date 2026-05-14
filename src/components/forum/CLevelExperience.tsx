"use client";

import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, GlassWater, Users } from "lucide-react";
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
  { icon: GlassWater, label: "Formato", value: "Keynote + Coquetel de Relacionamento" },
];

// Group photos into pairs for side-by-side slides
const photoPairs: string[][] = [];
for (let i = 0; i < photos.length; i += 2) {
  photoPairs.push(photos.slice(i, i + 2));
}

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

  if (photoPairs.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="relative">
        {/* embla viewport */}
        <div ref={emblaRef} className="overflow-hidden rounded-2xl">
          <div className="flex">
            {photoPairs.map((pair, i) => (
              <div key={i} className="relative min-w-0 flex-[0_0_100%]">
                <div className="flex gap-1.5">
                  {pair.map((src, j) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Aya Earth Hub · Foto ${i * 2 + j + 1}`}
                      width={600}
                      height={400}
                      loading="lazy"
                      className="aspect-[3/2] flex-1 rounded-xl object-cover"
                    />
                  ))}
                </div>
                {/* gradient + logo overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-forum-ink/70 via-transparent to-transparent" />
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
            ))}
          </div>
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
      {photoPairs.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {photoPairs.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                selectedIndex === i ? "w-5 bg-forum-cyan" : "w-1.5 bg-white/20"
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
