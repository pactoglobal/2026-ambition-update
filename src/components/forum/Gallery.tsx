import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./Identity";
import { accentLines } from "./identity-assets";

// Historical speakers from previous editions
const historicPhotos = import.meta.glob(
  "../../../assets/img/liderancas/historicos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

function photoByKey(modules: Record<string, string>, key: string): string | undefined {
  const entry = Object.entries(modules).find(([path]) =>
    path.toLowerCase().includes(key.toLowerCase())
  );
  return entry?.[1];
}

const historicalSpeakers = [
  { name: "Paul Polman",           role: "Unilever",                           photoKey: "paul" },
  { name: "Luiza Trajano",         role: "Magalu",                             photoKey: "luiza" },
  { name: "Bela Gil",              role: "Ativista e comunicadora",            photoKey: "bela" },
  { name: "Marta Suplicy",         role: "Gestão pública",                     photoKey: "marta" },
  { name: "Luis Guimarães",        role: "Cosan",                              photoKey: "luis_guimaraes" },
  { name: "Patricia Hill Collins", role: "Acadêmica e referência em equidade", photoKey: "patricia" },
  { name: "Albert Cheung",         role: "BloombergNEF",                       photoKey: "albert" },
];

function HistoricalSpeakersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-3 px-4 sm:px-6 lg:px-12">
        <button
          type="button"
          aria-label="Speaker anterior"
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
        >
          <ChevronLeft aria-hidden="true" size={18} />
        </button>
        <button
          type="button"
          aria-label="Próximo speaker"
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
        >
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-4 sm:px-6 lg:px-12">
        <div className="flex gap-4">
          {historicalSpeakers.map((speaker, index) => {
            const photo = photoByKey(historicPhotos, speaker.photoKey);
            return (
              <div key={speaker.name} className="flex-none w-[82%] sm:w-[46%] lg:w-[28%]">
                <article className="forum-card group relative overflow-hidden rounded-2xl">
                  {photo ? (
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={photo}
                        alt={`Foto de ${speaker.name}`}
                        width={600}
                        height={800}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink via-forum-ink/30 to-transparent" />
                      <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`} />
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
                    <div className="relative min-h-[320px] p-7">
                      <div className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/90 via-forum-ink/60 to-forum-ink/20" />
                      <div className="relative z-10 flex min-h-[260px] flex-col justify-end">
                        <p className="mb-4 text-[9px] font-black uppercase tracking-[0.32em] text-white/35">
                          Fórum Ambição 2030
                        </p>
                        <h3 className="text-xl font-display font-black uppercase leading-tight tracking-tight text-white">
                          {speaker.name}
                        </h3>
                        <p className="mt-2 text-[11px] font-bold uppercase leading-relaxed tracking-wider text-white/55">
                          {speaker.role}
                        </p>
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

// Drop photos into assets/img/galeria-de-momentos/<ano>/ (e.g. 2025/, 2024/, 2023/)
// Each subfolder becomes a tab automatically — no code changes needed.
const assetModules = import.meta.glob(
  "../../../assets/img/galeria-de-momentos/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

interface GalleryImage {
  src: string;
  year: string;
  index: number;
}

// Group by subfolder name (the year)
const byYear: Record<string, GalleryImage[]> = {};
Object.entries(assetModules).forEach(([path, url]) => {
  const parts = path.split("/");
  const year = parts[parts.length - 2] ?? "Outros";
  if (!byYear[year]) byYear[year] = [];
  byYear[year].push({ src: url, year, index: byYear[year].length });
});

// Sort years descending (most recent first)
const years = Object.keys(byYear).sort((a, b) => b.localeCompare(a));

function CarouselTrack({ images }: { images: GalleryImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Reset when image list changes
  useEffect(() => {
    emblaApi?.reInit();
    setSelectedIndex(0);
  }, [emblaApi, images]);

  return (
    <>
      {/* Counter + arrows */}
      <div className="mb-6 flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <span className="font-sans text-sm font-bold tabular-nums text-white/40">
          {String(selectedIndex + 1).padStart(2, "0")}
          <span className="mx-1.5 opacity-40">/</span>
          {String(images.length).padStart(2, "0")}
        </span>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={() => emblaApi?.scrollPrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
          >
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            onClick={() => emblaApi?.scrollNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
          >
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 px-5 sm:gap-5 sm:px-8 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]">
          {images.map((image, i) => (
            <div
              key={image.src}
              className="group relative flex-[0_0_84vw] overflow-hidden rounded-xl sm:flex-[0_0_58vw] lg:flex-[0_0_42rem]"
            >
              <img
                src={image.src}
                alt={`Fórum Ambição 2030 · Edição ${image.year} · Foto ${i + 1}`}
                width={1200}
                height={760}
                loading={i < 3 ? "eager" : "lazy"}
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forum-ink/80 via-forum-ink/20 to-transparent px-6 pb-5 pt-16">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-forum-cyan/80">
                  Edição {image.year}
                </p>
              </div>
              <button
                type="button"
                aria-label="Ver em tela cheia"
                onClick={() => setLightboxImage(image)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-forum-ink/60 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:bg-forum-cyan hover:text-forum-deep"
              >
                <Maximize2 aria-hidden="true" size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex justify-center gap-1.5 px-5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir para foto ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-0.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "w-6 bg-forum-cyan" : "w-1.5 bg-white/20"
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxImage !== null} onOpenChange={(open) => !open && setLightboxImage(null)}>
        <DialogContent className="max-w-5xl border-white/10 bg-forum-ink/95 p-0 backdrop-blur-2xl">
          <DialogTitle className="sr-only">
            Fórum Ambição 2030 · Edição {lightboxImage?.year}
          </DialogTitle>
          {lightboxImage && (
            <>
              <img
                src={lightboxImage.src}
                alt={`Fórum Ambição 2030 · Edição ${lightboxImage.year}`}
                width={1200}
                height={760}
                className="h-auto max-h-[80vh] w-full rounded-lg object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-forum-ink/90 to-transparent p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-forum-cyan">
                  Fórum Ambição 2030 · Edição {lightboxImage.year}
                </p>
              </div>
              <DialogClose className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-forum-ink/60 text-white opacity-70 backdrop-blur-md transition-opacity hover:opacity-100 hover:bg-forum-cyan hover:text-forum-deep focus:ring-forum-cyan">
                <X aria-hidden="true" size={18} />
                <span className="sr-only">Fechar</span>
              </DialogClose>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function Gallery() {
  const [activeYear, setActiveYear] = useState(years[0] ?? "");

  if (years.length === 0) return null;

  const images = byYear[activeYear] ?? [];

  return (
    <section id="galeria" className="forum-surface overflow-hidden py-24">
      <div className="mx-auto mb-10 max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Edições Anteriores"
            title="Galeria de"
            outline="Momentos"
            description="Reviva os momentos de encontro, debate e transformação das edições do Fórum Ambição 2030."
          />
        </AnimatedSection>

        {/* Year tabs */}
        {years.length > 1 && (
          <div className="flex gap-2">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => setActiveYear(year)}
                className={`rounded-full border px-5 py-2 text-[11px] font-black uppercase tracking-[0.24em] transition-all ${
                  activeYear === year
                    ? "border-forum-cyan bg-forum-cyan/15 text-forum-cyan"
                    : "border-white/12 bg-white/4 text-white/45 hover:border-white/24 hover:text-white/70"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>

      <CarouselTrack key={activeYear} images={images} />

      {/* Historical speakers */}
      <div className="mx-auto mt-20 max-w-screen-xl border-t border-white/10 px-4 pt-16 sm:px-6 lg:px-12">
        <AnimatedSection className="mb-10">
          <SectionHeader
            eyebrow="Edições Anteriores"
            title="Impacto"
            outline="Histórico"
            description="Lideranças que ajudaram a construir a história e o legado do Fórum Ambição 2030."
          />
        </AnimatedSection>
      </div>

      <HistoricalSpeakersCarousel />
    </section>
  );
}
