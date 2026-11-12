import { useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Countdown } from "./Countdown";
import { HeroSlides } from "./HeroSlides";
import { identityAssets } from "./identity-assets";
import { NEXT_EDITION } from "./edition";

const EVENT_DETAILS = [
  { icon: Calendar, label: NEXT_EDITION.date.support, value: NEXT_EDITION.date.value },
  { icon: Clock, label: NEXT_EDITION.time.support, value: NEXT_EDITION.time.value },
  { icon: MapPin, label: NEXT_EDITION.venue.support, value: NEXT_EDITION.venue.value },
];

/** Com dia definido, conta até a abertura; sem ele, até o mês previsto. */
const countdownTarget = NEXT_EDITION.startsAt ?? NEXT_EDITION.countdownFallback.at;
const countdownLabel = NEXT_EDITION.startsAt
  ? `Faltam para a ${NEXT_EDITION.label}`
  : NEXT_EDITION.countdownFallback.label;

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
      <HeroSlides />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_14%,rgba(105,156,198,0.16),transparent_32%),linear-gradient(96deg,rgba(15,26,43,0.9)_4%,rgba(15,26,43,0.78)_45%,rgba(15,26,43,0.4)_75%,rgba(15,26,43,0.5)_100%)]" />
      {/* No celular o texto ocupa a largura toda: o degradê horizontal não basta
          sobre a foto clara do MASP Café. Camada vertical extra só abaixo de md. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,26,43,0.62)_0%,rgba(15,26,43,0.8)_55%,rgba(15,26,43,0.9)_100%)] md:hidden" />
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

      <div className="relative z-10 mx-auto flex min-h-screen min-h-[100svh] w-full max-w-screen-xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14 xl:gap-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="forum-glass-soft inline-flex items-center gap-3 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-forum-sky">
                <span className="h-1.5 w-1.5 rounded-full bg-forum-sky" />
                {NEXT_EDITION.label}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/6 px-4 py-2 text-[10px] font-black uppercase tracking-[0.34em] text-white/85">
                <span className="h-1.5 w-1.5 rounded-full bg-forum-sky" />
                10 Movimentos · Pacto Global
              </span>
            </div>

            {/* O h1 é o logo oficial; o texto completo fica para leitores de tela e buscadores. */}
            <h1 className="mt-9">
              <span className="sr-only">{NEXT_EDITION.ordinal} Fórum Ambição 2030</span>
              <img
                src={identityAssets.logoOficial}
                alt=""
                width={460}
                height={232}
                fetchPriority="high"
                className="h-auto w-[260px] drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:w-[360px] xl:w-[420px]"
              />
            </h1>

            <p className="mt-10 max-w-3xl font-display text-3xl font-black uppercase leading-[0.98] tracking-tight text-white sm:text-5xl xl:text-[3.5rem]">
              O principal encontro de{" "}
              <span className="text-forum-sky">sustentabilidade corporativa</span> do Brasil
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/76 sm:text-xl">
              Altas lideranças reunidas para ir além do diagnóstico: trocar boas práticas, firmar
              parcerias e transformar intenção em ação.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <motion.button
                type="button"
                onClick={() => scrollTo("seja-parceiro")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-forum-action px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white shadow-[0_18px_45px_rgba(74,122,168,0.35)] transition-colors hover:bg-forum-action-hover"
              >
                Seja parceiro do evento
                <ArrowRight aria-hidden="true" size={15} strokeWidth={2.5} />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => scrollTo("ultima-edicao")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="forum-glass-soft rounded-full px-8 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-colors hover:text-forum-sky"
              >
                Como foi a 4ª edição
              </motion.button>
            </div>
          </div>

          {/* Painel da próxima edição: contagem regressiva + dados previstos.
              Vidro de verdade: a foto do MASP passa desfocada por trás. */}
          <aside
            aria-label={`${NEXT_EDITION.label}: contagem regressiva e informações`}
            className="forum-glass relative overflow-hidden rounded-[28px] p-6 sm:p-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-forum-sky/20 blur-3xl"
            />
            <Countdown target={countdownTarget} label={countdownLabel} />

            <dl className="mt-7 divide-y divide-white/10 border-t border-white/10">
              {EVENT_DETAILS.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 py-4 last:pb-0">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forum-sky/50 bg-forum-sky/10 text-forum-sky">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col gap-1 min-[420px]:flex-row min-[420px]:items-baseline min-[420px]:justify-between min-[420px]:gap-4">
                    <dt className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70">
                      {label}
                    </dt>
                    <dd className="font-display min-[420px]:text-right text-base font-black uppercase text-white sm:text-lg">
                      {value}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
