import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { accentLines, identityAssets } from "./identity-assets";

const items = [
  { icon: Calendar, label: "Data", value: "02 de Junho de 2026" },
  { icon: Clock, label: "Horário", value: "09h às 18h" },
  {
    icon: MapPin,
    label: "Local",
    value: "MASP",
    sub: "Av. Paulista, 1578 - Bela Vista, São Paulo (SP)",
  },
];

export function EventInfo() {
  return (
    <section
      id="info-evento"
      className="relative overflow-hidden border-y border-white/8 bg-forum-deep py-12"
    >
      <img
        src={identityAssets.waves}
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 w-[1300px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
      />

      <div className="relative z-10 mx-auto grid max-w-screen-xl grid-cols-1 gap-4 px-6 md:grid-cols-3 lg:px-12">
        {items.map(({ icon: Icon, label, value, sub }, index) => (
          <motion.div
            key={label}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.35 }}
            className="forum-card group relative overflow-hidden rounded-xl p-6"
          >
            <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[index]}`} />
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-forum-cyan transition-colors group-hover:bg-forum-cyan group-hover:text-forum-deep">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 transition-colors group-hover:text-forum-cyan">
                  {label}
                </p>
                <p className="mt-1 text-xl font-display font-bold tracking-tight text-white">
                  {value}
                </p>
                {sub ? <p className="mt-1 text-xs leading-relaxed text-white/55">{sub}</p> : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
