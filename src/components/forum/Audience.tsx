import { motion } from "framer-motion";
import { KineticBackdrop, SectionHeader } from "./Identity";

export function Audience() {
  return (
    <section className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <SectionHeader
            eyebrow="Público-alvo"
            title="Encontro Estratégico"
            outline="de Alto Nível"
            align="center"
            description="Altas lideranças de empresas brasileiras, organizações da sociedade civil, representantes de governo, líderes de opinião, academia e imprensa."
          />
          <div className="mt-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-forum-cyan/34 bg-forum-cyan/10 px-8 py-4 backdrop-blur-md sm:px-10">
              <div className="h-2 w-2 rounded-full bg-forum-cyan" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-forum-cyan">
                Evento exclusivo para convidados
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
