import { ReactNode } from "react";
import { identityAssets, type BackdropAssetKey } from "./identity-assets";

/**
 * Luz ambiente atrás dos cards de vidro. Sem ela, o backdrop-filter dos
 * .forum-card/.forum-glass desfocava um azul quase uniforme (a camada escura
 * abaixo cobre a imagem a 72–96%) e o vidro não aparecia em lugar nenhum.
 *
 * Centros entre 40% e 60% da altura e fade em 70% do raio: a luz se apaga
 * antes da borda da seção, então não há emenda visível entre seções. Seções
 * vizinhas usam presets diferentes para a página não repetir o mesmo halo.
 */
const GLOW_PRESETS = {
  split:
    "radial-gradient(40% 45% at 16% 50%, rgba(35,185,214,0.24), transparent 70%), radial-gradient(36% 42% at 84% 50%, rgba(192,24,92,0.18), transparent 70%)",
  center:
    "radial-gradient(46% 45% at 50% 56%, rgba(8,121,156,0.30), transparent 70%), radial-gradient(28% 35% at 14% 42%, rgba(35,185,214,0.18), transparent 70%)",
  rise: "radial-gradient(38% 45% at 22% 58%, rgba(78,164,63,0.18), transparent 70%), radial-gradient(40% 45% at 80% 42%, rgba(35,185,214,0.24), transparent 70%)",
  warm: "radial-gradient(38% 45% at 82% 56%, rgba(184,137,63,0.20), transparent 70%), radial-gradient(34% 42% at 16% 44%, rgba(192,24,92,0.18), transparent 70%)",
} as const;

export type GlowPreset = keyof typeof GLOW_PRESETS;

export function KineticBackdrop({
  image = "waves",
  intensity = "soft",
  glow = "split",
}: {
  image?: BackdropAssetKey;
  intensity?: "soft" | "strong";
  glow?: GlowPreset;
}) {
  const src = identityAssets[image];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={src}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ${
          intensity === "strong" ? "opacity-[0.28]" : "opacity-[0.12]"
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(174,207,230,0.18),transparent_30%),linear-gradient(180deg,rgba(14,38,63,0.72),rgba(14,38,63,0.96))]" />
      <div className="absolute inset-0" style={{ background: GLOW_PRESETS[glow] }} />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  outline,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  outline?: string;
  description?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.38em] text-forum-cyan">
        {eyebrow}
      </span>
      <h2 className="text-4xl font-display font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
        {outline ? (
          <>
            {" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(174, 207, 230, 0.52)" }}
            >
              {outline}
            </span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-7 text-lg leading-relaxed text-white/70 md:text-xl">{description}</p>
      ) : null}
    </div>
  );
}

export function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative h-20 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <img
        src={identityAssets.waves}
        alt=""
        className="absolute left-1/2 top-1/2 w-[1200px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-70"
      />
    </div>
  );
}
