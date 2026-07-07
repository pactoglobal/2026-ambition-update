export const identityAssets = {
  logo: "/identity/forum-ambicao-4-edicao.png",
  kv: "/identity/kv-4-edicao.jpg",
  waves: "/identity/waves.png",
  lineField: "/identity/line-field.png",
  deepField: "/identity/deep-blue-field.png",
  wordmark: "/identity/forum-wordmark.png",
  pacto: "/identity/pacto-global-realizacao.png",
  aegea: "/identity/aegea-patrocinador.png",
} as const;

export const partnerGroups = [
  {
    key: "realizacao",
    label: "Realização",
    src: identityAssets.pacto,
    alt: "Pacto Global Rede Brasil",
    width: 800,
    height: 864,
    heroClassName: "h-14 sm:h-16",
    sponsorsClassName: "h-24",
    footerClassName: "h-14",
  },
  {
    key: "patrocinio-master",
    label: "Patrocínio Master",
    src: identityAssets.aegea,
    alt: "Aegea",
    width: 1080,
    height: 445,
    heroClassName: "h-10 sm:h-12",
    sponsorsClassName: "h-16",
    footerClassName: "h-10",
  },
] as const;

export type BackdropAssetKey = "kv" | "waves" | "lineField" | "deepField";

export const accentLines = [
  "bg-forum-cyan",
  "bg-forum-blue",
  "bg-forum-magenta",
  "bg-forum-green",
  "bg-forum-red",
  "bg-forum-gold",
] as const;