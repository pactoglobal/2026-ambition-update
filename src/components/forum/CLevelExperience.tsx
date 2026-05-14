"use client";

import { motion } from "framer-motion";
import { GlassWater, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const experienceDetails = [
  { icon: Users, label: "Público e Capacidade", value: "CEO · 80 convidados" },
  { icon: GlassWater, label: "Formato", value: "Keynote + Coquetel de Relacionamento" },
];

const keynoteSpeaker = {
  name: "Avanish Sahai",
  role: "Diretor Independente | SaaS, IA & Plataformas em Nuvem | GTM, Ecossistemas & Expansão Global",
};


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

            {/* Keynote Speaker */}
            <div className="mt-8 rounded-xl border border-forum-gold/30 bg-forum-gold/8 p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-forum-gold/70">Keynote Speaker</p>
              <p className="mt-2 font-display text-xl font-black uppercase tracking-tight text-white">{keynoteSpeaker.name}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/55">{keynoteSpeaker.role}</p>
            </div>
          </AnimatedSection>

          {/* right — decorative visual */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}
