import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { LAST_EDITION, MEMORY_VIDEO } from "./edition";
import { YouTubeLite } from "./YouTubeLite";

/**
 * Vídeo memória da última edição. Some do site enquanto MEMORY_VIDEO (em
 * edition.ts) for null — sem placeholder "em breve" em produção.
 *
 * O player do YouTube só carrega depois do clique, e pelo domínio
 * youtube-nocookie: antes disso a página mostra apenas a capa, sem cookies de
 * terceiros nem os ~500 KB de script do player.
 */
export function MemoryVideo() {
  if (!MEMORY_VIDEO) return null;

  const { youtubeId, title } = MEMORY_VIDEO;

  return (
    <section id="video" className="forum-surface relative overflow-hidden py-20 lg:py-24">
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

        <YouTubeLite youtubeId={youtubeId} title={title} className="mx-auto max-w-5xl" />
      </div>
    </section>
  );
}
