import { Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import abertura1600 from "../../../assets/img/faixas/sobre_abertura_1600.jpg?url";
import abertura800 from "../../../assets/img/faixas/sobre_abertura_800.jpg?url";

export function About() {
  return (
    <section id="sobre" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="deepField" intensity="soft" glow="split" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <AnimatedSection>
          {/* Duas colunas só a partir de xl, com minmax(0,…): trilhas `fr` têm
              mínimo = conteúdo, e o "IMPLEMENTAÇÃO" gigante empurrava a coluna da
              esquerda até espremer a lateral a 98px em 1024 — "POSICIONAMENTO"
              vazava do card. */}
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] xl:items-start">
            <div className="forum-card rounded-2xl p-7 sm:p-9 lg:p-12">
              <SectionHeader
                eyebrow="4° Fórum Ambição 2030"
                title="A Década da"
                outline="Implementação"
                description="Como as empresas estão redesenhando o futuro do Brasil."
              />

              <div className="mt-8 h-px w-20 bg-forum-cyan/70" />

              <div className="mt-8 space-y-5 text-base leading-relaxed text-white/76 sm:text-[1.06rem]">
                <p>
                  Onde as maiores lideranças do Brasil se reúnem para transformar compromissos em
                  posicionamento estratégico.
                </p>
                <p>
                  O Fórum Ambição 2030 é o maior evento sobre sustentabilidade corporativa do
                  Brasil, promovido pelo Pacto Global da ONU – Rede Brasil. Em sua quarta edição,
                  reuniu centenas de altas lideranças empresariais, da sociedade civil e do poder
                  público para promover diálogos estratégicos e cocriar soluções concretas rumo aos
                  Objetivos de Desenvolvimento Sustentável (ODS).
                </p>
                <p>
                  Após anos de compromissos e declarações públicas, o desafio agora está na
                  transformação concreta dos modelos de negócio, cadeias produtivas, investimentos e
                  práticas de governança. O evento propôs uma reflexão sobre como o setor
                  empresarial brasileiro está incorporando a sustentabilidade como elemento central
                  da estratégia corporativa — impulsionando competitividade e geração de valor para
                  a sociedade.
                </p>
                <p className="font-bold text-white/88">
                  Em um momento decisivo para a Agenda 2030, o Fórum posiciona as organizações
                  comprometidas como protagonistas da Década da Implementação.
                </p>
              </div>
            </div>

            {/* Data, Horário e Local saíram daqui: são a barra do Hero, logo
                acima. Fica o que o Hero não diz (público), e a foto da abertura
                mostra a edição em vez de repetir a logística dela.
                2 colunas: mensagem + público lado a lado, foto em linha inteira. */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <article className="forum-glass rounded-xl p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-forum-cyan/82">
                  Mensagem-chave
                </p>
                <p className="mt-3 font-display text-2xl font-black uppercase leading-tight tracking-tight text-white">
                  Compromissos em posicionamento estratégico.
                </p>
              </article>

              <article className="forum-card rounded-xl p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-forum-cyan/50 bg-forum-cyan/10 text-forum-cyan">
                  <Users aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-forum-cyan/82">
                  Público
                </p>
                <p className="mt-2 text-lg font-display font-black uppercase tracking-tight text-white">
                  Gestores e lideranças de áreas estratégicas
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
                  <span className="block text-[10px] font-black uppercase tracking-[0.26em] text-forum-cyan">
                    Abertura
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
