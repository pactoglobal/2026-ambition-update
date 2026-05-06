import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const sponsorshipBenefits = [
  "Visibilidade: Posicionamento em ambiente institucional de alto nível.",
  "Relacionamento: Acesso exclusivo à alta liderança e formadores de opinião.",
  "Conexão: Networking com empresas que lideram a implementação sustentável.",
  "Mídia: Destaque em veículos nacionais e visibilidade espontânea.",
  "Influência: Participação ativa na construção da agenda da Década da Implementação.",
];

const tiers = [
  { name: "Naming Right", price: "R$ 1,2M", color: "border-forum-cyan bg-forum-cyan/5" },
  { name: "Master", price: "R$ 800K", color: "border-white/20 bg-white/5" },
  { name: "Líder", price: "R$ 500K", color: "border-white/10" },
  { name: "Patrocínio", price: "R$ 300K", color: "border-white/10 opacity-80" },
  { name: "Apoio", price: "R$ 100K", color: "border-white/5 opacity-60" },
];

export function Sponsorship() {
  return (
    <section id="patrocinio" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" />
      
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Oportunidade Estratégica"
              title="Por que"
              outline="Apoiar?"
              description="Empresas que lideram a agenda de sustentabilidade constroem autoridade, não apenas reputação."
            />
            
            <div className="mt-10 space-y-6">
              {sponsorshipBenefits.map((benefit) => {
                const [title, desc] = benefit.split(": ");
                return (
                  <div key={title} className="flex gap-4">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forum-cyan/20 text-forum-cyan">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-display font-black uppercase tracking-tight text-white">{title}</p>
                      <p className="mt-1 text-sm text-white/58">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="forum-glass-soft mt-12 rounded-xl p-6">
              <div className="flex items-start gap-4 text-forum-cyan">
                <Info size={20} className="mt-1 shrink-0" />
                <p className="text-xs leading-relaxed text-white/70">
                  Cada entrega foi pensada para gerar retorno concreto em visibilidade, relacionamento e associação à agenda global de sustentabilidade corporativa da ONU.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid gap-4">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.42em] text-white/42">
              Cotas de Apoio · Fórum Ambição 2030
            </p>
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between rounded-xl border p-6 transition-all duration-300 hover:scale-[1.01] ${tier.color}`}
              >
                <div>
                  <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white">
                    {tier.name}
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/42">Cota Anual</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-forum-cyan">{tier.price}</p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/32">*Base 2025</p>
                </div>
              </motion.div>
            ))}
            
            <p className="mt-6 text-center text-[9px] font-bold uppercase tracking-widest text-white/32">
              Consulte a tabela completa de contrapartidas com nossa equipe comercial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
