import { motion } from "framer-motion";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { identityAssets } from "./identity-assets";

const partners = [
  {
    label: "Realização",
    logo: identityAssets.pacto,
    alt: "Pacto Global Rede Brasil",
    className: "h-24",
  },
  { label: "Patrocinador Master", logo: identityAssets.aegea, alt: "Aegea", className: "h-16" },
  { label: "Apoio", logo: identityAssets.aya, alt: "Aya Earth Partners", className: "h-16" },
];

export function Sponsors() {
  return (
    <section id="sponsors" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="mb-16">
          <SectionHeader
            eyebrow="Alianças Estratégicas"
            title="Parceiros"
            outline="do Evento"
            align="center"
          />
        </div>

        <div className="forum-card mx-auto max-w-4xl overflow-hidden rounded-xl">
          <div className="flex flex-col divide-y divide-white/8 sm:flex-row sm:divide-x sm:divide-y-0">
            {partners.map(({ label, logo, alt, className }) => (
              <motion.div
                key={label}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.045)" }}
                className="group flex flex-1 flex-col items-center justify-center gap-6 px-10 py-16"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/46 transition-colors group-hover:text-forum-cyan">
                  {label}
                </p>
                <img
                  src={logo}
                  alt={alt}
                  width={1080}
                  height={864}
                  className={`${className} w-auto object-contain opacity-[0.78] transition-opacity duration-300 group-hover:opacity-100`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
