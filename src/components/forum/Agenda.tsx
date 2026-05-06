import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KineticBackdrop, SectionHeader } from "./Identity";

const scheduleData = {
  "02 de Junho": [
    {
      time: "09h30",
      title: "Abertura",
      desc: "Guilherme Xavier, Diretor Executivo do Pacto Global - Rede Brasil, e Rachel Maia, Presidente do Conselho do Pacto Global - Rede Brasil.",
    },
    { time: "09h50", title: "Keynote Speaker", desc: "Palestra de abertura estratégica." },
    {
      time: "10h10",
      title: "Painel: Transição climática e energética",
      desc: "Debate sobre caminhos de implementação para clima, energia e competitividade.",
    },
    {
      time: "11h00",
      title: "FireChat: Integridade e governança corporativa",
      desc: "Conversa sobre governança, transparência e confiança como bases da agenda empresarial.",
    },
    {
      time: "11h20",
      title: "Painel: Transformação das cadeias produtivas",
      desc: "Como empresas estão redesenhando cadeias para ampliar impacto, resiliência e responsabilidade.",
    },
    { time: "12h10", title: "Apresentação Artística", desc: "Intervenção cultural e reflexiva." },
    {
      time: "12h30",
      title: "Almoço",
      desc: "Momento de networking e pausa estratégica.",
    },
    { time: "14h30", title: "Keynote Speaker", desc: "Palestra estratégica da tarde." },
    {
      time: "14h50",
      title: "Apresentação Movimentos",
      desc: "Mônica Gregori, Diretora de Impacto do Pacto Global - Rede Brasil, compartilha como os Movimentos influenciam decisões estratégicas no setor privado, mostrando que a sustentabilidade é uma exigência para o futuro dos negócios.",
    },
    {
      time: "15h00",
      title: "Painel: Economia circular e gestão de recursos naturais",
      desc: "Discussão sobre uso inteligente de recursos, circularidade e conservação como estratégia de negócio.",
    },
    {
      time: "15h50",
      title: "Apresentação de Business Case",
      desc: "Caso prático de implementação.",
    },
    {
      time: "16h10",
      title: "Painel: Futuro do trabalho e inclusão",
      desc: "Como inclusão, trabalho digno e novas competências sustentam a Década da Implementação.",
    },
    { time: "17h00", title: "Encerramento", desc: "Considerações finais e fechamento do Fórum." },
    {
      time: "17h10",
      title: "Recepção de Encerramento",
      desc: "Momento final de relacionamento e conexões qualificadas.",
    },
  ],
} as const;

type ScheduleDay = keyof typeof scheduleData;

const scheduleDays = Object.keys(scheduleData) as ScheduleDay[];

export function Agenda() {
  return (
    <section id="agenda" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-12">
        <Tabs defaultValue={scheduleDays[0]}>
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeader eyebrow="Programação Completa" title="Agenda" outline="2026" />

            <TabsList
              aria-label="Dias do evento"
              className="self-start rounded-xl border border-white/12 bg-white/7 p-1 backdrop-blur-md h-auto"
            >
              {scheduleDays.map((day) => (
                <TabsTrigger
                  key={day}
                  value={day}
                  className="rounded-lg px-8 py-3 text-[10px] font-sans font-black uppercase tracking-widest text-white/56 transition-colors duration-200 data-[state=active]:bg-forum-cyan data-[state=active]:text-forum-deep data-[state=active]:shadow-[0_0_28px_rgba(35,185,214,0.24)] data-[state=inactive]:hover:bg-white/8 data-[state=inactive]:hover:text-white"
                >
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {scheduleDays.map((day) => (
            <TabsContent key={day} value={day} className="grid grid-cols-1 gap-4 mt-0">
              {scheduleData[day].map((item, index) => (
                <motion.article
                  key={`${item.time}-${item.title}`}
                  initial={false}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.035 }}
                  className="forum-card group flex flex-col gap-6 rounded-xl p-6 transition-colors hover:border-forum-cyan/35 hover:bg-white/8 md:flex-row md:items-center md:p-8"
                >
                  <time className="min-w-[120px] font-display text-4xl font-bold tracking-tight text-white/22 transition-colors group-hover:text-forum-cyan">
                    {item.time}
                  </time>
                  <div className="flex-1">
                    <h3 className="mb-2 text-2xl font-display font-black uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                    <p className="max-w-3xl leading-relaxed text-white/64">{item.desc}</p>
                  </div>
                  <div className="h-px w-full bg-gradient-to-r from-forum-cyan via-forum-magenta to-forum-green md:h-px md:w-28" />
                </motion.article>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
