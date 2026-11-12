import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import auditorio2400 from "../../../assets/img/hero/2026/hero_masp_auditorio_2400.webp?url";
import auditorio1200 from "../../../assets/img/hero/2026/hero_masp_auditorio_1200.webp?url";
import cafe2400 from "../../../assets/img/hero/2026/hero_masp_cafe_2400.webp?url";
import cafe1200 from "../../../assets/img/hero/2026/hero_masp_cafe_1200.webp?url";
import plateia1080 from "../../../assets/img/hero/2026/hero_masp_plateia_1080.webp?url";

type Slide = {
  wide: string;
  narrow: string;
  /** object-position no desktop e no celular (onde o corte é quase vertical). */
  focus: string;
  focusMobile: string;
  /** Fotos claras (o café é diurno) escurecem para o texto do Hero manter contraste. */
  brightness?: number;
};

/**
 * Fotos da 4ª edição (2026) que mostram o MASP: o auditório com as paredes de
 * concreto e o telão do Fórum, o MASP Café com o letreiro, e a plateia lotada.
 * A primeira é a imagem de LCP; as outras só entram depois que ela carrega.
 */
const SLIDES: Slide[] = [
  { wide: auditorio2400, narrow: auditorio1200, focus: "50% 50%", focusMobile: "50% 50%" },
  { wide: cafe2400, narrow: cafe1200, focus: "50% 55%", focusMobile: "82% 50%", brightness: 0.62 },
  { wide: plateia1080, narrow: plateia1080, focus: "50% 45%", focusMobile: "50% 45%" },
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
          <picture key={slide.wide}>
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={slide.wide}
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
