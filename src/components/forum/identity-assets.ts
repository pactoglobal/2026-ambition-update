export const identityAssets = {
  /** Logo oficial (UN Global Compact Rede Brasil | Fórum Ambição 2030), versão para fundo escuro. */
  logoOficial: "/identity/forum-ambicao-2030-branco.svg",
  logo: "/identity/forum-ambicao-4-edicao.png",
  kv: "/identity/kv-4-edicao.jpg",
  waves: "/identity/waves.png",
  lineField: "/identity/line-field.png",
  deepField: "/identity/deep-blue-field.png",
  wordmark: "/identity/forum-wordmark.png",
  pacto: "/identity/pacto-global-realizacao.png",
} as const;

export type BackdropAssetKey = "kv" | "waves" | "lineField" | "deepField";

export const accentLines = [
  "bg-forum-sky",
  "bg-forum-blue",
  "bg-forum-magenta",
  "bg-forum-green",
  "bg-forum-red",
  "bg-forum-gold",
] as const;
