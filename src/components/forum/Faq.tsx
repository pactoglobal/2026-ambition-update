import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { LAST_EDITION, NEXT_EDITION } from "./edition";

const faqs = [
  {
    question: "O que é o Fórum Ambição 2030?",
    answer:
      "É o principal encontro de sustentabilidade corporativa do Brasil, promovido pelo Pacto Global da ONU – Rede Brasil. Estruturado a partir dos 10 Movimentos, reúne altas lideranças para trocar boas práticas, firmar parcerias e transformar intenção em ação rumo aos ODS.",
  },
  {
    question: `Quando e onde será a ${NEXT_EDITION.label}?`,
    answer:
      "A 5ª edição está prevista para maio de 2027, no MASP, em São Paulo. O dia e o horário serão divulgados aqui no site e nos canais do Pacto Global da ONU – Rede Brasil.",
  },
  {
    question: "Quem participa?",
    answer:
      "A 5ª edição prevê 400 participantes: gestores e lideranças de áreas estratégicas responsáveis por impulsionar a agenda de sustentabilidade corporativa nas organizações. Nas edições anteriores, a participação foi por convite.",
  },
  {
    question: "Como minha empresa pode ser parceira do evento?",
    answer:
      "Preencha o formulário “Seja parceiro”, no fim desta página. A equipe de parcerias do Pacto Global retorna com as cotas e contrapartidas disponíveis.",
  },
  {
    question: `Como foi a ${LAST_EDITION.label}?`,
    answer: `A 4ª edição, com o tema “${LAST_EDITION.theme}”, foi realizada em ${LAST_EDITION.date} no ${LAST_EDITION.venue}, em ${LAST_EDITION.city}, e reuniu 669 pessoas e 40 speakers. Os números, as fotos e os speakers estão nesta página.`,
  },
];

export function Faq() {
  return (
    <section id="faq" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="waves" glow="rise" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
          <AnimatedSection className="lg:w-1/3">
            <SectionHeader
              eyebrow="Dúvidas"
              title="Perguntas"
              outline="frequentes"
              description="O essencial sobre o Fórum Ambição 2030 e a próxima edição."
            />
          </AnimatedSection>

          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="flex flex-col gap-3 lg:w-2/3"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="overflow-hidden rounded-xl border border-white/8 bg-white/5 backdrop-blur-xl transition-colors duration-300 data-[state=open]:border-forum-cyan/34 data-[state=open]:bg-white/10"
              >
                <AccordionTrigger className="flex w-full items-center justify-between gap-6 p-6 text-left hover:no-underline md:p-8 [&>svg]:hidden">
                  <span className="text-xl font-display font-black tracking-tight text-white transition-colors [[data-state=open]_&]:text-forum-cyan">
                    {faq.question}
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 [[data-state=open]_&]:border-forum-cyan [[data-state=open]_&]:text-forum-cyan">
                    <ChevronDown
                      aria-hidden="true"
                      size={20}
                      className="transition-transform duration-300 [[data-state=open]_&]:rotate-180"
                    />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-8 md:px-8 md:pb-10">
                  <div className="mb-6 h-px w-full bg-white/8" />
                  <p className="max-w-2xl text-lg leading-relaxed text-white/72">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
