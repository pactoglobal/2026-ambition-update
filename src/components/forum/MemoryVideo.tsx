import { Play } from "lucide-react";
import { useState } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { LAST_EDITION, MEMORY_VIDEO } from "./edition";

/**
 * Vídeo memória da última edição. Some do site enquanto MEMORY_VIDEO (em
 * edition.ts) for null — sem placeholder "em breve" em produção.
 *
 * O player do YouTube só carrega depois do clique, e pelo domínio
 * youtube-nocookie: antes disso a página mostra apenas a capa, sem cookies de
 * terceiros nem os ~500 KB de script do player.
 */
export function MemoryVideo() {
  const [playing, setPlaying] = useState(false);

  if (!MEMORY_VIDEO) return null;

  const { youtubeId, title } = MEMORY_VIDEO;
  const poster = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <section id="video" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" glow="center" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <AnimatedSection className="mb-12">
          <SectionHeader
            eyebrow={`Vídeo memória · ${LAST_EDITION.label}`}
            title="Reviva o"
            outline="Fórum"
            align="center"
          />
        </AnimatedSection>

        <div className="forum-card relative mx-auto aspect-video max-w-5xl overflow-hidden rounded-2xl">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Assistir: ${title}`}
              className="group absolute inset-0 flex items-center justify-center"
            >
              <img
                src={poster}
                alt=""
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-forum-ink/40 transition-colors group-hover:bg-forum-ink/20" />
              <span className="forum-glass-photo relative flex h-20 w-20 items-center justify-center rounded-full text-white transition-transform group-hover:scale-110">
                <Play aria-hidden="true" className="ml-1 h-8 w-8" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
