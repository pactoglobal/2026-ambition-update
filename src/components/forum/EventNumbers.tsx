import { motion } from "framer-motion";
import { Megaphone, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { CountUp } from "./CountUp";
import { KineticBackdrop, SectionHeader } from "./Identity";
import plateia2026 from "../../../assets/img/galeria-de-momentos/2026/15_plateia_aplausos_2026.jpg?url";

type Metric = {
  /** Prefixo (ex.: "R$"), renderizado menor que o número. */
  prefix?: string;
  /** Formato de exibição, com vírgula decimal: anima de 0 até ele. */
  value: string;
  /** Unidade (ex.: "M", "mil", "h", "%"), também menor que o número. */
  suffix?: string;
  label: string;
  /** Canal de origem, quando o número só faz sentido com ele. */
  channel?: string;
};

type Panel = { key: string; title: string; Icon: LucideIcon; featured: Metric[]; list: Metric[] };

/**
 * Números da 4ª edição (02/06/2026, MASP), conforme o consolidado
 * Ambicao2030_BigNumbers da equipe de comunicação.
 */
const EVENT: Metric[] = [
  { value: "40", label: "speakers" },
  { value: "10", suffix: "h", label: "de conteúdo" },
  { value: "6", label: "eixos temáticos" },
];

const PANELS: Panel[] = [
  {
    key: "imprensa",
    title: "Imprensa",
    Icon: Megaphone,
    featured: [
      { value: "23,5", suffix: "M", label: "pessoas impactadas" },
      { prefix: "R$", value: "11,3", suffix: "M", label: "em valoração de mídia" },
    ],
    list: [
      { value: "179", label: "matérias publicadas, 100% positivas" },
      { value: "+239", suffix: "%", label: "de crescimento em exposição" },
      { value: "8", label: "jornalistas presentes no evento" },
      { value: "22", label: "conteúdos enviados à imprensa pela RBPG" },
    ],
  },
  {
    key: "digital",
    title: "Digital",
    Icon: Smartphone,
    featured: [
      { value: "60,8", suffix: "mil", label: "visualizações", channel: "Instagram" },
      { value: "23,1", suffix: "mil", label: "contas alcançadas", channel: "Instagram" },
    ],
    list: [
      { value: "7,5", suffix: "mil", label: "impressões em 7 posts", channel: "LinkedIn" },
      { value: "264", label: "interações", channel: "LinkedIn" },
      { value: "8,3", suffix: "mil", label: "usuários no site", channel: "Site" },
    ],
  },
];

function Figure({ prefix, value, suffix, className }: Metric & { className: string }) {
  return (
    <span
      className={`flex items-baseline gap-1.5 whitespace-nowrap font-display font-black leading-none tracking-tight text-white ${className}`}
    >
      {prefix ? <span className="text-[0.4em] text-forum-sky">{prefix}</span> : null}
      <CountUp value={value} />
      {suffix ? <span className="text-[0.42em] text-forum-sky">{suffix}</span> : null}
    </span>
  );
}

/** Fio que se desenha da esquerda para a direita quando entra na tela. */
function Rule() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className="h-px origin-left bg-gradient-to-r from-forum-sky/70 via-white/15 to-transparent"
    />
  );
}

export function EventNumbers() {
  return (
    <section id="numeros" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="lineField" intensity="soft" glow="split" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-14">
          <SectionHeader
            eyebrow="Resultados · 4ª edição"
            title="O Fórum em"
            outline="Números"
            description="O que a 4ª edição deixou registrado — 02 de junho de 2026, MASP, São Paulo."
          />
        </AnimatedSection>

        {/* No evento: o número-manchete sobre a foto da plateia + três marcas da programação. */}
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <figure className="group relative isolate flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[28px] border border-white/10 p-7 sm:p-9 lg:col-span-7 lg:min-h-[420px]">
            <img
              src={plateia2026}
              alt="Plateia da 4ª edição aplaudindo no auditório do MASP"
              width={1080}
              height={720}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-[50%_40%] transition-transform duration-1000 ease-out motion-safe:group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(15,26,43,0.92)_0%,rgba(15,26,43,0.35)_55%,rgba(15,26,43,0.1)_100%)]"
            />
            <figcaption>
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-forum-sky">
                No evento
              </p>
              <Figure value="669" label="" className="mt-3 text-[5.5rem] sm:text-[8rem]" />
              <p className="mt-2 text-sm font-black uppercase tracking-[0.2em] text-white/85">
                pessoas presentes
              </p>
            </figcaption>
          </figure>

          <div className="forum-glass flex flex-col justify-center rounded-[28px] px-7 py-4 sm:px-9 lg:col-span-5">
            {EVENT.map((metric, index) => (
              <div key={metric.label}>
                {index > 0 ? <Rule /> : null}
                <div className="flex items-baseline justify-between gap-6 py-6">
                  <Figure {...metric} className="text-6xl sm:text-7xl" />
                  <p className="text-right text-xs font-black uppercase tracking-[0.2em] text-white/76">
                    {metric.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Imprensa e Digital lado a lado: dois destaques e uma lista com fios. */}
        <div className="mt-4 grid gap-4 lg:mt-6 lg:grid-cols-2 lg:gap-6">
          {PANELS.map(({ key, title, Icon, featured, list }) => (
            <AnimatedSection key={key}>
              <article className="forum-card h-full rounded-[28px] p-7 sm:p-9">
                <header className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-forum-sky/50 bg-forum-sky/10 text-forum-sky">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.32em] text-white/80">
                    {title}
                  </h3>
                </header>

                <div className="mt-8 grid grid-cols-2 gap-6">
                  {featured.map((metric) => (
                    <div key={metric.label}>
                      {metric.channel ? (
                        <p className="mb-3 text-[9px] font-black uppercase tracking-[0.24em] text-forum-sky">
                          {metric.channel}
                        </p>
                      ) : null}
                      <Figure {...metric} className="text-5xl sm:text-6xl" />
                      <p className="mt-3 text-[11px] font-black uppercase leading-snug tracking-[0.16em] text-white/76">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  {list.map((metric) => (
                    <div key={metric.label}>
                      <Rule />
                      <div className="flex items-center justify-between gap-5 py-4">
                        <div className="flex min-w-0 items-center gap-3">
                          <p className="text-sm leading-snug text-white/80">{metric.label}</p>
                          {metric.channel ? (
                            <span className="shrink-0 rounded-full border border-white/12 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
                              {metric.channel}
                            </span>
                          ) : null}
                        </div>
                        <Figure {...metric} className="text-3xl" />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
