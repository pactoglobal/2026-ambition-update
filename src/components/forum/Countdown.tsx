import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function remainingUntil(target: number, now: number): Remaining | null {
  const diff = target - now;
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  };
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Um dígito que rola para cima quando muda (desligado sob prefers-reduced-motion). */
function RollingDigit({ char }: { char: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline-flex h-[1em] w-[0.62em] justify-center overflow-hidden">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={char}
          initial={reduceMotion ? false : { y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={reduceMotion ? undefined : { y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Contagem regressiva até `target` (ISO com fuso).
 *
 * - O primeiro cálculo acontece só no navegador: a página é pré-renderizada
 *   no build, e um relógio calculado ali nasceria velho e divergiria da
 *   hidratação. Até lá, as células mostram "––" no mesmo tamanho (sem pulo).
 * - Some depois que a data passa.
 * - Para leitores de tela só os dias são expostos, sem aria-live: anunciar
 *   cada segundo seria ruído.
 */
export function Countdown({ target, label }: { target: string; label: string }) {
  const targetMs = Date.parse(target);
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    if (Number.isNaN(targetMs)) return;
    const tick = () => setRemaining(remainingUntil(targetMs, Date.now()));
    tick();
    const id = window.setInterval(tick, SECOND);
    return () => window.clearInterval(id);
  }, [targetMs]);

  if (remaining === null) return null;

  const units = [
    { value: remaining ? String(remaining.days) : "––", unit: "dias" },
    { value: remaining ? pad(remaining.hours) : "––", unit: "horas" },
    { value: remaining ? pad(remaining.minutes) : "––", unit: "min" },
    { value: remaining ? pad(remaining.seconds) : "––", unit: "seg" },
  ];

  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-forum-sky">
        {label}
        {remaining ? <span className="sr-only">: {remaining.days} dias</span> : null}
      </p>
      <div aria-hidden="true" className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
        {units.map(({ value, unit }) => (
          <div
            key={unit}
            className="flex flex-col items-center rounded-xl border border-white/10 bg-forum-ink/45 px-1 py-3 sm:py-4"
          >
            <span className="flex font-display text-3xl font-black leading-none tabular-nums text-white sm:text-[2.6rem]">
              {value.split("").map((char, index) => (
                <RollingDigit key={`${unit}-${value.length - index}`} char={char} />
              ))}
            </span>
            <span className="mt-2 text-[9px] font-black uppercase tracking-[0.24em] text-white/70">
              {unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
