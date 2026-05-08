import { motion } from "framer-motion";
import { BadgeCheck, Handshake, LineChart, Network, ShieldCheck, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

// ODS official colors
const BENTO_ITEMS = [
  {
    title: "Posicionamento Estratégico",
    desc: "Sua organização conectada à agenda que influencia o futuro da sustentabilidade empresarial no Brasil.",
    icon: LineChart,
    bg: "#A21942",
    span: "md:col-span-2",
  },
  {
    title: "Boas Práticas",
    desc: "Trocas reais entre lideranças que já estão transformando metas em implementação.",
    icon: BadgeCheck,
    bg: "#3F7E44",
    span: "",
  },
  {
    title: "Parcerias",
    desc: "Conexões com organizações comprometidas, especialistas e atores institucionais.",
    icon: Handshake,
    bg: "#19486A",
    span: "",
  },
  {
    title: "Evidências de Impacto",
    desc: "Discussões orientadas por dados, compromissos públicos e resultados mensuráveis.",
    icon: ShieldCheck,
    bg: "#00689D",
    span: "",
  },
  {
    title: "Networking Qualificado",
    desc: "Ambiente exclusivo para lideranças, gestores e áreas estratégicas.",
    icon: Network,
    bg: "#FD6925",
    span: "",
  },
  {
    title: "Protagonismo Empresarial",
    desc: "Participação ativa na construção da Década da Implementação ao lado das maiores lideranças do Brasil.",
    icon: Users,
    bg: "#BF8B2E",
    span: "md:col-span-2",
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[220px] md:grid-cols-3">
          {BENTO_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className={`group relative overflow-hidden rounded-2xl p-7 transition-transform duration-300 hover:-translate-y-1 ${item.span}`}
              style={{ backgroundColor: item.bg }}
            >
              {/* Subtle inner grain for depth */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.06]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />
              {/* Radial light from top-left */}
              <div className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full bg-white/15 blur-2xl" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                {/* Top: icon */}
                <div className="rounded-xl bg-white/15 p-3 backdrop-blur-sm w-fit">
                  <item.icon aria-hidden="true" size={26} strokeWidth={1.8} className="text-white" />
                </div>

                {/* Bottom: title + desc */}
                <div>
                  <h3 className="mb-2 font-display text-xl font-black uppercase leading-tight tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/80">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
