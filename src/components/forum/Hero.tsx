import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import heroBg from "../../../assets/img/hero/hero-bg.jpg?url";
import { identityAssets } from "./identity-assets";
import { NEXT_EDITION } from "./edition";

const EVENT_DETAILS = [
  { icon: Calendar, label: NEXT_EDITION.date.support, value: NEXT_EDITION.date.value },
  { icon: Clock, label: NEXT_EDITION.time.support, value: NEXT_EDITION.time.value },
  { icon: MapPin, label: NEXT_EDITION.venue.support, value: NEXT_EDITION.venue.value },
];

export function Hero() {
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen min-h-[100svh] overflow-hidden bg-forum-deep"
    >
      <img
        src={heroBg}
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_14%,rgba(35,185,214,0.22),transparent_32%),linear-gradient(96deg,rgba(6,20,36,0.92)_4%,rgba(7,25,44,0.78)_42%,rgba(7,26,45,0.58)_72%,rgba(7,26,45,0.72)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={identityAssets.waves}
          alt=""
          className="absolute left-1/2 top-[45%] w-[1900px] max-w-none -translate-x-1/2 opacity-[0.5] mix-blend-screen sm:top-[46%] lg:top-[47%] lg:w-[2200px]"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-forum-deep to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen min-h-[100svh] w-full max-w-screen-xl flex-col justify-center px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="max-w-5xl">
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center gap-3"
          >
            <span className="forum-glass-soft inline-flex items-center gap-3 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-forum-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-forum-cyan" />
              {NEXT_EDITION.label}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-forum-gold/40 bg-forum-gold/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-forum-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-forum-gold" />
              10 Movimentos · Pacto Global
            </span>
          </motion.div>

          {/* O h1 é a própria assinatura do evento: o logo oficial ainda é o
              da 4ª edição ("4º Fórum" está gravado na arte). */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-9 font-display font-black uppercase leading-[0.88] tracking-tight text-white"
          >
            <span className="block text-2xl text-forum-cyan sm:text-3xl lg:text-4xl">
              {NEXT_EDITION.ordinal} Fórum
            </span>
            <span className="mt-2 block text-6xl sm:text-8xl lg:text-9xl">Ambição 2030</span>
          </motion.h1>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 max-w-3xl font-display text-2xl font-black uppercase leading-[1.02] tracking-tight text-white/92 sm:text-4xl"
          >
            O principal encontro de sustentabilidade corporativa do Brasil
          </motion.p>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/74 sm:text-xl"
          >
            Altas lideranças reunidas para ir além do diagnóstico: trocar boas práticas, firmar
            parcerias e transformar intenção em ação.
          </motion.p>

          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="mt-10">
            <div className="grid w-full overflow-hidden rounded-[22px] border border-forum-cyan/44 bg-[linear-gradient(135deg,rgba(35,185,214,0.18),rgba(255,255,255,0.045))] shadow-[0_0_36px_rgba(35,185,214,0.15)] backdrop-blur-2xl sm:grid-cols-3">
              {EVENT_DETAILS.map(({ icon: Icon, label, value }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 border-white/12 p-5 sm:p-6 ${
                    index < 2 ? "border-b sm:border-b-0 sm:border-r" : ""
                  }`}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-forum-cyan/75 bg-forum-cyan/10 text-forum-cyan">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-forum-cyan">
                      {label}
                    </p>
                    <p className="mt-1 text-lg font-display font-black uppercase text-white">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <motion.button
              type="button"
              onClick={() => scrollTo("seja-parceiro")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-forum-cyan px-8 py-4 text-[10px] font-black uppercase tracking-widest text-forum-deep shadow-[0_18px_45px_rgba(35,185,214,0.22)] transition-colors hover:bg-white"
            >
              Seja parceiro do evento
              <ArrowRight aria-hidden="true" size={15} strokeWidth={2.5} />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollTo("ultima-edicao")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="forum-glass-soft rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:text-forum-cyan"
            >
              Como foi a 4ª edição
            </motion.button>

            <div className="flex items-center gap-4 sm:ml-auto">
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/56">
                Realização
              </p>
              <img
                src={identityAssets.pacto}
                alt="Pacto Global da ONU – Rede Brasil"
                width={800}
                height={864}
                className="h-14 w-auto object-contain opacity-95"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
