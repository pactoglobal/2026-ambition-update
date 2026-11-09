import { motion } from "framer-motion";
import { Megaphone, Smartphone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";

type Metric = {
  /** Prefixo (ex.: "R$"), renderizado menor que o numero. */
  prefix?: string;
  value: string;
  /** Unidade (ex.: "M", "mil", "h", "%"), tambem menor que o numero. */
  suffix?: string;
  label: string;
  /** Canal de origem do dado, quando o numero so faz sentido com ele. */
  channel?: string;
  /** Numero-manchete do grupo: ganha mais escala que os demais. */
  featured?: boolean;
  /** Spans literais — o scanner do Tailwind precisa ler a classe inteira no fonte. */
  span: string;
};

type MetricGroup = {
  key: string;
  label: string;
  Icon: LucideIcon;
  metrics: Metric[];
};

/**
 * Numeros da 4a edicao (02/06/2026, MASP), conforme o consolidado
 * Ambicao2030_BigNumbers enviado pela equipe de comunicacao.
 *
 * Prefixo e unidade ficam separados do numero de proposito: "R$ 11,3M" e
 * "60,8 mil" quebravam a linha e vazavam do cartao quando renderizados como
 * um texto unico no tamanho de manchete.
 *
 * Os spans sao deliberadamente irregulares: o numero-manchete de cada bloco
 * ocupa mais colunas, para a secao ter hierarquia em vez de virar uma grade
 * uniforme de 15 cartoes iguais.
 */
const groups: MetricGroup[] = [
  {
    key: "evento",
    label: "No evento",
    Icon: Users,
    metrics: [
      {
        value: "669",
        label: "pessoas presentes",
        featured: true,
        span: "col-span-2 lg:col-span-6",
      },
      { value: "40", label: "speakers", span: "col-span-1 lg:col-span-2" },
      { value: "10", suffix: "h", label: "de conteúdo", span: "col-span-1 lg:col-span-2" },
      { value: "6", label: "eixos temáticos", span: "col-span-2 lg:col-span-2" },
    ],
  },
  {
    key: "imprensa",
    label: "Imprensa",
    Icon: Megaphone,
    metrics: [
      {
        value: "23,5",
        suffix: "M",
        label: "pessoas impactadas",
        featured: true,
        span: "col-span-2 lg:col-span-4",
      },
      {
        prefix: "R$",
        value: "11,3",
        suffix: "M",
        label: "em valoração de mídia",
        featured: true,
        span: "col-span-2 lg:col-span-4",
      },
      {
        value: "179",
        label: "matérias publicadas, 100% positivas",
        span: "col-span-2 lg:col-span-4",
      },
      {
        value: "+239",
        suffix: "%",
        label: "de crescimento em exposição",
        span: "col-span-1 lg:col-span-4",
      },
      {
        value: "8",
        label: "jornalistas presentes no evento",
        span: "col-span-1 lg:col-span-4",
      },
      {
        value: "22",
        label: "conteúdos enviados à imprensa pela RBPG",
        span: "col-span-2 lg:col-span-4",
      },
    ],
  },
  {
    key: "digital",
    label: "Digital",
    Icon: Smartphone,
    metrics: [
      {
        value: "60,8",
        suffix: "mil",
        label: "visualizações",
        channel: "Instagram",
        featured: true,
        span: "col-span-2 lg:col-span-4",
      },
      {
        value: "23,1",
        suffix: "mil",
        label: "contas alcançadas",
        channel: "Instagram",
        span: "col-span-2 lg:col-span-4",
      },
      {
        value: "7,5",
        suffix: "mil",
        label: "impressões em 7 posts",
        channel: "LinkedIn",
        span: "col-span-2 lg:col-span-4",
      },
      {
        value: "264",
        label: "interações",
        channel: "LinkedIn",
        span: "col-span-1 lg:col-span-6",
      },
      {
        value: "8,3",
        suffix: "mil",
        label: "usuários no site",
        channel: "Site",
        span: "col-span-1 lg:col-span-6",
      },
    ],
  },
];

export function EventNumbers() {
  let accentIndex = 0;

  return (
    <section id="numeros" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" intensity="soft" glow="split" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-16">
          <SectionHeader
            eyebrow="Retrospectiva · 4ª Edição"
            title="O Fórum em"
            outline="Números"
            align="center"
            description="O que a 4ª edição deixou registrado — 02 de junho de 2026, MASP, São Paulo."
          />
        </AnimatedSection>

        <div className="flex flex-col gap-14">
          {groups.map(({ key, label, Icon, metrics }) => (
            <AnimatedSection key={key}>
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-forum-cyan">
                  <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="text-[11px] font-black uppercase tracking-[0.32em] text-white/70">
                  {label}
                </h3>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-6">
                {metrics.map(
                  (
                    { prefix, value, suffix, label: metricLabel, channel, featured, span },
                    index,
                  ) => {
                    const accent = accentLines[accentIndex++ % accentLines.length];

                    return (
                      <motion.div
                        key={`${key}-${metricLabel}`}
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.06, duration: 0.45 }}
                        className={`forum-card relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-6 xl:p-8 ${span} ${
                          featured ? "min-h-48 lg:min-h-56" : "min-h-40"
                        }`}
                      >
                        <div className={`absolute left-0 top-0 h-1 w-full ${accent}`} />

                        {channel ? (
                          <span className="mb-4 w-fit rounded-full border border-white/12 bg-white/8 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-white/70">
                            {channel}
                          </span>
                        ) : null}

                        <p
                          className={`flex items-baseline gap-1.5 whitespace-nowrap font-display font-bold leading-none tracking-tight text-white ${
                            featured ? "text-5xl lg:text-6xl" : "text-3xl lg:text-4xl"
                          }`}
                        >
                          {prefix ? (
                            <span className="text-[0.42em] font-black text-white/70">{prefix}</span>
                          ) : null}
                          {value}
                          {suffix ? (
                            <span className="text-[0.46em] font-black text-white/70">{suffix}</span>
                          ) : null}
                        </p>
                        <p className="mt-3 text-[11px] font-black uppercase leading-snug tracking-[0.16em] text-white/58">
                          {metricLabel}
                        </p>
                      </motion.div>
                    );
                  },
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
