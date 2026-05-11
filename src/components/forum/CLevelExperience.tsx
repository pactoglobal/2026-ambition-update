import { motion } from "framer-motion";
import { GlassWater, MapPin, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const experienceDetails = [
  { icon: Users, label: "Público e Capacidade", value: "CEO · 80 convidados" },
  { icon: MapPin, label: "Local", value: "Cidade Matarazzo — Aya Hub, São Paulo" },
  { icon: GlassWater, label: "Formato", value: "Keynote + Coquetel de Relacionamento" },
];

export function CLevelExperience() {
  return (
    <section id="coquetel" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" intensity="soft" />
      
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_0.8fr] lg:items-center">
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
                    <p className="font-display text-lg font-bold text-white uppercase tracking-tight">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="forum-glass relative overflow-hidden rounded-2xl p-8 sm:p-10"
          >
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-forum-cyan/10 blur-[80px]" />
            
            <h3 className="mb-8 font-display text-2xl font-black uppercase tracking-tight text-white">
              Agenda Preliminar <span className="text-forum-cyan">· 01/06</span>
            </h3>

            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-px before:bg-white/10">
              <div className="relative pl-10">
                <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-4 border-forum-ink bg-forum-cyan" />
                <time className="text-[10px] font-black uppercase tracking-widest text-forum-cyan">18h30 às 19h10</time>
                <p className="mt-1 font-display text-lg font-bold text-white uppercase">Keynote Speaker</p>
              </div>
              
              <div className="relative pl-10">
                <div className="absolute left-0 top-1.5 h-[22px] w-[22px] rounded-full border-4 border-forum-ink bg-white/20" />
                <time className="text-[10px] font-black uppercase tracking-widest text-white/42">19h10 às 20h00</time>
                <p className="mt-1 font-display text-lg font-bold text-white uppercase">Coquetel de Relacionamento</p>
              </div>
            </div>

            <p className="mt-10 text-[9px] font-bold uppercase tracking-widest text-white/32">
              * Informações preliminares, sujeitas a alteração.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
