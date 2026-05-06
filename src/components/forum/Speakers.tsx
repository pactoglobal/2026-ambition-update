import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines, identityAssets } from "./identity-assets";

// Fotos dos confirmados: /img/liderancas/confirmados-2026/
// Fotos dos históricos:  /img/liderancas/historicos/
const speakers = [
  {
    name: "Guilherme Xavier",
    role: "Diretor Executivo, Pacto Global da ONU - Rede Brasil",
    tag: "Abertura",
    // photo: "/img/liderancas/confirmados-2026/guilherme-xavier.jpg",
  },
  {
    name: "Adriana Albanese",
    role: "Diretora de Sustentabilidade, Aegea",
    tag: "Business Case",
    // photo: "/img/liderancas/confirmados-2026/adriana-albanese.jpg",
  },
  {
    name: "Oliver Stuenkel",
    role: "Analista político e autor",
    tag: "Keynote",
  },
  {
    name: "Marian Schuegraf",
    role: "Embaixadora da União Europeia no Brasil",
    tag: "Painel",
  },
  {
    name: "Carlos Carboni",
    role: "Itaipu Binacional",
    tag: "Transição Energética",
  },
  {
    name: "Giovana Girardi",
    role: "Jornalista científica - mediadora",
    tag: "Mediação",
  },
];

const historicalSpeakers = [
  { name: "Paul Polman", role: "Unilever", photo: "/img/liderancas/historicos/paul_polman.jpeg" },
  { name: "Luiza Trajano", role: "Magalu", photo: "/img/liderancas/historicos/luiza_trajano.jpg" },
  { name: "Bela Gil", role: "Ativista e comunicadora", photo: "/img/liderancas/historicos/bela_gil.jpeg" },
  { name: "Marta Suplicy", role: "Gestão pública", photo: "/img/liderancas/historicos/marta_suplicy.jpeg" },
  { name: "Luis Guimarães", role: "Cosan", photo: "/img/liderancas/historicos/luis_guimaraes.jpeg" },
  {
    name: "Patricia Hill Collins",
    role: "Acadêmica e referência em equidade",
    photo: "/img/liderancas/historicos/Patricia_Hill_Collins.png",
  },
  { name: "Albert Cheung", role: "BloombergNEF", photo: "/img/liderancas/historicos/albert_cheung.png" },
];

export function Speakers() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", slidesToScroll: 1 });
  const [historyRef, historyApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <section id="speakers" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-12">
        <AnimatedSection className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Keynotes & Painelistas"
            title="Lideranças"
            outline="Confirmadas"
            description="A seção usa cards editoriais até a entrada das fotos oficiais, mantendo a página fiel à identidade 2026 sem retratos genéricos."
          />

          <div className="flex gap-4">
            <motion.button
              type="button"
              aria-label="Speaker anterior"
              onClick={() => emblaApi?.scrollPrev()}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </motion.button>
            <motion.button
              type="button"
              aria-label="Próximo speaker"
              onClick={() => emblaApi?.scrollNext()}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
            >
              <ChevronRight aria-hidden="true" size={24} />
            </motion.button>
          </div>
        </AnimatedSection>

        <div ref={emblaRef} className="-mx-4 overflow-hidden">
          <div className="flex touch-pan-y">
            {speakers.map((speaker, index) => (
              <motion.div
                key={speaker.name}
                className="flex-none px-4 w-[86%] sm:w-[50%] lg:w-[33.333%]"
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                <article className="forum-card group relative min-h-[420px] overflow-hidden rounded-2xl p-8">
                  <img
                    src={identityAssets.kv}
                    alt=""
                    width={5333}
                    height={3000}
                    className="absolute inset-0 h-full w-full object-cover object-[44%_44%] opacity-[0.26] transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forum-ink via-forum-ink/72 to-forum-ink/24" />
                  <div
                    className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`}
                  />

                  <div className="relative z-10 flex min-h-[356px] flex-col justify-between">
                    <div>
                      <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-forum-cyan">
                        {speaker.tag}
                      </span>
                    </div>

                    <div>
                      <p className="mb-5 text-[10px] font-black uppercase tracking-[0.32em] text-white/45">
                        Fórum Ambição 2030
                      </p>
                      <h3 className="text-3xl font-display font-black uppercase leading-none tracking-tight text-white">
                        {speaker.name}
                      </h3>
                      <p className="mt-4 text-sm font-bold uppercase leading-relaxed tracking-wider text-white/58">
                        {speaker.role}
                      </p>
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-24 border-t border-white/12 pt-16">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Legado de Autoridade"
              title="SPEAKERS QUE JÁ ESTIVERAM NO"
              outline="PALCO DO FÓRUM AMBIÇÃO 2030"
              description="Lideranças que já estiveram no palco e ajudaram a construir a história do Fórum Ambição 2030."
            />
            <div className="flex gap-4">
              <button
                type="button"
                aria-label="Histórico anterior"
                onClick={() => historyApi?.scrollPrev()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
              >
                <ChevronLeft aria-hidden="true" size={20} />
              </button>
              <button
                type="button"
                aria-label="Próximo histórico"
                onClick={() => historyApi?.scrollNext()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
              >
                <ChevronRight aria-hidden="true" size={20} />
              </button>
            </div>
          </div>

          <div ref={historyRef} className="-mx-4 overflow-hidden">
            <div className="flex touch-pan-y">
              {historicalSpeakers.map((speaker, index) => (
                <motion.div
                  key={speaker.name}
                  className="w-[82%] flex-none px-4 sm:w-[46%] lg:w-[30%]"
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <article className="forum-card group overflow-hidden rounded-2xl">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={speaker.photo}
                        alt={`Foto de ${speaker.name}`}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink via-forum-ink/24 to-transparent" />
                    </div>
                    <div className="p-5">
                      <h4 className="text-2xl font-display font-black uppercase tracking-tight text-white">
                        {speaker.name}
                      </h4>
                      <p className="mt-2 text-[10px] font-black uppercase tracking-[0.24em] text-forum-cyan/84">
                        {speaker.role}
                      </p>
                    </div>
                  </article>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
