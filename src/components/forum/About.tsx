import { Layers, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { NEXT_EDITION } from "./edition";
import abertura1600 from "../../../assets/img/faixas/sobre_abertura_1600.jpg?url";
import abertura800 from "../../../assets/img/faixas/sobre_abertura_800.jpg?url";

/** Texto do deck institucional da 5ª edição. */
export function About() {
  return (
    <section id="sobre" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="deepField" intensity="soft" glow="split" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          {/* Duas colunas só a partir de xl, com minmax(0,…): trilhas `fr` têm
              mínimo = conteúdo, e um título gigante empurrava a coluna da
              esquerda até espremer a lateral. */}
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] xl:items-start">
            <div className="forum-card rounded-2xl p-7 sm:p-9 lg:p-12">
              <SectionHeader
                eyebrow={`Sobre o Fórum · ${NEXT_EDITION.label}`}
                title="Sobre o"
                outline="Fórum"
              />

              <div className="mt-8 h-px w-20 bg-forum-sky/70" />

              <div className="mt-8 space-y-5 text-base leading-relaxed text-white/76 sm:text-[1.06rem]">
                <p>
                  O Fórum Ambição 2030 chega à sua 5ª edição consolidado como o principal encontro
                  de sustentabilidade corporativa do Brasil.
                </p>
                <p>
                  Estruturado a partir dos 10 Movimentos do Pacto Global da ONU – Rede Brasil, que
                  traduzem os ODS em compromissos concretos para o setor privado, o evento reúne
                  centenas de altas lideranças para ir além do diagnóstico:
                </p>
                <p className="font-bold text-white/88">
                  trocar boas práticas, firmar parcerias e transformar intenção em ação.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <article className="forum-glass rounded-xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-forum-sky/50 bg-forum-sky/10 text-forum-sky">
                  <Layers aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-forum-sky">
                  Estrutura
                </p>
                <p className="mt-2 font-display text-2xl font-black uppercase leading-tight tracking-tight text-white">
                  10 Movimentos do Pacto Global
                </p>
              </article>

              <article className="forum-card rounded-xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-forum-sky/50 bg-forum-sky/10 text-forum-sky">
                  <Users aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-forum-sky">
                  Público
                </p>
                <p className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-white">
                  400 pessoas
                </p>
                <p className="mt-2 text-sm leading-snug text-white/68">
                  Gestores e lideranças de áreas estratégicas responsáveis por impulsionar a agenda
                  de sustentabilidade corporativa nas organizações.
                </p>
              </article>

              <figure className="forum-card relative isolate overflow-hidden rounded-xl sm:col-span-2 xl:col-span-1">
                <img
                  src={abertura800}
                  srcSet={`${abertura800} 800w, ${abertura1600} 1600w`}
                  sizes="(min-width: 1280px) 420px, (min-width: 640px) 90vw, 100vw"
                  alt="Ana Paula Carracedo e Luciana Nicola no palco da abertura da 4ª edição, com seus nomes no telão"
                  width={1600}
                  height={1067}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/9] w-full object-cover object-[58%_40%] xl:aspect-[4/3]"
                />
                <figcaption className="forum-glass-photo absolute inset-x-3 bottom-3 rounded-lg px-4 py-3">
                  <span className="block text-[10px] font-black uppercase tracking-[0.26em] text-forum-sky">
                    Abertura da 4ª edição
                  </span>
                  <span className="mt-1 block text-sm font-bold text-white">
                    Ana Paula Carracedo e Luciana Nicola
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
