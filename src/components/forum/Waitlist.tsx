import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { identityAssets } from "./identity-assets";

const WAITLIST_URL = "https://go.pactoglobal.org.br/listadeespera-forumambicao";

const PILLARS = [
  "Transição Energética",
  "Saúde Mental e Trabalho",
  "Rastreabilidade e Compliance",
  "Financiamento Sustentável",
  "Agenda de Gênero",
  "Economia Circular",
  "IA Ética",
  "Estratégia Ambição 2030",
];

export function Waitlist() {
  return (
    <section
      id="lista-de-espera"
      className="relative isolate overflow-hidden bg-forum-deep py-24 lg:py-32"
    >
      {/* Decorative waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src={identityAssets.waves}
          alt=""
          className="absolute left-1/2 top-1/2 w-[1800px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.14] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(35,185,214,0.18),transparent_55%),radial-gradient(ellipse_at_20%_100%,rgba(35,185,214,0.10),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-forum-cyan/30 bg-forum-cyan/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.32em] text-forum-cyan">
              <Clock aria-hidden="true" size={11} strokeWidth={2.5} />
              Vagas limitadas · Evento exclusivo
            </span>

            <h2 className="mt-4 font-display text-4xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Demonstre{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(35,185,214,0.7)" }}
              >
                Interesse
              </span>
            </h2>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/72">
              O 4° Fórum Ambição 2030 é um evento exclusivo para convidados. Se sua organização
              tem interesse em participar, registre-se na lista de espera e entraremos em contato
              conforme disponibilidade de vagas.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.a
                href={WAITLIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-forum-cyan px-8 py-4 text-[11px] font-black uppercase tracking-widest text-forum-deep shadow-[0_18px_45px_rgba(35,185,214,0.28)] transition-colors hover:bg-white"
              >
                Entrar na Lista de Espera
                <ArrowRight aria-hidden="true" size={14} strokeWidth={2.5} />
              </motion.a>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/38">
                02 Jun 2026 · MASP · São Paulo
              </p>
            </div>
          </motion.div>

          {/* Right — pillars card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="forum-glass rounded-2xl border-forum-cyan/20 p-8 sm:p-10"
          >
            <p className="mb-2 text-[9px] font-black uppercase tracking-[0.38em] text-forum-cyan/80">
              Programação
            </p>
            <p className="mb-8 font-display text-xl font-black uppercase leading-tight tracking-tight text-white">
              8 temas estratégicos em um só dia
            </p>

            <ul className="grid gap-3 sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <li
                  key={pillar}
                  className="flex items-center gap-3 rounded-lg border border-white/8 bg-white/[0.04] px-4 py-3"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-forum-cyan/30 bg-forum-cyan/10 text-[9px] font-black text-forum-cyan">
                    {i + 1}
                  </span>
                  <span className="text-[12px] font-bold uppercase tracking-wide text-white/82">
                    {pillar}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-[10px] font-black uppercase tracking-[0.26em] text-white/38">
                + Keynotes · Business Cases · Atração Artística · Networking
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
