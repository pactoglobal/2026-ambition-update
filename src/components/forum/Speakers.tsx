import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { HistoricalSpeakersCarousel } from "./HistoricalSpeakers";

/**
 * "Speakers que já passaram pelo Fórum" (item 7 da estrutura da 5ª edição).
 * Mostra só a seleção curada do deck institucional, sem a lista completa de
 * palestrantes da 4ª edição — ela fazia a seção parecer programação de 2026.
 */
export function Speakers() {
  return (
    <section id="speakers" className="forum-surface relative overflow-hidden py-20 lg:py-24">
      <KineticBackdrop image="deepField" glow="center" />

      <div className="relative z-10">
        <div className="mx-auto mb-12 max-w-screen-xl px-4 sm:px-6 lg:px-12">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Keynotes & Painelistas"
              title="Quem já passou"
              outline="pelo Fórum"
              description="Speakers que já estiveram no palco do Fórum Ambição 2030."
            />
          </AnimatedSection>
        </div>

        <HistoricalSpeakersCarousel />
      </div>
    </section>
  );
}
