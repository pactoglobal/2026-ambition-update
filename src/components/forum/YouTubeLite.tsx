import { Play } from "lucide-react";
import { useState } from "react";

/**
 * Player do YouTube que só carrega depois do clique, pelo domínio
 * youtube-nocookie (liberado no CSP do vercel.json): antes disso a página
 * mostra apenas a capa, sem cookies de terceiros nem o script do player.
 */
export function YouTubeLite({
  youtubeId,
  title,
  className = "",
}: {
  youtubeId: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const poster = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

  return (
    <div className={`forum-card relative aspect-video overflow-hidden rounded-2xl ${className}`}>
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
  );
}
