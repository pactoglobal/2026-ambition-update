const panels = [
  { src: "/img/galeria-de-momentos/event-gallery-1.jpg", label: "Múltiplos movimentos" },
  { src: "/img/galeria-de-momentos/event-gallery-3.jpg", label: "Uma só ação" },
  { src: "/img/galeria-de-momentos/event-gallery-6.jpg", label: "Agenda 2030" },
];

export function NaturePatchwork() {
  return (
    <section className="bg-forum-deep" aria-label="Galeria do Fórum Ambição 2030">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {panels.map((panel) => (
          <div
            key={panel.label}
            className="group relative aspect-square overflow-hidden"
          >
            <img
              src={panel.src}
              alt=""
              width={800}
              height={800}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/70 via-forum-ink/20 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
              {panel.label}
            </p>
          </div>
        ))}

        <div className="relative flex aspect-square flex-col items-center justify-center overflow-hidden bg-forum-cyan p-8 text-center text-forum-deep">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,0.28),transparent_38%)]" />
          <div className="relative z-10">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.42em] opacity-60">
              4° Fórum
            </p>
            <p className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl">
              Ambição
            </p>
            <p className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter opacity-50 sm:text-6xl">
              2030
            </p>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-widest opacity-50">
              02 Jun 2026 · MASP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
