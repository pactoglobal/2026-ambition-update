import { identityAssets } from "./identity-assets";

const links = [
  { label: "Instagram", href: "https://www.instagram.com/pactoglobalbr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/pacto-global-rede-brasil" },
  { label: "YouTube", href: "https://www.youtube.com/@PactoGlobalBrasil" },
  { label: "pactoglobal.org.br", href: "https://www.pactoglobal.org.br/" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-forum-ink py-20">
      <img
        src={identityAssets.waves}
        alt=""
        className="pointer-events-none absolute left-1/2 top-0 w-[1300px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
      />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-center gap-6">
          <img
            src={identityAssets.logo}
            alt="4º Fórum Ambição 2030"
            width={400}
            height={151}
            className="h-16 w-auto object-contain"
          />
          <div className="h-0.5 w-12 bg-forum-cyan" />
        </div>

        <div className="forum-card mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-10 rounded-xl p-10 sm:grid-cols-3">
          {[
            {
              label: "Realização",
              src: identityAssets.pacto,
              alt: "Pacto Global Rede Brasil",
              className: "h-14",
            },
            {
              label: "Patrocínio Master",
              src: identityAssets.aegea,
              alt: "Aegea",
              className: "h-10",
            },
            {
              label: "Apoio",
              src: identityAssets.aya,
              alt: "Aya Earth Partners",
              className: "h-10",
            },
          ].map(({ label, src, alt, className }) => (
            <div key={label} className="flex flex-col items-center gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.36em] text-white/38">
                {label}
              </p>
              <img
                src={src}
                alt={alt}
                width={800}
                height={864}
                className={`${className} w-auto object-contain opacity-[0.78]`}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-10">
          <nav
            aria-label="Links institucionais"
            className="flex flex-wrap justify-center gap-8 text-[10px] font-sans font-bold uppercase tracking-widest text-white/48"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-forum-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <p className="max-w-2xl text-center text-[10px] uppercase leading-loose tracking-[0.3em] text-white/28">
            © {new Date().getFullYear()} United Nations Global Compact - Rede Brasil.
            <br />A Década da Implementação - Transformando o futuro das empresas no Brasil.
          </p>
        </div>
      </div>
    </footer>
  );
}
