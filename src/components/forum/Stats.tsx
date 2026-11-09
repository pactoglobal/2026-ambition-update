import { motion } from "framer-motion";
import { Building2, FileText, Megaphone, Mic, Newspaper, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";
import plenaria2025 from "../../../assets/img/galeria-de-momentos/2025/rachel_42_2025.jpeg?url";

type Stat = {
  Icon: LucideIcon;
  value: string;
  label: string;
  /** Peça de destaque: 2×2 com foto da edição de 2025. */
  feature?: boolean;
  /** Spans literais — o scanner do Tailwind precisa ler a classe inteira. */
  span: string;
};

/**
 * Mesma gramática do bento de "O Que o Fórum Entrega", e a mesma grade sem
 * buracos: md = A A B / A A C / D E F, sm = A A / B C / D E / F F.
 * Antes eram seis cards idênticos — a grade uniforme achatava a hierarquia,
 * e "830 participantes" pesava o mesmo que "12 artigos".
 */
const stats: Stat[] = [
  {
    Icon: Users,
    value: "830",
    label: "Participantes em 2025",
    feature: true,
    span: "sm:col-span-2 md:col-span-2 md:row-span-2",
  },
  { Icon: Building2, value: "443", label: "Empresas representadas", span: "" },
  { Icon: Mic, value: "42", label: "Speakers de alto nível", span: "" },
  { Icon: Megaphone, value: "R$ 41,1M", label: "Em earned media", span: "" },
  { Icon: Newspaper, value: "53", label: "Publicações", span: "" },
  { Icon: FileText, value: "12", label: "Artigos", span: "sm:col-span-2 md:col-span-1" },
];

export function Stats() {
  return (
    <section className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="waves" intensity="soft" glow="warm" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-16">
          <SectionHeader
            eyebrow="Impacto Histórico"
            title="Edições"
            outline="Anteriores"
            align="center"
            description="Registro do alcance das edições anteriores do Fórum Ambição 2030."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:auto-rows-[232px] md:grid-cols-3">
          {stats.map(({ Icon, value, label, feature, span }, index) => (
            <motion.div
              key={label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className={`forum-card group relative isolate flex overflow-hidden rounded-2xl ${
                feature
                  ? "min-h-[380px] flex-col justify-end p-3 sm:p-4"
                  : "min-h-56 flex-col items-center justify-center gap-5 p-6 text-center"
              } md:min-h-0 ${span}`}
            >
              <div
                className={`absolute left-0 top-0 z-10 h-1 w-full ${accentLines[index % accentLines.length]}`}
              />

              {feature ? (
                <>
                  <img
                    src={plenaria2025}
                    alt="Palestrante de costas no palco da 3ª edição, em 2025, diante do auditório lotado"
                    width={1200}
                    height={766}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -z-20 h-full w-full object-cover object-[62%_45%] transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(7,26,44,0.88)_0%,rgba(7,26,44,0.2)_55%,rgba(7,26,44,0.05)_100%)]"
                  />
                  <div className="forum-glass-photo w-fit rounded-xl px-6 py-5 sm:px-7">
                    <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-forum-cyan">
                      3ª edição
                    </span>
                    <p className="font-display text-6xl font-bold leading-none tracking-tight text-white sm:text-7xl">
                      {value}
                    </p>
                    <p className="mt-3 text-[11px] font-black uppercase tracking-widest text-white/72">
                      {label}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-forum-cyan transition-colors group-hover:bg-forum-cyan group-hover:text-forum-deep">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-4xl font-bold tracking-tight text-white lg:text-5xl">
                      {value}
                    </p>
                    <p className="mx-auto mt-3 max-w-[160px] text-[10px] font-black uppercase leading-tight tracking-widest text-white/58">
                      {label}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
