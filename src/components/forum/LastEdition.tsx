import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { LAST_EDITION } from "./edition";
import chegadaMasp from "../../../assets/img/galeria-de-momentos/2026/01_chegada_masp_cafe_2026.jpg?url";
import debate from "../../../assets/img/galeria-de-momentos/2026/11_debatable_2026.jpg?url";
import musica from "../../../assets/img/galeria-de-momentos/2026/23_atracao_musical_2026.jpg?url";

/** Fotos que não se repetem em "O que o Fórum entrega" nem nos números. */
const PHOTOS = [
  {
    src: chegadaMasp,
    alt: "Convidados chegando ao MASP Café para a 4ª edição do Fórum Ambição 2030",
    caption: "Chegada · MASP Café",
    span: "col-span-2 row-span-2",
  },
  {
    src: debate,
    alt: "Debate no palco da 4ª edição, com participantes em púlpitos",
    caption: "Debate no palco",
    span: "col-span-1",
  },
  {
    src: musica,
    alt: "Apresentação musical no palco do auditório do MASP durante a 4ª edição",
    caption: "Atração musical",
    span: "col-span-1",
  },
];

const RECORD = [
  { term: "Data", detail: `${LAST_EDITION.date} · terça-feira` },
  { term: "Local", detail: `${LAST_EDITION.venue} · Avenida Paulista, ${LAST_EDITION.city}` },
  {
    term: "Programação",
    detail: "10h de conteúdo em 6 eixos temáticos: keynotes, painéis e business cases",
  },
  { term: "Véspera", detail: "Coquetel exclusivo com CEOs" },
];

/**
 * Abre o bloco da última edição (este → números → coquetel → vídeo →
 * speakers). Composição editorial: colagem de fotos à esquerda, o tema como
 * citação e uma ficha técnica à direita, em vez da grade de cards.
 */
export function LastEdition() {
  return (
    <section id="ultima-edicao" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="deepField" intensity="soft" glow="warm" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-14">
          <SectionHeader
            eyebrow={`Saiba mais · ${LAST_EDITION.label}`}
            title="Como foi a"
            outline="última edição"
            stacked
          />
        </AnimatedSection>

        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="grid grid-cols-3 grid-rows-2 gap-3 sm:gap-4 lg:col-span-7 lg:h-[520px]">
            {PHOTOS.map(({ src, alt, caption, span }, index) => (
              <motion.figure
                key={caption}
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={`group relative isolate min-h-36 overflow-hidden rounded-2xl border border-white/10 sm:min-h-48 ${span}`}
              >
                <img
                  src={src}
                  alt={alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(15,26,43,0.7),transparent_50%)]"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-forum-ink/60 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
                  {caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <AnimatedSection className="lg:col-span-5">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
              Tema da {LAST_EDITION.label}
            </p>
            <blockquote className="mt-4 border-l-2 border-forum-sky pl-6">
              <p className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-forum-sky sm:text-5xl">
                {LAST_EDITION.theme}
              </p>
            </blockquote>

            <p className="mt-8 text-base leading-relaxed text-white/76">
              Em sua quarta edição, o Fórum reuniu centenas de altas lideranças empresariais, da
              sociedade civil e do poder público para promover diálogos estratégicos e cocriar
              soluções concretas rumo aos ODS — e para refletir sobre como o setor empresarial
              brasileiro está incorporando a sustentabilidade ao centro da estratégia.
            </p>

            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {RECORD.map(({ term, detail }) => (
                <div key={term} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3.5">
                  <dt className="pt-0.5 text-[10px] font-black uppercase tracking-[0.24em] text-forum-sky">
                    {term}
                  </dt>
                  <dd className="text-sm font-bold leading-snug text-white">{detail}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { href: "#numeros", label: "Ver os números" },
                { href: "#galeria", label: "Ver a galeria" },
              ].map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] font-black uppercase tracking-[0.22em] text-white transition-colors hover:border-forum-sky hover:text-forum-sky"
                >
                  {label}
                  <ArrowRight
                    aria-hidden="true"
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
