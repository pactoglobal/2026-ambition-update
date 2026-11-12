import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import plateia2400 from "../../../assets/img/hero/2026/hero_masp_plateia_2400.webp?url";
import plateia1600 from "../../../assets/img/hero/2026/hero_masp_plateia_1600.webp?url";
import plateia1200 from "../../../assets/img/hero/2026/hero_masp_plateia_1200.webp?url";
import cafe2400 from "../../../assets/img/hero/2026/hero_masp_cafe_2400.webp?url";
import cafe1600 from "../../../assets/img/hero/2026/hero_masp_cafe_1600.webp?url";
import cafe1200 from "../../../assets/img/hero/2026/hero_masp_cafe_1200.webp?url";
import concreto2400 from "../../../assets/img/hero/2026/hero_masp_concreto_2400.webp?url";
import concreto1600 from "../../../assets/img/hero/2026/hero_masp_concreto_1600.webp?url";
import concreto1200 from "../../../assets/img/hero/2026/hero_masp_concreto_1200.webp?url";

type Slide = {
  w2400: string;
  w1600: string;
  narrow: string;
  /** object-position no desktop e no celular (onde o corte é quase vertical). */
  focus: string;
  focusMobile: string;
  /** Fotos claras (o café é diurno) escurecem para o texto do Hero manter contraste. */
  brightness?: number;
};

/**
 * Fotos da 4ª edição (02/06/2026, no MASP), todas em alta resolução: a plateia
 * lotada diante das paredes de concreto iluminadas do auditório (primeira, é
 * a imagem de LCP), o MASP Café com o letreiro e a plateia vista do fundo.
 * Nenhuma mostra o telão "4º Fórum": o Hero fala da 5ª edição.
 */
const SLIDES: Slide[] = [
  {
    w2400: plateia2400,
    w1600: plateia1600,
    narrow: plateia1200,
    focus: "50% 55%",
    focusMobile: "62% 60%",
  },
  {
    w2400: cafe2400,
    w1600: cafe1600,
    narrow: cafe1200,
    focus: "50% 55%",
    focusMobile: "82% 50%",
    brightness: 0.62,
  },
  {
    w2400: concreto2400,
    w1600: concreto1600,
    narrow: concreto1200,
    focus: "50% 40%",
    focusMobile: "70% 40%",
  },
];

const SLIDE_MS = 7000;
/** Espera antes de buscar os slides 2 e 3, para não competir com o LCP. */
const DEFER_MS = 2500;

export function HeroSlides() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setLoadRest(true), DEFER_MS);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (reduceMotion || !loadRest) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, loadRest]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      {SLIDES.map((slide, index) => {
        if (index > 0 && !loadRest) return null;
        const isActive = index === active;

        return (
          <picture key={slide.w2400}>
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={`${slide.w1600} 1600w, ${slide.w2400} 2400w`}
              sizes="100vw"
            />
            <img
              src={slide.narrow}
              alt=""
              width={1200}
              height={800}
              fetchPriority={index === 0 ? "high" : "low"}
              decoding="async"
              style={
                {
                  "--focus": slide.focus,
                  "--focus-mobile": slide.focusMobile,
                  // Fade de 1,6 s e zoom lento de 8 s nos dois sentidos: a foto
                  // que sai segue ampliando devagar enquanto some, sem salto.
                  transitionProperty: "opacity, transform",
                  transitionDuration: "1600ms, 8000ms",
                  filter: slide.brightness ? `brightness(${slide.brightness})` : undefined,
                } as CSSProperties
              }
              className={`absolute inset-0 h-full w-full object-cover ease-out [object-position:var(--focus-mobile)] motion-reduce:!transition-none md:[object-position:var(--focus)] ${
                isActive ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
              }`}
            />
          </picture>
        );
      })}
    </div>
  );
}
