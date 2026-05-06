import { motion } from "framer-motion";
import { Building2, FileText, Megaphone, Mic, Newspaper, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";

const stats = [
  { Icon: Users, value: "830", label: "Participantes em 2025" },
  { Icon: Building2, value: "443", label: "Empresas representadas" },
  { Icon: Mic, value: "42", label: "Speakers de alto nível" },
  { Icon: Megaphone, value: "R$ 41,1M", label: "Em earned media" },
  { Icon: Newspaper, value: "53", label: "Publicações" },
  { Icon: FileText, value: "12", label: "Artigos" },
];

export function Stats() {
  return (
    <section className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="waves" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-16">
          <SectionHeader
            eyebrow="Impacto Histórico"
            title="Edições"
            outline="Anteriores"
            align="center"
            description="A base de alcance das edições anteriores reforça o papel do Fórum como ponto de encontro de decisão para a agenda 2030."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ Icon, value, label }, index) => (
            <motion.div
              key={label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="forum-card group relative flex min-h-64 flex-col items-center gap-6 overflow-hidden rounded-2xl p-8 text-center"
            >
              <div
                className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`}
              />
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/12 bg-white/8 text-forum-cyan transition-colors group-hover:bg-forum-cyan group-hover:text-forum-deep">
                <Icon aria-hidden="true" className="h-8 w-8" strokeWidth={1.5} />
              </div>

              <div>
                <p className="font-display text-4xl font-bold tracking-tight text-white lg:text-5xl">
                  {value}
                </p>
                <p className="mx-auto mt-3 max-w-[160px] text-[10px] font-black uppercase leading-tight tracking-widest text-white/58">
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
