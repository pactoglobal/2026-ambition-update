export type SocialPlatform = "linkedin" | "instagram";

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  url: string;
  embedUrl: string;
  title?: string;
  date?: string;
}

/**
 * Identifica a rede social (LinkedIn ou Instagram) a partir de uma URL bruta
 * e extrai o formato canônico de embed iframe.
 */
export function parseSocialUrl(
  rawUrl: string,
  meta?: { title?: string; date?: string }
): SocialPost | null {
  if (!rawUrl || typeof rawUrl !== "string") return null;
  const url = rawUrl.trim();

  // 1. Instagram (/p/, /reel/, /tv/)
  if (/instagram\.com/i.test(url)) {
    const match = url.match(/instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i);
    if (match) {
      const code = match[1];
      return {
        id: `ig-${code}`,
        platform: "instagram",
        url,
        embedUrl: `https://www.instagram.com/p/${code}/embed/`,
        title: meta?.title,
        date: meta?.date,
      };
    }
  }

  // 2. LinkedIn (/posts/, /feed/update/, /embed/)
  if (/linkedin\.com/i.test(url)) {
    // Caso a URL já esteja no formato de embed
    if (url.includes("/embed/feed/update/")) {
      const idMatch = url.match(/urn:li:[^?&/]+/);
      return {
        id: idMatch ? idMatch[0] : `li-${Date.now()}`,
        platform: "linkedin",
        url,
        embedUrl: url,
        title: meta?.title,
        date: meta?.date,
      };
    }

    // URN explícito no link (urn:li:activity:..., urn:li:share:...)
    const urnMatch = url.match(/urn:li:(activity|share|ugcPost):(\d+)/i);
    if (urnMatch) {
      const [, type, numId] = urnMatch;
      return {
        id: `li-${numId}`,
        platform: "linkedin",
        url,
        embedUrl: `https://www.linkedin.com/embed/feed/update/urn:li:${type}:${numId}`,
        title: meta?.title,
        date: meta?.date,
      };
    }

    // Slug no formato /posts/...-activity-7123456789...
    const actMatch = url.match(/activity[ -](\d+)/i) || url.match(/-(\d{16,20})/);
    if (actMatch) {
      const numId = actMatch[1];
      return {
        id: `li-${numId}`,
        platform: "linkedin",
        url,
        embedUrl: `https://www.linkedin.com/embed/feed/update/urn:li:activity:${numId}`,
        title: meta?.title,
        date: meta?.date,
      };
    }
  }

  return null;
}

/**
 * Converte uma lista heterogênea de URLs (ou objetos com URL + metadados)
 * em uma lista tipada de SocialPost.
 */
export function createSocialPosts(
  items: (string | { url: string; title?: string; date?: string })[]
): SocialPost[] {
  const posts: SocialPost[] = [];

  for (const item of items) {
    if (typeof item === "string") {
      const parsed = parseSocialUrl(item);
      if (parsed) posts.push(parsed);
    } else if (item && typeof item === "object" && item.url) {
      const parsed = parseSocialUrl(item.url, { title: item.title, date: item.date });
      if (parsed) posts.push(parsed);
    }
  }

  return posts;
}

/**
 * LISTA DE LINKS BRUTOS
 * ============================================================================
 * Para adicionar novas publicações, basta colar a URL (LinkedIn ou Instagram)
 * como string abaixo. O parser cuidará de identificar a rede, isolar o ID
 * e gerar o iframe correspondente.
 * ============================================================================
 */
export const RAW_SOCIAL_LINKS: (string | { url: string; title?: string; date?: string })[] = [
  // --- LinkedIn ---
  {
    url: "https://www.linkedin.com/posts/pactoglobalonubr_forumambicao2030-decadadaimplementacao-sustentabilidade-activity-7248721389012345678-AbCd",
    title: "A Década da Implementação: o futuro da sustentabilidade corporativa",
    date: "LinkedIn",
  },
  {
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7251294801928374656/",
    title: "Lideranças confirmadas para o 4º Fórum Ambição 2030 no MASP",
    date: "LinkedIn",
  },
  {
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7253867214844403712/",
    title: "Painéis e temas estratégicos para a agenda ESG no Brasil",
    date: "LinkedIn",
  },

  // --- Instagram ---
  {
    url: "https://www.instagram.com/p/DFa1B2c3D4e/",
    title: "Save the Date: 02 de Junho no MASP",
    date: "Instagram",
  },
  {
    url: "https://www.instagram.com/p/DFz9Y8x7W6v/",
    title: "Conexões que aceleram a Agenda 2030",
    date: "Instagram",
  },
  {
    url: "https://www.instagram.com/reel/DEm5K4j3H2g/",
    title: "Confira a retrospectiva da última edição do Fórum",
    date: "Instagram",
  },
];

/** Posts pré-processados */
export const INITIAL_SOCIAL_POSTS = createSocialPosts(RAW_SOCIAL_LINKS);

export const SOCIAL_CHANNELS = {
  linkedin: {
    name: "LinkedIn",
    handle: "pactoglobalonubr",
    url: "https://www.linkedin.com/company/pactoglobalonubr/",
    eyebrow: "Conteúdo & Atualizações",
    description:
      "Fique por dentro das nossas análises, atualizações e conteúdos exclusivos no LinkedIn.",
    cta: "Ver LinkedIn",
    themeColor: "#23b9d6",
  },
  instagram: {
    name: "Instagram",
    handle: "@pactoglobalbr",
    url: "https://www.instagram.com/pactoglobalbr/",
    eyebrow: "Cobertura & Bastidores",
    description:
      "Acompanhe a cobertura em tempo real, bastidores, destaques e novidades do Fórum no Instagram.",
    cta: "Ver Instagram",
    themeColor: "#e21a72",
  },
} as const;
