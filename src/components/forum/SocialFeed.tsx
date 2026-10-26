import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Instagram, Linkedin } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { KineticBackdrop } from "./Identity";
import {
  INITIAL_SOCIAL_POSTS,
  SOCIAL_CHANNELS,
  type SocialPlatform,
  type SocialPost,
} from "./social-posts-data";

interface SocialFeedProps {
  posts?: SocialPost[];
}

export function SocialFeed({ posts = INITIAL_SOCIAL_POSTS }: SocialFeedProps) {
  const [activePlatform, setActivePlatform] = useState<SocialPlatform>("instagram");

  const filteredPosts = useMemo(
    () => posts.filter((p) => p.platform === activePlatform),
    [posts, activePlatform]
  );

  const channel = SOCIAL_CHANNELS[activePlatform];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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

  // Reinicializa carrossel ao trocar de aba (LinkedIn <-> Instagram)
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(0, true);
    emblaApi.reInit();
    setSelectedIndex(0);
    setCanScrollPrev(false);
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi, activePlatform]);

  return (
    <section id="redes" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="waves" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:items-start xl:grid-cols-[420px_1fr] xl:gap-16">
          {/* COLUNA ESQUERDA: Cabeçalho, Toggle de Redes, Descrição e CTA */}
          <div className="flex flex-col">
            <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.38em] text-forum-cyan">
              Conteúdo & Atualizações
            </span>

            <h2 className="text-4xl font-display font-black uppercase leading-[0.92] tracking-tight text-white sm:text-5xl md:text-6xl">
              Nas nossas{" "}
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(174, 207, 230, 0.52)" }}
              >
                Redes
              </span>
            </h2>

            {/* SELETOR DE REDES SOCIAIS (SLIDE/TABS) */}
            <div className="mt-8 inline-flex self-start rounded-full border border-white/14 bg-white/5 p-1.5 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setActivePlatform("linkedin")}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
                  activePlatform === "linkedin"
                    ? "text-forum-deep"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activePlatform === "linkedin" && (
                  <motion.div
                    layoutId="socialTabPill"
                    className="absolute inset-0 rounded-full bg-forum-cyan shadow-[0_0_24px_rgba(35,185,214,0.35)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Linkedin className="relative z-10 h-4 w-4" />
                <span className="relative z-10">LinkedIn</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePlatform("instagram")}
                className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-colors duration-200 ${
                  activePlatform === "instagram"
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {activePlatform === "instagram" && (
                  <motion.div
                    layoutId="socialTabPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-forum-pink via-forum-magenta to-forum-gold shadow-[0_0_24px_rgba(226,26,114,0.35)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Instagram className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Instagram</span>
              </button>
            </div>

            {/* DESCRIÇÃO DINÂMICA CONFORME A REDE */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlatform}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-6 space-y-2"
              >
                <p className="text-base leading-relaxed text-white/76 sm:text-lg">
                  {channel.description}
                </p>
                <p className="text-xs font-mono uppercase tracking-widest text-forum-cyan/80">
                  {channel.handle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* BOTÃO CTA DA REDE ATIVA */}
            <div className="mt-8">
              <a
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-forum-cyan px-7 py-3.5 text-[11px] font-black uppercase tracking-widest text-forum-deep shadow-[0_12px_32px_rgba(35,185,214,0.24)] transition-all duration-300 hover:bg-white hover:shadow-[0_16px_40px_rgba(255,255,255,0.2)]"
              >
                <span>{channel.cta}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* COLUNA DIREITA: CARROSSEL DE POSTS EMBEDDED */}
          <div className="relative min-w-0">
            {/* Controles de Navegação do Carrossel */}
            <div className="mb-4 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-forum-cyan" />
                <span className="font-sans text-xs font-bold tabular-nums tracking-wider text-white/45">
                  {filteredPosts.length > 0 ? (
                    <>
                      {String(selectedIndex + 1).padStart(2, "0")}
                      <span className="mx-1.5 opacity-35">/</span>
                      {String(filteredPosts.length).padStart(2, "0")}
                    </>
                  ) : (
                    "00 / 00"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Publicação anterior"
                  disabled={!canScrollPrev}
                  onClick={() => emblaApi?.scrollPrev()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-all hover:bg-forum-cyan hover:text-forum-deep disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <ChevronLeft aria-hidden="true" size={18} />
                </button>
                <button
                  type="button"
                  aria-label="Próxima publicação"
                  disabled={!canScrollNext}
                  onClick={() => emblaApi?.scrollNext()}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-all hover:bg-forum-cyan hover:text-forum-deep disabled:cursor-not-allowed disabled:opacity-25"
                >
                  <ChevronRight aria-hidden="true" size={18} />
                </button>
              </div>
            </div>

            {/* Viewport do Carrossel */}
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-5 py-2">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <SocialCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="forum-card flex h-[520px] w-full flex-col items-center justify-center rounded-2xl p-8 text-center">
                    <p className="text-sm font-bold uppercase tracking-wider text-white/60">
                      Nenhuma publicação cadastrada para {channel.name}.
                    </p>
                    <p className="mt-2 text-xs text-white/40">
                      Envie os links para adicionarmos automaticamente ao carrossel.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialCard({ post }: { post: SocialPost }) {
  const isLinkedIn = post.platform === "linkedin";
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  // Prioridade: imageUrl manual > Instagram auto-thumbnail > fallback estilizado
  const getThumbnailUrl = (post: SocialPost): string => {
    if (post.imageUrl) return post.imageUrl;
    if (post.platform === "instagram") {
      const code = post.id.replace("ig-", "");
      return `https://www.instagram.com/p/${code}/media/?size=t`;
    }
    return "";
  };

  const thumbnailUrl = getThumbnailUrl(post);
  const hasCustomImage = !!post.imageUrl;
  const isInstagramAuto = post.platform === "instagram" && !post.imageUrl;

  return (
    <article
      className="forum-card group relative flex h-[580px] w-[86vw] max-w-[360px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/12 bg-forum-ink/80 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-forum-cyan/40 sm:w-[360px]"
    >
      {/* Top bar */}
      <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-white/8 bg-forum-deep/90 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {isLinkedIn ? (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0a66c2] text-white">
              <Linkedin className="h-3.5 w-3.5" />
            </div>
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white">
              <Instagram className="h-3.5 w-3.5" />
            </div>
          )}
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
            {isLinkedIn ? "LinkedIn" : "Instagram"}
          </span>
        </div>

        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          title="Abrir publicação original"
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-forum-cyan transition-colors hover:text-white"
        >
          <span>Ver post</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Imagem do Post - clicável redireciona para o original */}
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex-1 overflow-hidden bg-forum-ink focus:outline-none focus:ring-2 focus:ring-forum-cyan focus:ring-offset-2 focus:ring-offset-forum-ink"
        aria-label={post.title || `Abrir post no ${isLinkedIn ? "LinkedIn" : "Instagram"}`}
      >
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-forum-deep/80 p-6 text-center backdrop-blur-sm">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-forum-cyan border-t-transparent" />
            <p className="text-[11px] font-bold uppercase tracking-wider text-white/50">
              Carregando imagem...
            </p>
          </div>
        )}

        {/* Imagem real (custom ou Instagram auto) */}
        {thumbnailUrl && !imgError && (
          <img
            src={thumbnailUrl}
            alt={post.title || `Post ${post.platform} - ${post.id}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-opacity duration-300 group-hover:scale-[1.02] group-hover:opacity-90"
            crossOrigin={isInstagramAuto ? "anonymous" : undefined}
          />
        )}

        {/* Fallback estilizado: LinkedIn ou Instagram se falhou */}
        {(post.platform === "linkedin" && !hasCustomImage) || (isInstagramAuto && imgError) ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-forum-deep/90 to-forum-ink/95">
            {isLinkedIn ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a66c2]/20 backdrop-blur-sm">
                <Linkedin className="h-8 w-8 text-[#0a66c2]" />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#f09433]/20 via-[#dc2743]/20 to-[#bc1888]/20 backdrop-blur-sm">
                <Instagram className="h-8 w-8 text-forum-pink" />
              </div>
            )}
            <div className="text-center px-6">
              <p className="text-xs font-bold uppercase tracking-widest text-forum-cyan/80 mb-2">
                {isLinkedIn ? "LinkedIn" : "Instagram"}
              </p>
              {post.title && (
                <p className="text-base font-semibold leading-snug text-white line-clamp-3">
                  {post.title}
                </p>
              )}
              <p className="mt-3 text-xs text-white/40">
                Clique para abrir a publicação original
              </p>
            </div>
          </div>
        ) : null}

        {/* Overlay hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>

      {/* Legenda opcional */}
      {post.title && (
        <div className="shrink-0 border-t border-white/8 bg-forum-deep/80 px-4 py-2.5">
          <p className="line-clamp-1 text-[11px] text-white/70">{post.title}</p>
        </div>
      )}
    </article>
  );
}
