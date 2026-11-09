import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { KineticBackdrop, SectionHeader } from "./Identity";

export function Contact() {
  return (
    <section id="contato" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" glow="center" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="mb-16 text-center">
          <SectionHeader
            eyebrow="Canais de Atendimento"
            title="Fale"
            outline="Conosco"
            align="center"
          />
        </div>

        {/* O canal de RSVP saiu com o fim da 4a edicao: convidava a garantir
            vaga num evento ja realizado. Parcerias e Apoio segue valido. */}
        <div className="mx-auto max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="forum-card rounded-xl border-white/12 bg-white/5 p-8 text-center sm:p-12"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/22 bg-white/8 text-white">
              <Mail aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-[9px] font-black uppercase tracking-[0.36em] text-white/64">
              Parcerias e Apoio
            </p>
            <p className="text-xl font-display font-black uppercase tracking-tight text-white">
              Rafael Carmo
            </p>
            <a
              href="mailto:rafael.carmo@pactoglobal.org.br"
              className="mt-1 block break-words text-sm font-bold text-forum-cyan transition-colors hover:text-white"
            >
              rafael.carmo@pactoglobal.org.br
            </a>
          </motion.div>
        </div>

        <p className="mt-12 text-center text-sm font-bold uppercase tracking-widest text-white/44">
          4ª edição realizada em 02 de junho de 2026 · MASP, São Paulo
        </p>
      </div>
    </section>
  );
}
