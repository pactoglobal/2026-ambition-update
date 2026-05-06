import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";

// Auto-loads any photo dropped into assets/img/liderancas/confirmados-2026/
const confirmedPhotos = import.meta.glob(
  "../../../assets/img/liderancas/confirmados-2026/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Auto-loads any photo dropped into assets/img/liderancas/historicos/
const historicPhotos = import.meta.glob(
  "../../../assets/img/liderancas/historicos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

function photoByKey(modules: Record<string, string>, key: string): string | undefined {
  const entry = Object.entries(modules).find(([path]) =>
    path.toLowerCase().includes(key.toLowerCase())
  );
  return entry?.[1];
}

const speakers = [
  {
    name: "Guilherme Xavier",
    role: "Diretor Executivo, Pacto Global – Rede Brasil",
    tag: "Abertura",
    photoKey: "guilherme_xavier",
  },
  {
    name: "Adriana Albanese",
    role: "Diretora de Relações com Investidores e Sustentabilidade, Aegea",
    tag: "Business Case",
    photoKey: "adriana",
  },
  {
    name: "Vivian Broge",
    role: "Vice-Presidente de RH e Marketing, TOTVS",
    tag: "Painel",
    photoKey: "vivian",
  },
  {
    name: "Maria Luiza de Oliveira Pinto",
    role: "Vice-Presidente Executiva de Gente e Gestão, Sustentabilidade, Comunicação e Marca, Suzano",
    tag: "Painel",
    photoKey: "maria_luiza",
  },
  {
    name: "Avanish Sahai",
    role: "Keynote Speaker",
    tag: "Keynote",
    photoKey: "",
  },
  {
    name: "Camila Pitanga",
    role: "Atriz e Embaixadora da ONU Mulheres",
    tag: "Painel",
    photoKey: "camila",
  },
];

const historicalSpeakers = [
  { name: "Paul Polman",           role: "Unilever",                         photoKey: "paul" },
  { name: "Luiza Trajano",         role: "Magalu",                           photoKey: "luiza" },
  { name: "Bela Gil",              role: "Ativista e comunicadora",          photoKey: "bela" },
  { name: "Marta Suplicy",         role: "Gestão pública",                   photoKey: "marta" },
  { name: "Luis Guimarães",        role: "Cosan",                            photoKey: "luis_guimaraes" },
  { name: "Patricia Hill Collins", role: "Acadêmica e referência em equidade", photoKey: "patricia" },
  { name: "Albert Cheung",         role: "BloombergNEF",                     photoKey: "albert" },
];

function SpeakerCarousel({
  speakers: list,
  slideWidth = "w-[86%] sm:w-[50%] lg:w-[33.333%]",
  showPhoto = false,
  photoSource = confirmedPhotos,
  ariaLabel = "speakers",
}: {
  speakers: typeof speakers | typeof historicalSpeakers;
  slideWidth?: string;
  showPhoto?: boolean;
  photoSource?: Record<string, string>;
  ariaLabel?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-3 px-6 lg:px-12">
        <button
          type="button"
          aria-label={`${ariaLabel} anterior`}
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
        >
          <ChevronLeft aria-hidden="true" size={18} />
        </button>
        <button
          type="button"
          aria-label={`próximo ${ariaLabel}`}
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
        >
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-6 lg:px-12">
        <div className="flex gap-4">
          {list.map((speaker, index) => {
            const photo = photoByKey(photoSource, speaker.photoKey ?? "");
            const hasPhoto = !!photo;

            return (
              <div key={speaker.name} className={`flex-none ${slideWidth}`}>
                <article className="forum-card group relative overflow-hidden rounded-2xl">
                  {/* Photo or editorial card */}
                  {hasPhoto ? (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={photo}
                        alt={`Foto de ${speaker.name}`}
                        width={600}
                        height={800}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink via-forum-ink/30 to-transparent" />
                      <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`} />
                      {"tag" in speaker && (
                        <span className="absolute left-4 top-4 rounded-full border border-white/14 bg-forum-ink/70 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-forum-cyan backdrop-blur-sm">
                          {speaker.tag}
                        </span>
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <h3 className="text-xl font-display font-black uppercase leading-tight tracking-tight text-white">
                          {speaker.name}
                        </h3>
                        <p className="mt-1.5 text-[11px] font-bold uppercase leading-snug tracking-wider text-white/60">
                          {speaker.role}
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Editorial placeholder when photo not yet available */
                    <div className="relative min-h-[360px] p-7">
                      <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/90 via-forum-ink/60 to-forum-ink/20" />
                      <div className="relative z-10 flex min-h-[300px] flex-col justify-between">
                        <div>
                          {"tag" in speaker && (
                            <span className="inline-flex rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-forum-cyan">
                              {speaker.tag}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="mb-4 text-[9px] font-black uppercase tracking-[0.32em] text-white/35">
                            Fórum Ambição 2030
                          </p>
                          <h3 className="text-2xl font-display font-black uppercase leading-tight tracking-tight text-white">
                            {speaker.name}
                          </h3>
                          <p className="mt-3 text-[11px] font-bold uppercase leading-relaxed tracking-wider text-white/55">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Speakers() {
  return (
    <section id="speakers" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="deepField" />

      <div className="relative z-10">
        <div className="mx-auto mb-12 max-w-screen-xl px-6 lg:px-12">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Keynotes & Painelistas"
              title="Lideranças"
              outline="Confirmadas"
              description="As principais vozes do 4° Fórum Ambição 2030 — líderes que transformam compromissos em ação."
            />
          </AnimatedSection>
        </div>

        <SpeakerCarousel
          speakers={speakers}
          slideWidth="w-[86%] sm:w-[50%] lg:w-[33.333%]"
          photoSource={confirmedPhotos}
          ariaLabel="speaker"
        />

        <div className="mx-auto mt-24 max-w-screen-xl px-6 lg:px-12">
          <div className="mb-10 border-t border-white/12 pt-16">
            <AnimatedSection>
              <SectionHeader
                eyebrow="Legado de Autoridade"
                title="Speakers que já estiveram no"
                outline="Palco do Fórum"
                description="Lideranças que ajudaram a construir a história e o legado do Fórum Ambição 2030."
              />
            </AnimatedSection>
          </div>
        </div>

        <SpeakerCarousel
          speakers={historicalSpeakers}
          slideWidth="w-[82%] sm:w-[46%] lg:w-[28%]"
          photoSource={historicPhotos}
          ariaLabel="histórico"
        />
      </div>
    </section>
  );
}
