/**
 * Fonte única dos dados que mudam de uma edição para outra. Quando a
 * comunicação confirmar data, horário e local da 5ª edição, basta trocar os
 * valores aqui: Hero, FAQ e metadados leem deste arquivo.
 */

export const NEXT_EDITION = {
  ordinal: "5º",
  label: "5ª edição",
  /** 25/05/2027 informado pela comunicação (nov/2026); horário ainda a confirmar. */
  date: { value: "25 de maio de 2027", support: "Data prevista" },
  time: { value: "A confirmar", support: "Horário previsto" },
  venue: { value: "MASP, São Paulo", support: "Local previsto" },
  audience: { value: "400 lideranças", support: "Público previsto" },
  /**
   * Início do evento, com fuso de Brasília (ex.: "2027-06-01T09:00:00-03:00").
   * Alimenta a contagem regressiva do Hero; enquanto for null ela não aparece.
   * "Maio de 2027" não basta: a contagem só liga com dia e hora definidos.
   */
  startsAt: null as string | null,
  /**
   * Enquanto não há horário, a contagem corre até o início do dia previsto e
   * diz isso no rótulo ("Faltam para 25 de maio de 2027").
   */
  countdownFallback: { at: "2027-05-25T00:00:00-03:00", label: "Faltam para 25 de maio de 2027" },
};

export const LAST_EDITION = {
  label: "4ª edição",
  theme: "A Década da Implementação",
  date: "02 de junho de 2026",
  venue: "MASP",
  city: "São Paulo",
  address: "Avenida Paulista, 1578 - Bela Vista, São Paulo - SP",
} as const;

/**
 * Vídeo memória da 4ª edição. Enquanto for null a seção não aparece no site.
 * Preencha com o ID do vídeo no YouTube (o trecho depois de "v=" no link).
 */
export const MEMORY_VIDEO: { youtubeId: string; title: string } | null = {
  youtubeId: "h6V4rDkxqQk",
  title: "Fórum Ambição 2030 | Vídeo memória",
};

/**
 * Vídeo do Coquetel com CEOs da 4ª edição. Enquanto for null, o player não
 * aparece na seção do coquetel. Preencha com o ID do YouTube, como acima.
 */
export const COCKTAIL_VIDEO: { youtubeId: string; title: string } | null = null;

/** Quem recebe as manifestações de interesse do formulário "Seja parceiro". */
export const PARTNER_CONTACT = {
  name: "Rafael Carmo",
  role: "Parcerias e Apoio",
  email: "rafael.carmo@pactoglobal.org.br",
} as const;

/**
 * Termo ou apresentação comercial para download (PDF em /public). Enquanto
 * for null o botão de download não aparece.
 */
export const PARTNER_TERM_URL: string | null = null;
