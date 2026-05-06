import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const annualEvents = [
  { date: "09 a 13/03", label: "Evento Internacional" },
  { date: "26/03", label: "Encontro Estratégico" },
  { date: "11/05", label: "Diálogo de Impacto" },
  { date: "02/06", label: "Fórum Ambição 2030", highlight: true },
  { date: "04/08", label: "Fórum Temático" },
  { date: "18/09", label: "Assembleia Geral ONU" },
  { date: "09 a 20/11", label: "Direitos Humanos e Empresas" },
  { date: "02 a 04/12", label: "Conferência Anual" },
];

export function AnnualAgenda() {
  return (
    <section id="agenda-anual" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" intensity="soft" />
      
      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-16 text-center">
          <SectionHeader
            eyebrow="Calendário Estratégico 2026"
            title="Agenda"
            outline="Anual"
            align="center"
            description="O Fórum Ambição integra uma agenda anual de eventos de alto nível que posicionam as empresas no centro da sustentabilidade global."
          />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {annualEvents.map((event, index) => (
            <motion.div
              key={event.date + event.label}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`forum-card group flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all duration-300 ${
                event.highlight 
                  ? "border-forum-cyan/40 bg-forum-cyan/10 shadow-[0_0_30px_rgba(35,185,214,0.15)]" 
                  : "hover:border-white/20"
              }`}
            >
              <Calendar 
                size={24} 
                className={`mb-4 transition-colors ${event.highlight ? "text-forum-cyan" : "text-white/20 group-hover:text-white/40"}`} 
              />
              <p className={`font-display text-xl font-black uppercase tracking-tight ${event.highlight ? "text-forum-cyan" : "text-white"}`}>
                {event.date}
              </p>
              <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/42">
                {event.label}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 text-center text-[9px] font-bold uppercase tracking-[0.32em] text-white/32">
          * Datas-chave sujeitas a alteração conforme calendário global da ONU.
        </p>
      </div>
    </section>
  );
}
