import { motion } from "framer-motion";
import { BarChart3, BriefcaseBusiness, Network, ShieldCheck } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines, identityAssets } from "./identity-assets";

const ambitionMetrics = [
  { value: "362+", label: "Organizações comprometidas" },
  { value: "+1,6 mi", label: "Pessoas trabalhadoras impactadas" },
  { value: "+1.600", label: "Metas públicas assumidas" },
  { value: "21%+", label: "Do PIB brasileiro representado" },
];

const ambitionAdvantages = [
  {
    icon: ShieldCheck,
    title: "Compromissos verificáveis",
    text: "Metas públicas e mensuráveis substituem declarações de intenção por evidências de impacto coletivo.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Vantagem competitiva",
    text: "Sustentabilidade passa a ser critério de seleção de fornecedores, parceiros, investidores e talentos.",
  },
  {
    icon: Network,
    title: "Rede de liderança",
    text: "Empresas acessam uma comunidade exclusiva de troca de práticas, influência e geração de negócios.",
  },
];

export function AmbitionStrategy() {
  return (
    <section id="ambicao-2030" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="waves" />
      <img
        src={identityAssets.lineField}
        alt=""
        className="pointer-events-none absolute -right-64 top-16 w-[980px] max-w-[200%] opacity-[0.12]"
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-[0.86fr_1fr] lg:items-center">
          <AnimatedSection>
            <SectionHeader
              eyebrow="A iniciativa que originou o Fórum"
              title="Ambição"
              outline="2030"
              description="Onde sustentabilidade vira estratégia, escala e influência."
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/74">
              <p>
                Lançada em 2022 pelo Pacto Global ONU, a Ambição 2030 organiza o setor privado a
                assumir metas públicas e mensuráveis nos temas mais urgentes do país: clima, água,
                diversidade, integridade, trabalho digno e educação, entre outros.
              </p>
              <p>
                Não é declaração de intenção: é compromisso com impacto coletivo. A iniciativa
                tornou-se referência global e inspirou o Forward Faster, programa adotado pelo Pacto
                Global em 99 países.
              </p>
            </div>
          </AnimatedSection>

          <div className="forum-glass relative overflow-hidden rounded-2xl p-5 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {ambitionMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.4 }}
                  className="forum-card min-h-40 rounded-xl p-5 sm:p-6"
                >
                  <div className={`mb-8 h-1 w-12 rounded-full ${accentLines[index]}`} />
                  <p className="font-display text-4xl font-black tracking-tight text-white sm:text-5xl">
                    {metric.value}
                  </p>
                  <p className="mt-3 text-[10px] font-black uppercase leading-tight tracking-widest text-white/62">
                    {metric.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {ambitionAdvantages.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="forum-card group min-h-64 rounded-xl p-7 transition-colors hover:border-forum-cyan/48"
            >
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-white/14 bg-white/8 text-forum-cyan transition-colors group-hover:bg-forum-cyan group-hover:text-forum-deep">
                <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/64">{text}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-t border-white/12 pt-12">
          <p className="mb-8 text-center text-[10px] font-black uppercase tracking-[0.42em] text-white/42">
            Empresas Embaixadoras que lideram esta agenda
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 px-4 text-center">
            {[
              "Aegea", "Banco do Brasil", "C&A", "CBA",
              "Coca-Cola", "Globo", "GOL", "Mulher360", "Natura", "Orizon",
              "Petrobras", "Santos Brasil", "Scania", "Ypê", "Yduqs"
            ].map((company) => (
              <span key={company} className="text-sm font-bold uppercase tracking-widest text-white/64 transition-colors hover:text-forum-cyan">
                {company}
              </span>
            ))}
          </div>
        </div>

        <div className="forum-glass-soft mt-16 flex flex-col gap-4 rounded-xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forum-cyan text-forum-deep">
              <BarChart3 aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <p className="text-lg font-display font-black uppercase tracking-tight text-white">
              Uma vez por ano, toda essa liderança se encontra num só lugar.
            </p>
          </div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-forum-cyan">
            Fórum Ambição 2030
          </p>
        </div>
      </div>
    </section>
  );
}
