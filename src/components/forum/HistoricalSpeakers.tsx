import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { accentLines } from "./identity-assets";

import { photoByKey as confirmedPhotoByKey } from "../../lib/photos";

const historicPhotos = import.meta.glob(
  "../../../assets/img/liderancas/historicos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;

/**
 * Procura a foto em historicos/ pelo NOME DO ARQUIVO (sem extensão) começando
 * com a chave e, se não achar, nas fotos de 2026 (confirmados-2026/).
 * Antes a busca era "o caminho contém a chave": "paul" casava com
 * "ana_paula_carracedo.jpg" e o card do Paul Polman mostrava a foto dela.
 */
function photoFor(key: string): string | undefined {
  const wanted = key.toLowerCase();
  const entry = Object.entries(historicPhotos).find(([path]) => {
    const file = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "").toLowerCase();
    return file.startsWith(wanted);
  });
  return entry?.[1] ?? confirmedPhotoByKey(key);
}

/**
 * Seleção e ordem do deck institucional da 5ª edição ("Speakers que já
 * estiveram no palco do Fórum Ambição 2030"). Para mudar quem aparece, mude
 * esta lista — não há outra fonte de speakers no site.
 */
const historicalSpeakers = [
  { name: "Paul Polman", role: "Liderança empresarial", photoKey: "paul_polman" },
  {
    name: "Aretha Duarte",
    role: "Alpinista, primeira mulher negra latino-americana a chegar ao topo do Everest",
    photoKey: "aretha_duarte",
  },
  {
    name: "Danni Suzuki",
    role: "Atriz, ativista social e apoiadora de alto perfil da ACNUR",
    photoKey: "danni-suzuki",
  },
  {
    name: "Alexandre Coimbra",
    role: "Consultor de saúde mental, escritor e colunista",
    photoKey: "alexandre_coimbra",
  },
  { name: "Luis Guimarães", role: "Liderança empresarial", photoKey: "luis_guimaraes" },
  { name: "Marta Suplicy", role: "Gestão pública", photoKey: "marta_suplicy" },
  { name: "Bela Gil", role: "Ativista e comunicadora", photoKey: "bela_gil" },
  {
    name: "Patricia Hill Collins",
    role: "Acadêmica e referência em equidade",
    photoKey: "patricia_hill_collins",
  },
  { name: "Luiza Trajano", role: "Liderança empresarial", photoKey: "luiza_trajano" },
  { name: "Albert Cheung", role: "Liderança empresarial", photoKey: "albert_cheung" },
  // Conselheiras do Pacto Global – Rede Brasil (atuais e ex). Cargos de
  // Ana Paula e Luciana conforme o telão da abertura da 4ª edição.
  {
    name: "Ana Paula Carracedo",
    role: "Presidente do Conselho de Administração do Pacto Global da ONU – Rede Brasil",
    photoKey: "ana_paula_carracedo",
  },
  {
    name: "Luciana Nicola",
    role: "Vice-presidente do Conselho de Administração do Pacto Global da ONU – Rede Brasil",
    photoKey: "luciana_nicola",
  },
  // Retratos 3:4 em liderancas/historicos/ (rachel_maia.jpg, ana_fontes.jpg).
  {
    name: "Rachel Maia",
    role: "Conselho do Pacto Global da ONU – Rede Brasil",
    photoKey: "rachel_maia",
  },
  {
    name: "Ana Fontes",
    role: "Conselho do Pacto Global da ONU – Rede Brasil",
    photoKey: "ana_fontes",
  },
];

export function HistoricalSpeakersCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    loop: false,
  });

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-3 px-4 sm:px-6 lg:px-12">
        <button
          type="button"
          aria-label="Speaker anterior"
          onClick={() => emblaApi?.scrollPrev()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-sky hover:text-forum-deep"
        >
          <ChevronLeft aria-hidden="true" size={18} />
        </button>
        <button
          type="button"
          aria-label="Próximo speaker"
          onClick={() => emblaApi?.scrollNext()}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/16 bg-white/5 text-white transition-colors hover:bg-forum-sky hover:text-forum-deep"
        >
          <ChevronRight aria-hidden="true" size={18} />
        </button>
      </div>

      <div ref={emblaRef} className="overflow-hidden px-4 sm:px-6 lg:px-12">
        <div className="flex gap-4">
          {historicalSpeakers
            .filter((speaker) => photoFor(speaker.photoKey))
            .map((speaker, index) => {
              const photo = photoFor(speaker.photoKey);
              return (
                <div key={speaker.name} className="flex-none w-[82%] sm:w-[46%] lg:w-[28%]">
                  <article className="forum-card group relative overflow-hidden rounded-2xl">
                    {photo ? (
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img
                          src={photo}
                          alt={`Foto de ${speaker.name}`}
                          width={600}
                          height={800}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forum-ink via-forum-ink/30 to-transparent" />
                        <div
                          className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h3 className="text-xl font-display font-black uppercase leading-tight tracking-tight text-white">
                            {speaker.name}
                          </h3>
                          <p className="mt-1.5 text-[11px] font-bold uppercase leading-snug tracking-wider text-white/72">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative min-h-[320px] p-7">
                        <div
                          className={`absolute left-0 top-0 h-1 w-full ${accentLines[index % accentLines.length]}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/90 via-forum-ink/60 to-forum-ink/20" />
                        <div className="relative z-10 flex min-h-[260px] flex-col justify-end">
                          <p className="mb-4 text-[9px] font-black uppercase tracking-[0.32em] text-white/62">
                            Fórum Ambição 2030
                          </p>
                          <h3 className="text-xl font-display font-black uppercase leading-tight tracking-tight text-white">
                            {speaker.name}
                          </h3>
                          <p className="mt-2 text-[11px] font-bold uppercase leading-relaxed tracking-wider text-white/72">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </article>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
