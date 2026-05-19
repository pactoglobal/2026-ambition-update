import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { identityAssets } from "./identity-assets";

const NAV_LINKS = [
  { label: "O Evento", href: "#sobre" },
  { label: "Speakers", href: "#speakers" },
  { label: "Agenda", href: "#agenda" },
  { label: "Local", href: "#local" },
  { label: "Parceiros", href: "#sponsors" },
  { label: "Contato", href: "#contato" },
];

const SECTIONS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);

    for (const id of [...SECTIONS].reverse()) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 160) {
        setActiveSection(id);
        return;
      }
    }

    setActiveSection("hero");
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50"
        initial={false}
        animate={{ y: 0, opacity: 1 }}
      >
        <div
          className={`transition-[background,border-color,box-shadow,padding] duration-300 ${
            scrolled
              ? "border-b border-white/10 bg-forum-deep/86 py-3 shadow-2xl backdrop-blur-2xl"
              : "bg-transparent py-5"
          }`}
        >
          <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-12">
            <button
              type="button"
              aria-label="Voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center"
            >
              <img
                src={identityAssets.logo}
                alt="4º Fórum Ambição 2030"
                width={400}
                height={151}
                className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-11"
              />
            </button>

            <nav aria-label="Navegação principal" className="hidden items-center gap-6 xl:flex">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const active = activeSection === id;

                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className={`relative py-2 text-[10px] font-sans font-bold uppercase tracking-[0.3em] transition-colors duration-200 ${
                      active ? "text-forum-cyan" : "text-white/56 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <motion.span
                        layoutId="navActive"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-forum-cyan"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="flex items-center gap-5">
              <motion.button
                type="button"
                aria-label="Participar do evento"
                onClick={() => scrollTo("#lista-de-espera")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="hidden rounded-full border border-forum-cyan/50 bg-forum-cyan/10 px-6 py-2.5 text-[10px] font-sans font-black uppercase tracking-widest text-forum-cyan backdrop-blur-sm transition-colors duration-200 hover:bg-forum-cyan hover:text-forum-deep sm:block"
              >
                Participar
              </motion.button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <button
                  type="button"
                  aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((open) => !open)}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/12 bg-white/8 text-white backdrop-blur xl:hidden"
                >
                  {mobileOpen ? (
                    <X aria-hidden="true" size={21} />
                  ) : (
                    <Menu aria-hidden="true" size={21} />
                  )}
                </button>

                <SheetContent
                  side="right"
                  className="w-[min(86vw,380px)] border-l border-white/10 bg-forum-deep p-0 xl:hidden [&>button]:hidden"
                >
                  <SheetTitle className="sr-only">Menu de navegação</SheetTitle>

                  <img
                    src={identityAssets.waves}
                    alt=""
                    className="pointer-events-none absolute -right-40 bottom-8 w-[680px] max-w-none opacity-20"
                  />

                  <div className="relative z-10 flex h-full flex-col p-8">
                    <div className="mb-12 flex items-center justify-between">
                      <img
                        src={identityAssets.logo}
                        alt="4º Fórum Ambição 2030"
                        width={400}
                        height={151}
                        className="h-8 w-auto"
                      />
                      <button
                        type="button"
                        aria-label="Fechar menu"
                        onClick={() => setMobileOpen(false)}
                        className="text-white/70 transition-colors hover:text-white"
                      >
                        <X aria-hidden="true" size={24} />
                      </button>
                    </div>

                    <nav aria-label="Navegação mobile" className="flex flex-col gap-1">
                      {NAV_LINKS.map((link, i) => (
                        <motion.button
                          key={link.href}
                          type="button"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => scrollTo(link.href)}
                          className="group flex items-center justify-between border-b border-white/8 py-4 text-left text-lg font-display font-black uppercase tracking-tight text-white/74 transition-colors hover:text-forum-cyan"
                        >
                          {link.label}
                          <span className="text-forum-cyan opacity-60 transition-opacity group-hover:opacity-100">
                            →
                          </span>
                        </motion.button>
                      ))}
                    </nav>

                    <div className="mt-auto pt-8">
                      <button
                        type="button"
                        aria-label="Participar do evento"
                        onClick={() => scrollTo("#lista-de-espera")}
                        className="w-full rounded-full bg-forum-cyan py-4 text-xs font-sans font-black uppercase tracking-widest text-forum-deep transition-colors hover:bg-white"
                      >
                        Participar Agora
                      </button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
