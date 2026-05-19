import { motion } from "framer-motion";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { identityAssets } from "./identity-assets";

const MASP_PHOTOS = [
  { src: "/img/local-masp/masp-exterior.webp", alt: "MASP - fachada na Avenida Paulista ao entardecer" },
  { src: "/img/local-masp/masp-cafe.png", alt: "MASP Café - área de networking preparada para evento" },
  { src: "/img/local-masp/masp-auditorio-palco.png", alt: "MASP - auditório visto do palco" },
  { src: "/img/local-masp/masp-auditorio-plateia.png", alt: "MASP - auditório visto da plateia" },
];

export function Venue() {
  return (
    <section id="local" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="mb-14">
          <SectionHeader
            eyebrow="Localização"
            title="O Palco"
            outline="da Ação"
            align="center"
            description="O MASP - Museu de Arte de São Paulo Assis Chateaubriand será o palco icônico do 4º Fórum Ambição 2030."
          />
        </div>

        <div className="forum-card overflow-hidden rounded-xl lg:grid lg:grid-cols-2">
          <div className="h-[320px] overflow-hidden lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975!2d-46.6559!3d-23.5614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da56c54f%3A0x70678564a2754c0d!2sMASP%20-%20Museu%20de%20Arte%20de%20S%C3%A3o%20Paulo%20Assis%20Chateaubriand!5e0!3m2!1spt-BR!2sbr!4v1714420000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin"
              title="Localização do evento"
              className="opacity-[0.62] grayscale invert brightness-75 contrast-125 transition-[filter,opacity] duration-500 hover:opacity-100 hover:grayscale-0 hover:brightness-100"
              title="Localização MASP"
            />
          </div>

          <div className="relative flex flex-col justify-center overflow-hidden border-t border-white/8 p-8 sm:p-12 lg:border-l lg:border-t-0">
            <img
              src={identityAssets.waves}
              alt=""
              className="pointer-events-none absolute -right-44 top-8 w-[820px] max-w-[200%] opacity-[0.18]"
            />
            <div className="relative z-10 mb-8 flex items-start justify-between gap-4">
              <h3 className="text-5xl font-display font-black uppercase tracking-tight text-white">
                MASP
              </h3>
              <img
                src={identityAssets.pacto}
                alt="Pacto Global Rede Brasil"
                width={800}
                height={864}
                className="h-12 w-auto object-contain opacity-[0.48]"
              />
            </div>
            <p className="relative z-10 mb-10 text-lg leading-relaxed text-white/72">
              Localizado na Avenida Paulista, o MASP é um dos museus mais importantes do hemisfério
              sul e um marco da arquitetura brutalista brasileira. Sua estrutura icônica conversa
              com a força visual e institucional desta edição.
            </p>

            <div className="relative z-10 flex flex-col gap-4">
              <div className="rounded-xl border border-white/10 bg-white/6 p-5">
                <p className="text-[9px] font-black uppercase tracking-widest text-forum-cyan">
                  Endereço
                </p>
                <p className="mt-2 text-sm font-bold text-white/90">
                  Avenida Paulista, 1578 - Bela Vista, São Paulo - SP
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {MASP_PHOTOS.map(({ src, alt }) => (
            <motion.div
              key={src}
              whileHover={{ y: -4 }}
              className="group h-36 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:h-44"
            >
              <img
                src={src}
                alt={alt}
                width={360}
                height={240}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
