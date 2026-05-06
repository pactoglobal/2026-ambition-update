import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { identityAssets } from "./identity-assets";

const EVENT_DETAILS = [
  { icon: Calendar, label: "Data", value: "02 de Junho de 2026", support: "Terça-feira" },
  { icon: Clock, label: "Horário", value: "09h às 18h", support: "Dia completo" },
  { icon: MapPin, label: "Local", value: "MASP", support: "São Paulo" },
];

const HERO_PARTNERS = [
  {
    label: "Realização",
    src: identityAssets.pacto,
    alt: "Pacto Global Rede Brasil",
    width: 800,
    height: 864,
    className: "h-14 sm:h-16",
  },
  {
    label: "Patrocínio Master",
    src: identityAssets.aegea,
    alt: "Aegea",
    width: 1080,
    height: 445,
    className: "h-10 sm:h-12",
  },
  {
    label: "Apoio",
    src: identityAssets.aya,
    alt: "Aya Earth Partners",
    width: 600,
    height: 200,
    className: "h-10 sm:h-12",
  },
];

export function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" className="relative isolate min-h-screen overflow-hidden bg-forum-deep">
      <img
        src="/img/hero/hero-bg.jpg"
        alt=""
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_14%,rgba(35,185,214,0.22),transparent_32%),linear-gradient(96deg,rgba(6,20,36,0.92)_4%,rgba(7,25,44,0.78)_42%,rgba(7,26,45,0.58)_72%,rgba(7,26,45,0.72)_100%)]" />
      <img
        src={identityAssets.waves}
        alt=""
        className="pointer-events-none absolute left-1/2 top-[45%] z-[2] w-[1900px] max-w-none -translate-x-1/2 opacity-[0.5] mix-blend-screen sm:top-[46%] lg:top-[47%] lg:w-[2200px]"
      />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-forum-deep to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-screen-xl flex-col justify-center px-5 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="max-w-5xl">
          <h1 className="sr-only">4º Fórum Ambição 2030 - A Década da Implementação</h1>

          <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
            <span className="forum-glass-soft inline-flex items-center gap-3 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-forum-cyan">
              <span className="h-1.5 w-1.5 rounded-full bg-forum-cyan" />
              4ª Edição · A Década da Implementação
            </span>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="forum-glass mt-8 flex w-full max-w-[340px] flex-col items-center rounded-[32px] border-forum-cyan/60 p-5 sm:max-w-[380px] sm:p-6"
          >
            <img
              src={identityAssets.logo}
              alt="4º Fórum Ambição 2030"
              width={400}
              height={151}
              className="h-auto w-full max-w-[280px] object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.42)]"
            />
          </motion.div>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-9 max-w-4xl text-4xl font-display font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Como as empresas estão redesenhando o futuro do Brasil
          </motion.p>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-white/74 sm:text-xl"
          >
            Onde as maiores lideranças do Brasil se reúnem para transformar compromissos em
            posicionamento estratégico.
          </motion.p>

          <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="mt-10 space-y-5">
            <div className="grid w-full overflow-hidden rounded-[22px] border border-forum-cyan/44 bg-[linear-gradient(135deg,rgba(35,185,214,0.18),rgba(255,255,255,0.045))] shadow-[0_0_36px_rgba(35,185,214,0.15)] backdrop-blur-2xl sm:grid-cols-3">
              {EVENT_DETAILS.map(({ icon: Icon, label, value, support }, index) => (
                <div
                  key={label}
                  className={`flex gap-4 border-white/12 p-5 sm:p-6 ${
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
                    <p className="mt-1 text-sm text-white/62">{support}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="forum-glass grid w-full gap-0 overflow-hidden rounded-[22px] sm:grid-cols-3">
              {HERO_PARTNERS.map(({ label, src, alt, width, height, className }, index) => (
                <div
                  key={label}
                  className={`flex min-h-[132px] flex-col justify-center gap-4 border-white/12 px-5 py-6 sm:px-6 ${
                    index < 2 ? "border-b sm:border-b-0 sm:border-r" : ""
                  }`}
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.28em] text-forum-cyan/82">
                    {label}
                  </p>
                  <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`${className} h-14 w-auto max-w-[190px] object-contain opacity-95`}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <motion.button
              type="button"
              onClick={() => scrollTo("agenda")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-forum-cyan px-8 py-4 text-[10px] font-black uppercase tracking-widest text-forum-deep shadow-[0_18px_45px_rgba(35,185,214,0.22)] transition-colors hover:bg-white"
            >
              Ver Programação
            </motion.button>
            <motion.button
              type="button"
              onClick={() => scrollTo("contato")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="forum-glass-soft rounded-full px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:border-forum-cyan/70 hover:text-forum-cyan"
            >
              Confirmar Presença
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
