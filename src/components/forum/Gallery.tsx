import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AnimatedSection } from "./AnimatedSection";
import { SectionHeader } from "./Identity";

const galleryImages = [
  { src: "/img/galeria-de-momentos/event-gallery-9.jpg",  title: "Plenária",               category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-14.jpg", title: "Bruno & Giovana",         category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-15.jpg", title: "Bruno Gagliasso",         category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-16.jpg", title: "Giovanna Ewbank",         category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-10.jpg", title: "Salas Dinâmicas",         category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-11.jpg", title: "Troca de Práticas",       category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-12.jpg", title: "Grupos de Trabalho",      category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-13.jpg", title: "Colaboração em Ação",     category: "Edição 2025" },
  { src: "/img/galeria-de-momentos/event-gallery-1.jpg",  title: "Fórum Ambição 2030",      category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-2.jpg",  title: "Auditório em Diálogo",    category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-3.jpg",  title: "Keynotes",                category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-4.jpg",  title: "Networking",              category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-5.jpg",  title: "Lideranças Presentes",    category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-6.jpg",  title: "Momentos do Evento",      category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-7.jpg",  title: "Impacto e Conexões",      category: "Edições Anteriores" },
  { src: "/img/galeria-de-momentos/event-gallery-8.jpg",  title: "A Força do Coletivo",     category: "Edições Anteriores" },
];

export function Gallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    skipSnaps: false,
  });
  const [progress, setProgress] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<(typeof galleryImages)[number] | null>(null);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("scroll", onScroll);
    emblaApi.on("select", onScroll);
    emblaApi.on("reInit", onScroll);
    onScroll();
    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("select", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

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
              {String(selectedIndex + 1).padStart(2, "0")} <span className="opacity-40">/</span>{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              {[
                { fn: () => emblaApi?.scrollPrev(), Icon: ChevronLeft, label: "Imagem anterior" },
                { fn: () => emblaApi?.scrollNext(), Icon: ChevronRight, label: "Próxima imagem" },
              ].map(({ fn, Icon, label }) => (
                <motion.button
                  key={label}
                  type="button"
                  aria-label={label}
                  onClick={fn}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/6 text-white transition-colors hover:bg-forum-cyan hover:text-forum-deep"
                >
                  <Icon aria-hidden="true" size={20} />
                </motion.button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="h-px w-full overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-forum-cyan"
            animate={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-4 px-5 sm:gap-6 sm:px-8 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]">
          {galleryImages.map((image, index) => (
            <motion.article
              key={image.title}
              className="forum-card group relative w-[84vw] flex-[0_0_auto] cursor-grab overflow-hidden rounded-xl active:cursor-grabbing sm:w-[58vw] lg:w-[42rem]"
              initial={false}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.45 }}
            >
              <img
                src={image.src}
                alt={image.title}
                width={1200}
                height={760}
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forum-ink via-forum-ink/58 to-transparent p-8">
                <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-forum-cyan">
                  {image.category}
                </span>
                <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white">
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
            </motion.article>
          ))}
          <div className="w-1 flex-none" aria-hidden="true" />
        </div>
      </div>

      <Dialog
        open={lightboxImage !== null}
        onOpenChange={(open) => !open && setLightboxImage(null)}
      >
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
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between rounded-b-lg bg-gradient-to-t from-forum-ink/90 to-transparent p-6">
                <div>
                  <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.3em] text-forum-cyan">
                    {lightboxImage.category}
                  </span>
                  <p className="text-xl font-display font-black uppercase tracking-tight text-white">
                    {lightboxImage.title}
                  </p>
                </div>
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
