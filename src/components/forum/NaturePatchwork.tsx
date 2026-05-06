// kv-forum-2026-final.png é 2839×1121px — key visual completo com 3 painéis gráficos.
// Cada painel recorta 1/3 da largura usando object-position.
const KV_SRC = "/identity/kv-forum-2026-final.png";

const panels = [
  { label: "Múltiplos movimentos", objectPos: "object-[0%_50%]" },
  { label: "Uma só ação",          objectPos: "object-[50%_50%]" },
  { label: "Agenda 2030",          objectPos: "object-[100%_50%]" },
];

export function NaturePatchwork() {
  return (
    <section className="bg-forum-deep" aria-label="Sistema visual do Fórum Ambição 2030">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {panels.map((panel) => (
          <div
            key={panel.label}
            className="group relative aspect-[4/3] overflow-hidden border-b border-white/8 md:aspect-square lg:border-b-0 lg:border-r"
          >
            <img
              src={KV_SRC}
              alt=""
              width={2839}
              height={1121}
              className={`h-full w-full object-cover ${panel.objectPos} transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/60 via-forum-ink/10 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
              {panel.label}
            </p>
          </div>
        ))}

        <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden bg-forum-cyan p-8 text-center text-forum-deep md:aspect-square">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,0.28),transparent_38%)]" />
          <div className="relative z-10">
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.42em] opacity-60">
              Fórum
            </p>
            <p className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter sm:text-6xl">
              Ambição
            </p>
            <p className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter opacity-50 sm:text-6xl">
              2030
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
