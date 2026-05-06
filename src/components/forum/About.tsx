import { Calendar, Clock3, MapPin, Users } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const EVENT_FACTS = [
  { icon: Calendar, label: "Data", value: "02 de Junho de 2026" },
  { icon: Clock3, label: "Horário", value: "09h às 18h" },
  { icon: MapPin, label: "Local", value: "MASP, São Paulo" },
  {
    icon: Users,
    label: "Público",
    value: "Gestores e lideranças de áreas estratégicas",
  },
];

export function About() {
  return (
    <section id="sobre" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="deepField" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-12">
        <AnimatedSection>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
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
                  Em 2026, o Fórum Ambição 2030 chega à sua 4ª edição consolidado como o principal
                  encontro de sustentabilidade corporativa do Brasil. Estruturado a partir dos 10
                  Movimentos do Pacto Global da ONU - Rede Brasil, que traduzem os ODS em
                  compromissos concretos para o setor privado, o evento reúne centenas de altas
                  lideranças para ir além do diagnóstico: trocar boas práticas, firmar parcerias e
                  transformar intenção em ação.
                </p>
                <p className="font-bold text-white/88">
                  Em um momento em que o mundo cobra das empresas não apenas discurso, mas
                  evidências de impacto, o Fórum posiciona as organizações comprometidas como
                  protagonistas da transição para uma economia mais sustentável.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <article className="forum-glass rounded-xl p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.26em] text-forum-cyan/82">
                  Mensagem-chave
                </p>
                <p className="mt-3 font-display text-2xl font-black uppercase leading-tight tracking-tight text-white">
                  Compromissos em posicionamento estratégico.
                </p>
              </article>
              {EVENT_FACTS.map(({ icon: Icon, label, value }) => (
                <article key={label} className="forum-card rounded-xl p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg border border-forum-cyan/50 bg-forum-cyan/10 text-forum-cyan">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-[0.26em] text-forum-cyan/82">
                    {label}
                  </p>
                  <p className="mt-2 text-lg font-display font-black uppercase tracking-tight text-white">
                    {value}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
