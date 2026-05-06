import { identityAssets } from "./identity-assets";

const panels = [
  {
    src: identityAssets.kv,
    label: "Múltiplos movimentos",
    object: "object-[30%_34%]",
  },
  {
    src: identityAssets.waves,
    label: "Uma só ação",
    object: "object-[42%_58%]",
  },
  {
    src: identityAssets.lineField,
    label: "Agenda 2030",
    object: "object-[54%_52%]",
  },
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
              src={panel.src}
              alt=""
              className={`h-full w-full object-cover ${panel.object} opacity-[0.82] transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forum-ink/55 via-forum-ink/20 to-transparent" />
            <p className="absolute bottom-6 left-6 right-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
              {panel.label}
            </p>
          </div>
        ))}

        <div className="relative flex aspect-[4/3] flex-col items-center justify-center overflow-hidden bg-forum-cyan p-8 text-center text-forum-deep md:aspect-square">
          <img
            src={identityAssets.deepField}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-12"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(255,255,255,0.22),transparent_34%)]" />
          <div className="relative z-10">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.36em] opacity-72">
              Fórum
            </p>
            <p className="font-display text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl">
              Ambição
            </p>
            <p className="font-display text-5xl font-black uppercase leading-none tracking-tight opacity-[0.58] sm:text-6xl">
              2030
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
