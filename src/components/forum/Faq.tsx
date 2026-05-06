import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";

const faqs = [
  {
    question: "O que é o Fórum Ambição 2030?",
    answer:
      "O Fórum Ambição 2030 é o principal evento do Pacto Global da ONU - Rede Brasil, voltado para acelerar o progresso em direção aos Objetivos de Desenvolvimento Sustentável (ODS).",
  },
  {
    question: "Quem pode participar?",
    answer:
      "Líderes empresariais, representantes governamentais, especialistas do terceiro setor e investidores comprometidos com a agenda ESG e o desenvolvimento sustentável.",
  },
  {
    question: "Como funciona o ingresso solidário?",
    answer:
      "Parte do valor dos ingressos é revertida para iniciativas de impacto local e projetos de aceleração dos ODS no Brasil, alinhados com a missão do UN Global Compact.",
  },
  {
    question: "Onde será realizado o evento?",
    answer: "O Fórum será realizado presencialmente em São Paulo, no MASP, na Avenida Paulista.",
  },
  {
    question: "O evento oferece certificado?",
    answer:
      "Sim, todos os participantes receberão um certificado oficial do Pacto Global da ONU - Rede Brasil ao final do evento.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="waves" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-32">
          <AnimatedSection className="lg:w-1/3">
            <SectionHeader
              eyebrow="Dúvidas"
              title="FAQ"
              outline="2026"
              description="Tire suas dúvidas sobre a edição 2026 do Fórum Ambição e garanta sua participação."
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
