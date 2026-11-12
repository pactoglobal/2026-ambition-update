import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import iniciativa2400 from "../../../assets/img/faixas/faixa_iniciativa_2x1_2400.webp?url";
import iniciativa1600 from "../../../assets/img/faixas/faixa_iniciativa_2x1_1600.webp?url";
import iniciativaMobile from "../../../assets/img/faixas/faixa_iniciativa_3x2_1200.webp?url";
import iniciativaFallback from "../../../assets/img/faixas/faixa_iniciativa_3x2_1200.jpg?url";
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
  /**
   * Botão opcional: âncora na própria página (`targetId`) ou link externo
   * (`href`, abre em nova aba).
   */
  cta?: { label: string; targetId: string } | { label: string; href: string };
};

/**
 * Faixa fotográfica de largura total entre seções. Existe para quebrar a
 * sequência de seções com o mesmo molde (fundo + título + grade de cards de
 * vidro) e para dar à retrospectiva o peso das fotos do próprio evento.
 *
 * - <picture> com direção de arte: corte 2:1 no desktop, 3:2 inteiro no
 *   celular. Cada visitante baixa uma variante só.
 * - Parallax só com transform e desligada sob prefers-reduced-motion.
 * - Topo e base esmaecem nas cores de borda do .forum-surface (#152238 em
 *   baixo da seção anterior, #1a2a44 no topo da seguinte): sem emenda dura.
 */
function PhotoBand({ eyebrow, title, outline, photo, focus = "50% 50%", cta }: PhotoBandProps) {
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#1a2a44_0%,rgba(26,42,68,0.82)_22%,rgba(26,42,68,0.2)_58%,transparent_78%),linear-gradient(to_right,rgba(15,26,43,0.78)_0%,rgba(15,26,43,0.3)_45%,transparent_70%),linear-gradient(to_bottom,#152238_0%,transparent_16%)]"
      />

      <div className="mx-auto w-full max-w-screen-xl px-5 pb-14 sm:px-8 sm:pb-20 lg:px-12">
        <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.38em] text-forum-sky">
          {eyebrow}
        </span>
        <p className="max-w-4xl font-display text-[clamp(2.6rem,7.4vw,7rem)] font-black uppercase leading-[0.9] tracking-tight text-white">
          {title} {/* block: a 2ª frase ganha linha própria em vez de quebrar no meio. */}
          <span className="block text-forum-sky">{outline}</span>
        </p>
        {cta && "href" in cta ? (
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-forum-action px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_18px_45px_rgba(74,122,168,0.35)] transition-colors hover:bg-forum-action-hover"
          >
            {cta.label}
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={2.5} />
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        ) : cta ? (
          <a
            href={`#${cta.targetId}`}
            onClick={(event) => {
              const el = document.getElementById(cta.targetId);
              if (!el) return;
              event.preventDefault();
              const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
              window.history.pushState(null, "", `#${cta.targetId}`);
              window.scrollTo({ top, behavior: "smooth" });
            }}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-forum-action px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_18px_45px_rgba(74,122,168,0.35)] transition-colors hover:bg-forum-action-hover"
          >
            {cta.label}
            <ArrowRight aria-hidden="true" size={15} strokeWidth={2.5} />
          </a>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Abre a seção Ambição 2030. A foto é o mural de compromissos dos Movimentos
 * (+Água, Ambição Net Zero, Conexão Circular) montado na 4ª edição.
 */
export function InitiativeBand() {
  return (
    <PhotoBand
      eyebrow="Ambição 2030"
      title="A iniciativa que"
      outline="originou o Fórum"
      focus="50% 35%"
      cta={{
        label: "Conheça a Ambição 2030",
        href: "https://www.pactoglobal.org.br/ambicao_2030/",
      }}
      photo={{
        wide2400: iniciativa2400,
        wide1600: iniciativa1600,
        mobile: iniciativaMobile,
        fallback: iniciativaFallback,
      }}
    />
  );
}

/** CTA âncora logo depois de "O que o Fórum entrega": leva ao formulário "Seja parceiro". */
export function PartnerBand() {
  return (
    <PhotoBand
      eyebrow="Oportunidade de parceria"
      title="Seja parceiro"
      outline="da 5ª edição."
      focus="40% 50%"
      cta={{ label: "Seja parceiro do evento", targetId: "seja-parceiro" }}
      photo={{
        wide2400: resultados2400,
        wide1600: resultados1600,
        mobile: resultadosMobile,
        fallback: resultadosFallback,
      }}
    />
  );
}
