import { accentLines } from "./identity-assets";

/**
 * Assinatura tipográfica do Fórum, sem número de edição. O logo oficial
 * (forum-ambicao-4-edicao.png) traz "4º Fórum" e o slogan da 4ª edição
 * gravados na arte; até existir o logo da 5ª edição, o cabeçalho e o rodapé
 * usam esta versão em texto. A marca do Pacto Global não é recortada nem
 * redesenhada aqui: ela aparece inteira, como "Realização", onde couber.
 */
export function ForumWordmark({ size = "sm" }: { size?: "sm" | "lg" }) {
  const text = size === "lg" ? "text-3xl sm:text-4xl" : "text-base sm:text-lg";

  return (
    <span className="inline-flex flex-col gap-1.5">
      <span
        className={`font-display font-black uppercase leading-none tracking-tight text-white ${text}`}
      >
        Fórum <span className="text-forum-cyan">Ambição 2030</span>
      </span>
      <span aria-hidden="true" className="flex h-1 w-full overflow-hidden rounded-full">
        {accentLines.map((color) => (
          <span key={color} className={`h-full flex-1 ${color}`} />
        ))}
      </span>
    </span>
  );
}
