import { ReactNode } from "react";
import { identityAssets, type BackdropAssetKey } from "./identity-assets";

export function KineticBackdrop({
  image = "waves",
  intensity = "soft",
}: {
  image?: BackdropAssetKey;
  intensity?: "soft" | "strong";
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
