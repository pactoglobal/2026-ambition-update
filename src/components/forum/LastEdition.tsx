import { motion } from "framer-motion";
import { CalendarCheck, Lightbulb, MapPin, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";
import { LAST_EDITION } from "./edition";
import chegadaMasp from "../../../assets/img/galeria-de-momentos/2026/01_chegada_masp_cafe_2026.jpg?url";

type Fact = {
  Icon: LucideIcon;
  label: string;
  value: string;
  support?: string;
  /** Spans literais — o scanner do Tailwind precisa ler a classe inteira. */
  span: string;
};

/**
 * Abre o bloco "última edição" (este card → Big Numbers → Coquetel com CEOs
 * → Vídeo memória). Substitui as antigas seções Local e Programação: o que
 * delas interessa a quem chega para a 5ª edição (tema, data, lugar, formato)
 * cabe aqui.
 *
 * Grade sem buracos: md = A A B / A A C / D E E · sm = A A / B C / D D / E E.
 */
const facts: Fact[] = [
  { Icon: Lightbulb, label: "Tema", value: LAST_EDITION.theme, span: "" },
  { Icon: CalendarCheck, label: "Data", value: LAST_EDITION.date, span: "" },
  {
    Icon: MapPin,
    label: "Local",
    value: LAST_EDITION.venue,
    support: LAST_EDITION.address,
    span: "sm:col-span-2 md:col-span-1",
  },
  {
    Icon: Mic,
    label: "Formato",
    value: "10h de conteúdo em 6 eixos temáticos",
    support: "Keynotes, painéis e business cases, com coquetel para CEOs na véspera.",
    span: "sm:col-span-2",
  },
];

export function LastEdition() {
  return (
    <section id="ultima-edicao" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" intensity="soft" glow="warm" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <SectionHeader
            eyebrow={`Saiba mais · ${LAST_EDITION.label}`}
            title="Como foi a"
            outline="última edição"
          />
          <p className="text-base leading-relaxed text-white/72 sm:text-lg">
            Em sua quarta edição, o Fórum reuniu centenas de altas lideranças empresariais, da
            sociedade civil e do poder público para promover diálogos estratégicos e cocriar
            soluções concretas rumo aos Objetivos de Desenvolvimento Sustentável. O evento propôs
            uma reflexão sobre como o setor empresarial brasileiro está incorporando a
            sustentabilidade como elemento central da estratégia corporativa.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[200px] md:grid-cols-3">
          <motion.figure
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="forum-card group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl p-3 sm:col-span-2 sm:p-4 md:row-span-2 md:min-h-0"
          >
            <img
              src={chegadaMasp}
              alt="Convidados chegando ao MASP para a 4ª edição do Fórum Ambição 2030"
              width={1200}
              height={800}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(7,26,44,0.85)_0%,rgba(7,26,44,0.2)_55%,rgba(7,26,44,0.05)_100%)]"
            />
            <figcaption className="forum-glass-photo w-fit rounded-xl px-6 py-5">
              <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-forum-cyan">
                {LAST_EDITION.label}
              </span>
              <span className="mt-2 block font-display text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
                Recepção dos convidados
              </span>
            </figcaption>
          </motion.figure>

          {facts.map(({ Icon, label, value, support, span }, index) => (
            <motion.article
              key={label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className={`forum-card relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl p-6 ${span}`}
            >
              <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[index + 1]}`} />
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-forum-cyan">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/72">
                  {label}
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-black uppercase leading-tight tracking-tight text-white">
                  {value}
                </p>
                {support ? (
                  <p className="mt-2 text-sm leading-snug text-white/74">{support}</p>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
