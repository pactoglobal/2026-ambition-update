import { motion } from "framer-motion";
import { BadgeCheck, Handshake, LineChart, Network, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import auditorio from "../../../assets/img/galeria-de-momentos/2026/04_auditorio_lotado_2026.jpg?url";
import painel from "../../../assets/img/galeria-de-momentos/2026/07_painel_1_2026.jpg?url";
import assinatura from "../../../assets/img/galeria-de-momentos/2026/17_assinatura_termo_2026.jpg?url";
import relatorio from "../../../assets/img/galeria-de-momentos/2026/12_relatorio_ambicao_2026.jpg?url";
import networking from "../../../assets/img/galeria-de-momentos/2026/16_networking_2026.jpg?url";
import coletiva from "../../../assets/img/galeria-de-momentos/2026/22_foto_coletiva_2026.jpg?url";

type BentoItem = {
  title: string;
  desc: string;
  Icon: LucideIcon;
  /** Cor ODS oficial: tinge a foto e preenche o chip do ícone. */
  ods: string;
  /** Foto da 4ª edição que ilustra o tema do card. */
  photo: string;
  /** Recorte da foto dentro do card (object-position). */
  focus: string;
  /** Card-manchete: ocupa 2×2 no desktop e ganha tipografia maior. */
  feature?: boolean;
  /** Spans literais — o scanner do Tailwind precisa ler a classe inteira. */
  span: string;
};

/**
 * Grade sem buracos em todos os breakpoints:
 *   md (3 col): A A B / A A C / D E F  — 9 células
 *   sm (2 col): A A / B C / D E / F F — 8 células
 * A versão anterior somava 8 células numa grade de 3 colunas e deixava uma
 * célula vazia ao lado de "Protagonismo Empresarial".
 */
const BENTO_ITEMS: BentoItem[] = [
  {
    title: "Posicionamento Estratégico",
    desc: "Organizações conectadas à agenda que influencia o futuro da sustentabilidade empresarial no Brasil.",
    Icon: LineChart,
    ods: "#A21942",
    photo: auditorio,
    focus: "50% 40%",
    feature: true,
    span: "sm:col-span-2 md:col-span-2 md:row-span-2",
  },
  {
    title: "Boas Práticas",
    desc: "Trocas reais entre lideranças que já estão transformando metas em implementação.",
    Icon: BadgeCheck,
    ods: "#3F7E44",
    photo: painel,
    focus: "50% 55%",
    span: "",
  },
  {
    title: "Parcerias",
    desc: "Conexões com organizações comprometidas, especialistas e atores institucionais.",
    Icon: Handshake,
    ods: "#19486A",
    photo: assinatura,
    focus: "50% 35%",
    span: "",
  },
  {
    title: "Evidências de Impacto",
    desc: "Discussões orientadas por dados, compromissos públicos e resultados mensuráveis.",
    Icon: ShieldCheck,
    ods: "#00689D",
    photo: relatorio,
    focus: "50% 45%",
    span: "",
  },
  {
    title: "Networking Qualificado",
    desc: "Ambiente exclusivo para lideranças, gestores e áreas estratégicas.",
    Icon: Network,
    ods: "#FD6925",
    photo: networking,
    focus: "50% 40%",
    span: "",
  },
  {
    title: "Protagonismo Empresarial",
    desc: "Participação ativa na construção da Década da Implementação ao lado das maiores lideranças do Brasil.",
    Icon: Users,
    ods: "#BF8B2E",
    photo: coletiva,
    focus: "50% 45%",
    span: "sm:col-span-2 md:col-span-1",
  },
];

export function WhatToExpect() {
  return (
    <section id="expectations" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" glow="center" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-16">
          <SectionHeader
            eyebrow="Movimentos em foco"
            title="O Que o Fórum"
            outline="Entrega"
            align="center"
            description="Um espaço de troca de boas práticas, conhecimento estratégico e colaboração para acelerar a implementação dos ODS no Brasil."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[272px] md:grid-cols-3">
          {BENTO_ITEMS.map(({ title, desc, Icon, ods, photo, focus, feature, span }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.45 }}
              className={`group relative isolate flex overflow-hidden rounded-2xl border border-white/12 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] transition-[transform,border-color] duration-300 motion-safe:hover:-translate-y-1 hover:border-white/24 ${
                feature ? "min-h-[360px]" : "min-h-[280px]"
              } md:min-h-0 ${span}`}
            >
              {/* Foto: decorativa — o significado do card está no texto. */}
              <img
                src={photo}
                alt=""
                aria-hidden="true"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                style={{ objectPosition: focus }}
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
              />

              {/* Tinta ODS no canto do ícone + escurecimento na base, onde fica o texto. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 transition-opacity duration-500 group-hover:opacity-90"
                style={{
                  background: `linear-gradient(140deg, ${ods}cc 0%, ${ods}33 38%, transparent 62%), linear-gradient(to top, rgba(7,26,44,0.9) 0%, rgba(7,26,44,0.25) 58%, rgba(7,26,44,0.1) 100%)`,
                }}
              />

              <div className="flex w-full flex-col justify-between p-3 sm:p-4">
                <span
                  className={`flex items-center justify-center rounded-xl shadow-lg ring-1 ring-white/25 ${
                    feature ? "h-12 w-12" : "h-10 w-10"
                  }`}
                  style={{ backgroundColor: ods }}
                >
                  <Icon
                    aria-hidden="true"
                    size={feature ? 24 : 20}
                    strokeWidth={1.8}
                    className="text-white"
                  />
                </span>

                {/* Painel de vidro: aqui o blur tem uma foto por trás, então de fato
                    aparece. Compacto nos cards menores para a foto continuar visível. */}
                <div
                  className={`forum-glass-photo rounded-xl transition-colors duration-300 ${
                    feature ? "p-6 sm:p-7" : "px-4 py-3.5"
                  }`}
                >
                  <h3
                    className={`font-display font-black uppercase leading-[1.05] tracking-tight text-white ${
                      feature ? "mb-3 text-2xl sm:text-4xl" : "mb-1.5 text-lg sm:text-xl"
                    }`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`leading-relaxed text-white/82 ${
                      feature ? "max-w-md text-[15px]" : "text-[13px]"
                    }`}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
