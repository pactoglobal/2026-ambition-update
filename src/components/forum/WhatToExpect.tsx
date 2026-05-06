import { motion } from "framer-motion";
import { BadgeCheck, Handshake, LineChart, Network, ShieldCheck, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const BENTO_ITEMS = [
  {
    title: "Posicionamento Estratégico",
    desc: "Sua organização conectada à agenda que influencia o futuro da sustentabilidade empresarial no Brasil.",
    icon: LineChart,
    className: "md:col-span-2 border-forum-cyan/30 bg-forum-cyan/10",
    color: "text-forum-cyan",
    bg: "/img/galeria-de-momentos/event-gallery-2.jpg",
  },
  {
    title: "Boas Práticas",
    desc: "Trocas reais entre lideranças que já estão transformando metas em implementação.",
    icon: BadgeCheck,
    className: "border-forum-green/22 bg-forum-green/8",
    color: "text-forum-green",
    bg: "/identity/ods/ods-08.jpg",
  },
  {
    title: "Parcerias",
    desc: "Conexões com organizações comprometidas, especialistas e atores institucionais.",
    icon: Handshake,
    className: "border-forum-gold/22 bg-forum-gold/8",
    color: "text-forum-gold",
    bg: "/img/local-masp/venue-gallery-1.jpg",
  },
  {
    title: "Evidências de Impacto",
    desc: "Discussões orientadas por dados, compromissos públicos e resultados mensuráveis.",
    icon: ShieldCheck,
    className: "border-forum-magenta/24 bg-forum-magenta/8",
    color: "text-forum-magenta",
    bg: "/identity/ods/ods-16.jpg",
  },
  {
    title: "Networking Qualificado",
    desc: "Ambiente exclusivo para lideranças, gestores e áreas estratégicas.",
    icon: Network,
    className: "border-forum-red/24 bg-forum-red/8",
    color: "text-forum-red",
    bg: "/img/galeria-de-momentos/event-gallery-6.jpg",
  },
  {
    title: "Protagonismo Empresarial",
    desc: "Participação ativa na construção da Década da Implementação.",
    icon: Users,
    className: "md:col-span-2 border-forum-blue/24 bg-forum-blue/10",
    color: "text-forum-cyan",
    bg: "/identity/ods/ods-17.jpg",
  },
];

export function WhatToExpect() {
  return (
    <section id="expectations" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-16">
          <SectionHeader
            eyebrow="Movimentos em foco"
            title="O Que"
            outline="Esperar"
            align="center"
            description="Um espaço de troca de boas práticas, conhecimento estratégico e colaboração para acelerar a implementação dos ODS no Brasil."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:auto-rows-[230px] md:grid-cols-3">
          {BENTO_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
              className={`forum-card group relative overflow-hidden rounded-xl border p-8 transition-colors duration-300 hover:border-white/32 ${item.className}`}
            >
              <img
                src={item.bg}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.18] transition-opacity duration-300 group-hover:opacity-[0.24]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/80 via-forum-ink/58 to-forum-ink/30" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className={`mb-4 w-fit rounded-lg bg-white/8 p-3 ${item.color}`}>
                  <item.icon aria-hidden="true" size={28} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-display font-black uppercase tracking-tight text-white transition-colors group-hover:text-forum-cyan">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/62">{item.desc}</p>
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-forum-cyan via-forum-magenta to-forum-green opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
