const artPhotos = import.meta.glob(
  "../../assets/img/liderancas/atracao-artistica/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

const confirmedPhotos = import.meta.glob(
  "../../assets/img/liderancas/confirmados-2026/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

function normalizeStr(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/\p{Mn}/gu, "");
}

const artPhotoEntries = Object.entries(artPhotos).map(
  ([path, url]): [string, string] => [normalizeStr(path), url]
);

const confirmedPhotoEntries = Object.entries(confirmedPhotos).map(
  ([path, url]): [string, string] => [normalizeStr(path), url]
);

export function photoByArtist(name: string): string | undefined {
  const key = normalizeStr(name);
  return artPhotoEntries.find(([path]) => path.includes(key))?.[1];
}

export function photoBySpeaker(name: string): string | undefined {
  const key = normalizeStr(name).replace(/\s+/g, "_");
  const keyHyphen = key.replace(/_/g, "-");
  return (
    confirmedPhotoEntries.find(([path]) => path.includes(key))?.[1] ??
    confirmedPhotoEntries.find(([path]) => path.includes(keyHyphen))?.[1]
  );
}

export function photoByKey(key: string): string | undefined {
  const k = normalizeStr(key);
  return confirmedPhotoEntries.find(([path]) => path.includes(k))?.[1];
}

export { confirmedPhotos };
