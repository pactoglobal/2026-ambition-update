import { Globe } from "lucide-react";
import { identityAssets } from "./identity-assets";

function IconInstagram({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  );
}

function IconLinkedIn({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconYouTube({ size = 14 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const links = [
  { label: "Instagram", href: "https://www.instagram.com/pactoglobalonubr", Icon: IconInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/pacto-global-rede-brasil", Icon: IconLinkedIn },
  { label: "YouTube", href: "https://www.youtube.com/@PactoGlobalBrasil", Icon: IconYouTube },
  { label: "pactoglobal.org.br", href: "https://www.pactoglobal.org.br/", Icon: Globe },
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
          <nav aria-label="Links institucionais" className="flex flex-wrap justify-center gap-4">
            {links.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/55 transition-all hover:border-forum-cyan/40 hover:bg-forum-cyan/10 hover:text-forum-cyan"
              >
                <Icon size={13} />
                {label}
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
