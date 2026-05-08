import { Building2, Globe2, Scale, Users2 } from "lucide-react";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { identityAssets } from "./identity-assets";

const highlights = [
  {
    icon: Globe2,
    title: "Maior iniciativa de sustentabilidade corporativa do mundo",
    text: "Mais de 20 mil participantes em 62 redes cobrindo 77 países, comprometidos com os 10 Princípios universais da ONU.",
  },
  {
    icon: Building2,
    title: "2ª maior rede local do mundo",
    text: "Criada em 2003, a Rede Brasil conta com mais de 2.000 participantes e conecta empresas de todos os setores em torno de metas concretas.",
  },
  {
    icon: Scale,
    title: "Compromissos públicos",
    text: "Transforma diretrizes globais em metas concretas, governança e evidências de resultado no país.",
  },
  {
    icon: Users2,
    title: "Liderança coletiva",
    text: "Atua com empresas, sociedade e instituições para acelerar a Agenda 2030 e uma economia inclusiva.",
  },
];

export function PactoGlobalInfo() {
  return (
    <section className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" />
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="forum-card rounded-2xl p-8 sm:p-10">
            <SectionHeader
              eyebrow="Sobre o realizador"
              title="Pacto Global"
              outline="ONU - Rede Brasil"
              description="A iniciativa convoca o setor privado a liderar soluções para os principais desafios de sustentabilidade."
            />
            <p className="mt-8 text-base leading-relaxed text-white/74 sm:text-lg">
              No Brasil, o Pacto Global da ONU articula empresas em torno de compromissos
              estratégicos que fortalecem competitividade, integridade, inclusão e ação climática. É
              dessa agenda que nasce o Fórum Ambição 2030.
            </p>
          </div>

          <div className="forum-glass overflow-hidden rounded-2xl p-6 sm:p-8">
            <img
              src={identityAssets.pacto}
              alt="Pacto Global ONU - Rede Brasil"
              width={800}
              height={864}
              className="mb-8 h-16 w-auto object-contain opacity-90 sm:h-20"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, text }) => (
                <article key={title} className="forum-card rounded-xl p-5">
                  <Icon aria-hidden="true" className="mb-4 h-6 w-6 text-forum-cyan" />
                  <h3 className="text-sm font-display font-black uppercase tracking-tight text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/64">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
