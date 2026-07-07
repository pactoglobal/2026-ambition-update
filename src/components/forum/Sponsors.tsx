import { motion } from "framer-motion";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { partnerGroups } from "./identity-assets";

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

        <div className="forum-card mx-auto max-w-5xl overflow-hidden rounded-xl">
          <div className={`grid divide-y divide-white/8 grid-cols-1 sm:divide-y-0 sm:divide-x ${
            partnerGroups.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
          }`}>
            {partnerGroups.map(({ key, label, src, alt, width, height, sponsorsClassName }) => (
              <motion.div
                key={key}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.045)" }}
                className="group flex min-h-[220px] flex-col items-center justify-center gap-6 px-8 py-14"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/46 transition-colors group-hover:text-forum-cyan">
                  {label}
                </p>
                <img
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  className={`${sponsorsClassName} w-auto max-w-[260px] object-contain opacity-[0.78] transition-opacity duration-300 group-hover:opacity-100`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
