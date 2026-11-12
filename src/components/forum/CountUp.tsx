import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Número que sobe de zero até `value` quando entra na tela.
 *
 * `value` vem no formato de exibição ("669", "23,5", "+239"): sinal e casas
 * decimais são preservados e a formatação é pt-BR.
 *
 * - O HTML pré-renderizado traz o valor final (buscadores, sem JS e leitores
 *   de tela leem o número certo); só no navegador ele volta a zero, e apenas
 *   se ainda estiver fora da tela.
 * - O texto que anima é aria-hidden; o valor final fica em sr-only.
 * - Sob prefers-reduced-motion, mostra o valor final direto.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduceMotion = useReducedMotion();
  const started = useRef(false);
  const [display, setDisplay] = useState(value);

  const sign = value.startsWith("+") ? "+" : "";
  const target = Number.parseFloat(value.replace("+", "").replace(/\./g, "").replace(",", "."));
  const decimals = (value.split(",")[1] ?? "").length;

  useEffect(() => {
    if (reduceMotion || started.current || Number.isNaN(target)) return;
    const format = (v: number) =>
      sign +
      v.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    if (!inView) {
      setDisplay(format(0));
      return;
    }

    started.current = true;
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    // StrictMode desmonta e remonta o efeito em dev: sem reabrir a trava, o
    // número ficaria parado no meio da animação.
    return () => {
      controls.stop();
      started.current = false;
    };
  }, [inView, reduceMotion, target, decimals, sign, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
