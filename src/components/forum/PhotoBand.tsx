import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import movimentos2400 from "../../../assets/img/faixas/faixa_multiplos_movimentos_2x1_2400.webp?url";
import movimentos1600 from "../../../assets/img/faixas/faixa_multiplos_movimentos_2x1_1600.webp?url";
import movimentosMobile from "../../../assets/img/faixas/faixa_multiplos_movimentos_3x2_1200.webp?url";
import movimentosFallback from "../../../assets/img/faixas/faixa_multiplos_movimentos_3x2_1200.jpg?url";
import resultados2400 from "../../../assets/img/faixas/faixa_resultados_2x1_2400.webp?url";
import resultados1600 from "../../../assets/img/faixas/faixa_resultados_2x1_1600.webp?url";
import resultadosMobile from "../../../assets/img/faixas/faixa_resultados_3x2_1200.webp?url";
import resultadosFallback from "../../../assets/img/faixas/faixa_resultados_3x2_1200.jpg?url";

type BandPhoto = {
  /** Corte 2:1 para telas a partir de 768px. */
  wide2400: string;
  wide1600: string;
  /** Foto 3:2 inteira para celular, onde a faixa fica quase quadrada. */
  mobile: string;
  /** JPEG de reserva para navegadores sem WebP. */
  fallback: string;
};

type PhotoBandProps = {
  eyebrow: string;
  title: string;
  outline: string;
  photo: BandPhoto;
  /** object-position da foto dentro da faixa. */
  focus?: string;
};

/**
 * Faixa fotográfica de largura total entre seções. Existe para quebrar a
 * sequência de seções com o mesmo molde (fundo + título + grade de cards de
 * vidro) e para dar à retrospectiva o peso das fotos do próprio evento.
 *
 * - <picture> com direção de arte: corte 2:1 no desktop, 3:2 inteiro no
 *   celular. Cada visitante baixa uma variante só.
 * - Parallax só com transform e desligada sob prefers-reduced-motion.
 * - Topo e base esmaecem nas cores de borda do .forum-surface (#0b243c em
 *   baixo da seção anterior, #102f4f no topo da seguinte): sem emenda dura.
 */
function PhotoBand({ eyebrow, title, outline, photo, focus = "50% 50%" }: PhotoBandProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // A imagem tem 120% da altura, com 10% de folga em cada ponta: ±8% da
  // própria altura (= ±9,6% da faixa) nunca revela a borda.
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      className="relative isolate flex h-[64vh] max-h-[640px] min-h-[380px] items-end overflow-hidden bg-forum-ink sm:min-h-[440px]"
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[10%] -z-20 h-[120%]">
        <picture>
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet={`${photo.wide1600} 1600w, ${photo.wide2400} 2400w`}
            sizes="100vw"
          />
          <source type="image/webp" srcSet={`${photo.mobile} 1200w`} sizes="100vw" />
          <img
            src={photo.fallback}
            alt=""
            aria-hidden="true"
            width={1200}
            height={800}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: focus }}
            className="h-full w-full object-cover"
          />
        </picture>
      </motion.div>

      {/* Legibilidade do texto (base e esquerda) + emendas com as seções vizinhas. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#102f4f_0%,rgba(16,47,79,0.82)_22%,rgba(16,47,79,0.2)_58%,transparent_78%),linear-gradient(to_right,rgba(7,26,44,0.78)_0%,rgba(7,26,44,0.3)_45%,transparent_70%),linear-gradient(to_bottom,#0b243c_0%,transparent_16%)]"
      />

      <div className="mx-auto w-full max-w-screen-xl px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
        <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.38em] text-forum-cyan">
          {eyebrow}
        </span>
        <p className="max-w-4xl font-display text-[clamp(2.6rem,7.4vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
          {title}{" "}
          {/* block: a frase em contorno ganha linha própria em vez de quebrar
              no meio ("UMA SÓ" numa linha, "AÇÃO." na outra). Traço próprio, e
              não o .forum-outline-text: aquele (1px a 48%) foi feito para fundo
              liso e quase some sobre foto. */}
          <span className="block text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.82)]">
            {outline}
          </span>
        </p>
      </div>
    </div>
  );
}

/** Entre "O Que o Fórum Entrega" e "Ambição 2030": o slogan da edição. */
export function MovementsBand() {
  return (
    <PhotoBand
      eyebrow="4ª edição · MASP, São Paulo"
      title="Múltiplos movimentos."
      outline="Uma só ação."
      focus="50% 55%"
      photo={{
        wide2400: movimentos2400,
        wide1600: movimentos1600,
        mobile: movimentosMobile,
        fallback: movimentosFallback,
      }}
    />
  );
}

/** Abre o bloco de resultados (Edições Anteriores → O Fórum em Números). */
export function ResultsBand() {
  return (
    <PhotoBand
      eyebrow="Resultados"
      title="Do palco"
      outline="aos números."
      focus="40% 50%"
      photo={{
        wide2400: resultados2400,
        wide1600: resultados1600,
        mobile: resultadosMobile,
        fallback: resultadosFallback,
      }}
    />
  );
}
