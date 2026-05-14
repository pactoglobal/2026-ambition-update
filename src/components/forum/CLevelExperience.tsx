"use client";

import { motion } from "framer-motion";
import { GlassWater, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";

const confirmedPhotos = import.meta.glob(
  "../../../assets/img/liderancas/confirmados-2026/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

function photoByKey(key: string): string | undefined {
  const entry = Object.entries(confirmedPhotos).find(([path]) =>
    path.toLowerCase().includes(key.toLowerCase())
  );
  return entry?.[1];
}

const experienceDetails = [
  { icon: Users, label: "Público e Capacidade", value: "CEO · 80 convidados" },
  { icon: GlassWater, label: "Formato", value: "Keynote + Coquetel de Relacionamento" },
];

const keynoteSpeaker = {
  name: "Avanish Sahai",
  role: "Diretor Independente | SaaS, IA & Plataformas em Nuvem | GTM, Ecossistemas & Expansão Global",
  photoKey: "avanish",
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

          </AnimatedSection>

          {/* right — keynote speaker card */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {(() => {
              const photo = photoByKey(keynoteSpeaker.photoKey);
              return (
                <article className="forum-card group relative overflow-hidden rounded-2xl">
                  {photo ? (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={photo}
                        alt={`Foto de ${keynoteSpeaker.name}`}
                        width={600}
                        height={800}
                        loading="eager"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink via-forum-ink/30 to-transparent" />
                      <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[1]}`} />
                      <span className="absolute left-4 top-4 rounded-full border border-white/14 bg-forum-ink/70 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-forum-gold backdrop-blur-sm">
                        Keynote Speaker
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="text-xl font-display font-black uppercase leading-tight tracking-tight text-white">
                          {keynoteSpeaker.name}
                        </h3>
                        <p className="mt-1.5 text-[11px] font-bold uppercase leading-snug tracking-wider text-white/60">
                          {keynoteSpeaker.role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative min-h-[360px] p-7">
                      <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[1]}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/90 via-forum-ink/60 to-forum-ink/20" />
                      <div className="relative z-10 flex min-h-[300px] flex-col justify-between">
                        <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-forum-gold">
                          Keynote Speaker
                        </span>
                        <div>
                          <h3 className="text-2xl font-display font-black uppercase leading-tight tracking-tight text-white">
                            {keynoteSpeaker.name}
                          </h3>
                          <p className="mt-3 text-[11px] font-bold uppercase leading-relaxed tracking-wider text-white/55">
                            {keynoteSpeaker.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })()}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
