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

/**
 * Contagem regressiva até `startsAt` (ISO com fuso, ex. "2027-06-01T09:00:00-03:00").
 *
 * - Não renderiza nada sem data válida ou depois que o evento começa.
 * - O primeiro cálculo acontece só no navegador (useEffect): a página é
 *   pré-renderizada no build, e um relógio calculado ali já nasceria velho e
 *   divergiria da hidratação.
 * - Os números mudam a cada segundo, mas só o texto para leitores de tela
 *   (dias) é exposto, e sem aria-live: anunciar cada segundo seria ruído.
 */
export function Countdown({ startsAt, label }: { startsAt: string | null; label: string }) {
  const target = startsAt ? Date.parse(startsAt) : Number.NaN;
  const [remaining, setRemaining] = useState<Remaining | null>(null);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const tick = () => setRemaining(remainingUntil(target, Date.now()));
    tick();
    const id = window.setInterval(tick, SECOND);
    return () => window.clearInterval(id);
  }, [target]);

  if (!remaining) return null;

  const units = [
    { value: String(remaining.days), unit: remaining.days === 1 ? "dia" : "dias" },
    { value: pad(remaining.hours), unit: "horas" },
    { value: pad(remaining.minutes), unit: "min" },
    { value: pad(remaining.seconds), unit: "seg" },
  ];

  return (
    <div className="forum-glass flex w-fit flex-col gap-4 rounded-[22px] px-5 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
      <p className="text-[10px] font-black uppercase tracking-[0.28em] text-forum-cyan">
        {label}
        <span className="sr-only">
          : faltam {remaining.days} {units[0].unit}
        </span>
      </p>
      <div aria-hidden="true" className="flex items-end gap-3 sm:gap-4">
        {units.map(({ value, unit }, index) => (
          <div key={unit} className="flex items-end gap-3 sm:gap-4">
            {index > 0 ? (
              <span className="pb-5 font-display text-2xl font-black text-white/30">:</span>
            ) : null}
            <div className="flex min-w-[3ch] flex-col items-center">
              <span className="font-display text-4xl font-black leading-none tabular-nums text-white sm:text-5xl">
                {value}
              </span>
              <span className="mt-1.5 text-[9px] font-black uppercase tracking-[0.24em] text-white/72">
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
