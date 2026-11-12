import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { NEXT_EDITION } from "./edition";
import abertura1600 from "../../../assets/img/faixas/sobre_abertura_1600.jpg?url";
import abertura800 from "../../../assets/img/faixas/sobre_abertura_800.jpg?url";

/** O fim da frase do deck, desdobrado: são os três verbos que o Fórum promete. */
const PROMISES = ["Trocar boas práticas", "Firmar parcerias", "Transformar intenção em ação"];

const FACTS = [
  { value: "10", label: "Movimentos do Pacto Global estruturam a agenda" },
  { value: "400", label: "lideranças previstas na 5ª edição" },
];

/**
 * Texto do deck institucional da 5ª edição, em composição editorial: texto
 * corrido sem caixa à esquerda, foto alta à direita com os dois números
 * sobrepostos (profundidade em vez de mais um card).
 */
export function About() {
  return (
    <section id="sobre" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="deepField" intensity="soft" glow="split" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <AnimatedSection className="lg:col-span-7">
            <SectionHeader
              eyebrow={`Sobre o Fórum · ${NEXT_EDITION.label}`}
              title="Sobre o"
              outline="Fórum"
            />

            <p className="mt-10 max-w-2xl text-2xl leading-snug text-white sm:text-[1.75rem]">
              O Fórum Ambição 2030 chega à sua 5ª edição consolidado como o principal encontro de
              sustentabilidade corporativa do Brasil.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/76 sm:text-lg">
              Estruturado a partir dos 10 Movimentos do Pacto Global da ONU – Rede Brasil, que
              traduzem os ODS em compromissos concretos para o setor privado, o evento reúne
              centenas de altas lideranças para ir além do diagnóstico:
            </p>

            <ol className="mt-10 grid max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
              {PROMISES.map((promise, index) => (
                <li key={promise} className="flex flex-col gap-6 bg-forum-deep/85 p-5 sm:p-6">
                  <span className="font-display text-sm font-black tabular-nums text-forum-sky">
                    0{index + 1}
                  </span>
                  <span className="font-display text-lg font-black uppercase leading-tight tracking-tight text-white">
                    {promise}
                  </span>
                </li>
              ))}
            </ol>
          </AnimatedSection>

          <div className="relative lg:col-span-5">
            <figure className="relative isolate overflow-hidden rounded-[28px] border border-white/10 shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
              <img
                src={abertura800}
                srcSet={`${abertura800} 800w, ${abertura1600} 1600w`}
                sizes="(min-width: 1024px) 460px, 100vw"
                alt="Ana Paula Carracedo e Luciana Nicola no palco da abertura da 4ª edição, com seus nomes no telão"
                width={1600}
                height={1067}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover object-[58%_40%] lg:aspect-[4/5]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,26,43,0.75),transparent_45%)]"
              />
              <figcaption className="absolute left-5 top-5 rounded-full border border-white/15 bg-forum-ink/60 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-white/85 backdrop-blur-md">
                Abertura da 4ª edição · MASP
              </figcaption>
            </figure>

            {/* Os números sobrepõem a base da foto no desktop; no celular vêm abaixo dela. */}
            <div className="relative mt-4 grid grid-cols-2 gap-3 lg:absolute lg:-bottom-8 lg:-left-10 lg:right-10 lg:mt-0">
              {FACTS.map(({ value, label }, index) => (
                <motion.div
                  key={value}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="forum-glass rounded-2xl p-5"
                >
                  <p className="font-display text-4xl font-black leading-none tracking-tight text-white sm:text-5xl">
                    {value}
                  </p>
                  <p className="mt-2 text-[11px] font-bold uppercase leading-snug tracking-[0.14em] text-white/74">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
