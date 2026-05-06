import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { KineticBackdrop, SectionHeader } from "./Identity";

export function Contact() {
  return (
    <section id="contato" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="mb-16 text-center">
          <SectionHeader
            eyebrow="Canais de Atendimento"
            title="Fale"
            outline="Conosco"
            align="center"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="forum-card rounded-xl border-forum-cyan/24 p-8 text-center sm:p-12"
          >
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-forum-cyan/34 bg-forum-cyan/12 text-forum-cyan">
              <Mail aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <p className="mb-3 text-[9px] font-black uppercase tracking-[0.36em] text-forum-cyan/78">
              RSVP — Convidados
            </p>
            <a
              href="mailto:rsvp@pactoglobal.org.br"
              className="block break-words text-xl font-display font-black tracking-tight text-white transition-colors hover:text-forum-cyan sm:text-2xl"
            >
              rsvp@pactoglobal.org.br
            </a>
          </motion.div>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.45 }}
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
          Evento exclusivo para convidados — Vagas limitadas
        </p>
      </div>
    </section>
  );
}
