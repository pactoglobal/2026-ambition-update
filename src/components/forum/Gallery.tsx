import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./Identity";

// Drop any photo into assets/img/galeria-de-momentos/ and it appears automatically.
const assetModules = import.meta.glob(
  "../../../assets/img/galeria-de-momentos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

function toTitle(filename: string) {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[_\s]+\d{4}(\s+\d+)?$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

const galleryImages = Object.entries(assetModules)
  .map(([path, url]) => {
    const filename = path.split("/").pop() ?? "";
    return { src: url, title: toTitle(filename), filename };
  })
  .sort((a, b) => a.filename.localeCompare(b.filename));

type GalleryImage = (typeof galleryImages)[number];

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    dragFree: false,
    watchDrag: true,
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

  if (galleryImages.length === 0) return null;

  return (
    <section id="galeria" className="forum-surface overflow-hidden py-24">
      <div className="mx-auto mb-10 max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Edições Anteriores"
            title="Galeria de"
            outline="Momentos"
            description="Reviva os momentos de encontro, debate e transformação das edições anteriores do Fórum Ambição 2030."
          />

          <div className="flex items-center gap-6">
            <span className="font-sans text-sm font-bold tabular-nums text-white/52">
              {String(selectedIndex + 1).padStart(2, "0")}
              <span className="mx-1 opacity-40">/</span>
              {String(galleryImages.length).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Imagem anterior"
                onClick={() => emblaApi?.scrollPrev()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
              >
                <ChevronLeft aria-hidden="true" size={20} />
              </button>
              <button
                type="button"
                aria-label="Próxima imagem"
                onClick={() => emblaApi?.scrollNext()}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
              >
                <ChevronRight aria-hidden="true" size={20} />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Progress dots */}
        <div className="flex gap-1.5">
          {galleryImages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Ir para imagem ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-0.5 rounded-full transition-all duration-300 ${
                i === selectedIndex ? "w-8 bg-forum-cyan" : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Carousel — plain div, no Framer Motion wrapper that breaks Embla sizing */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4 px-5 sm:gap-5 sm:px-8 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]">
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className="group relative flex-[0_0_84vw] cursor-grab overflow-hidden rounded-xl sm:flex-[0_0_58vw] lg:flex-[0_0_42rem] active:cursor-grabbing"
            >
              <img
                src={image.src}
                alt={image.title}
                width={1200}
                height={760}
                loading={index < 3 ? "eager" : "lazy"}
                draggable={false}
                className="aspect-[16/10] w-full select-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-forum-ink/80 via-forum-ink/30 to-transparent px-6 pb-6 pt-16">
                <h3 className="text-xl font-display font-black uppercase tracking-tight text-white">
                  {image.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label={`Ver ${image.title} em tela cheia`}
                onClick={() => setLightboxImage(image)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-forum-ink/60 text-white opacity-0 backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 hover:bg-forum-cyan hover:text-forum-deep"
              >
                <Maximize2 aria-hidden="true" size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxImage !== null} onOpenChange={(open) => !open && setLightboxImage(null)}>
        <DialogContent className="max-w-5xl border-white/10 bg-forum-ink/95 p-0 backdrop-blur-2xl">
          <DialogTitle className="sr-only">
            {lightboxImage?.title ?? "Visualização de imagem"}
          </DialogTitle>
          {lightboxImage && (
            <>
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                width={1200}
                height={760}
                className="h-auto max-h-[80vh] w-full rounded-lg object-contain"
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-forum-ink/90 to-transparent p-6">
                <p className="text-xl font-display font-black uppercase tracking-tight text-white">
                  {lightboxImage.title}
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
    </section>
  );
}
