/**
 * Fonte única dos dados que mudam de uma edição para outra. Quando a
 * comunicação confirmar data, horário e local da 5ª edição, basta trocar os
 * valores aqui: Hero, FAQ e metadados leem deste arquivo.
 */

export const NEXT_EDITION = {
  ordinal: "5º",
  label: "5ª edição",
  /** Previsão do deck institucional (nov/2026); dia exato ainda não definido. */
  date: { value: "Maio de 2027", support: "Data prevista" },
  time: { value: "A confirmar", support: "Horário previsto" },
  venue: { value: "MASP, São Paulo", support: "Local previsto" },
  /**
   * Início do evento, com fuso de Brasília (ex.: "2027-06-01T09:00:00-03:00").
   * Alimenta a contagem regressiva do Hero; enquanto for null ela não aparece.
   * "Maio de 2027" não basta: a contagem só liga com dia e hora definidos.
   */
  startsAt: null as string | null,
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
