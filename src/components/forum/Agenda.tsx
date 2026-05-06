import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mic, Users, Coffee, Star, Music, Award } from "lucide-react";
import { KineticBackdrop, SectionHeader } from "./Identity";

type SessionType = "abertura" | "keynote" | "painel" | "business" | "intervalo" | "arte" | "estrategia" | "encerramento";

interface Speaker {
  name: string;
  role: string;
  note?: string;
}

interface Session {
  time: string;
  type: SessionType;
  title: string;
  subtitle?: string;
  desc?: string;
  speakers?: Speaker[];
  moderator?: Speaker;
}

const TYPE_CONFIG: Record<SessionType, { label: string; color: string; icon: React.ElementType }> = {
  abertura:    { label: "Abertura",           color: "text-forum-cyan  border-forum-cyan/40  bg-forum-cyan/10",  icon: Star },
  keynote:     { label: "Keynote",            color: "text-forum-gold  border-forum-gold/40  bg-forum-gold/10",  icon: Mic },
  painel:      { label: "Painel",             color: "text-forum-blue  border-forum-blue/40  bg-forum-blue/10",  icon: Users },
  business:    { label: "Business Case",      color: "text-forum-green border-forum-green/40 bg-forum-green/10", icon: Award },
  intervalo:   { label: "Intervalo",          color: "text-white/40    border-white/14        bg-white/4",        icon: Coffee },
  arte:        { label: "Apresentação",       color: "text-forum-magenta border-forum-magenta/40 bg-forum-magenta/10", icon: Music },
  estrategia:  { label: "Estratégia",         color: "text-forum-cyan  border-forum-cyan/40  bg-forum-cyan/10",  icon: Star },
  encerramento:{ label: "Encerramento",       color: "text-white/60    border-white/20        bg-white/5",        icon: Star },
};

const SESSIONS: Session[] = [
  {
    time: "09h30",
    type: "abertura",
    title: "Abertura",
    desc: "Boas-vindas e apresentação da 4ª edição do Fórum Ambição 2030 — A Década da Implementação.",
    speakers: [
      { name: "Guilherme Xavier", role: "Diretor Executivo, Pacto Global – Rede Brasil" },
      { name: "Presidente do Conselho", role: "Pacto Global – Rede Brasil" },
      { name: "Coordenador Residente do Sistema ONU", role: "ONU Brasil" },
    ],
  },
  {
    time: "09h50",
    type: "keynote",
    title: "Keynote Speaker",
    speakers: [
      { name: "Avanish Sahai", role: "Keynote Speaker" },
    ],
  },
  {
    time: "10h10",
    type: "painel",
    title: "Transição Energética: Oportunidade ou Obrigação?",
    subtitle: "O Brasil diante da nova economia de baixo carbono",
    desc: "Debate sobre os caminhos concretos da transição energética no Brasil — quem financia, quem regula e quem implementa. Como o setor empresarial, o poder público e a cooperação internacional convergem para uma economia de baixo carbono competitiva.",
    speakers: [
      { name: "Marian Schuegraf", role: "Chefe da Delegação da União Europeia no Brasil", note: "TBC" },
      { name: "Carlos Carboni", role: "Diretor de Cooperação, Itaipu Binacional", note: "TBC" },
      { name: "Manuel Reyes-Retana", role: "Diretor IFC Brasil", note: "TBC" },
    ],
    moderator: { name: "Giovana Girardi", role: "Jornalista, Estadão", note: "TBC" },
  },
  {
    time: "11h00",
    type: "keynote",
    title: "Keynote: Liderança com Saúde Mental e Significado",
    desc: "Como líderes podem sustentar alta performance sem abrir mão do propósito e do bem-estar — uma perspectiva prática para os desafios da Década da Implementação.",
    speakers: [
      {
        name: "Alexandre Coimbra",
        role: "Palestrante, consultor de saúde mental, escritor best seller, colunista do Valor Econômico e da TV Globo",
      },
    ],
  },
  {
    time: "11h20",
    type: "painel",
    title: "Rastreabilidade e Transparência na Cadeia de Valor",
    subtitle: "Onde compliance, rastreabilidade e direitos humanos se encontram",
    desc: "Como empresas estão transformando suas cadeias produtivas para garantir integridade, rastreabilidade e respeito aos direitos humanos — da extração ao consumidor final.",
    speakers: [
      { name: "Ricardo Wagner", role: "Diretor de Compliance, Petrobras", note: "TBC" },
      { name: "Irina Bacci", role: "PADF", note: "TBC" },
      { name: "Waleria Sampaio", role: "Gerente Executiva de Estratégia e Governança de Sustentabilidade", note: "TBC" },
      { name: "Vinicius Pinheiro", role: "OIT – Organização Internacional do Trabalho", note: "TBC" },
      { name: "Malu Paiva", role: "Vice-Presidente de Sustentabilidade e Comunicação, Suzano", note: "TBC" },
    ],
    moderator: { name: "Caco Barcelos", role: "Jornalista", note: "TBC" },
  },
  {
    time: "12h10",
    type: "business",
    title: "Business Case: Financiamento Sustentável",
    desc: "Apresentação de caso prático sobre como o financiamento sustentável viabiliza a implementação de estratégias ESG em escala.",
    speakers: [
      { name: "Adriana Albanese", role: "Diretora de Sustentabilidade, Aegea" },
    ],
  },
  {
    time: "12h30",
    type: "intervalo",
    title: "Almoço & Networking",
    desc: "Pausa estratégica para networking qualificado entre lideranças.",
  },
  {
    time: "14h30",
    type: "painel",
    title: "Protagonismo sem Fronteiras: a Agenda de Gênero em Tempos de Crise",
    subtitle: "Entre o palco e o mundo — arte, ativismo e liderança",
    desc: "Em dois momentos: Parte 1 — quando arte e ativismo se encontram; Parte 2 — Recomeços que inspiram e lideram. A terceira meta do Movimento Elas Lideram prevê que 50% das posições de liderança sejam compostas por grupos sub-representados.",
    speakers: [
      { name: "Camila Pitanga", role: "Atriz e Embaixadora da ONU Mulheres" },
      { name: "Dani Suzuki", role: "Atriz e Ativista", note: "TBC" },
      { name: "Fernando Viriato", role: "Vice-Presidente Sênior de Talento e Cultura, Accor Américas", note: "TBC" },
      { name: "Pessoa Refugiada", role: "Representação de trajetória de recomeço" },
    ],
    moderator: { name: "Monica Waldvogel", role: "Jornalista" },
  },
  {
    time: "15h10",
    type: "estrategia",
    title: "Estratégia Ambição 2030",
    subtitle: "Apresentação dos Movimentos e novos compromissos",
    desc: "Highlights do novo Relatório da Ambição 2030, novas metas dos Movimentos, lançamento do Estudo do Salário Digno e do Guia Saúde Mental e Futuro do Trabalho. Reconhecimento das empresas que bateram as metas e agradecimento às empresas embaixadoras.",
    speakers: [
      { name: "Mônica Gregori", role: "Diretora de Impacto, Pacto Global – Rede Brasil" },
    ],
  },
  {
    time: "16h10",
    type: "arte",
    title: "Apresentação Artística",
    desc: "Intervenção cultural e reflexiva integrada à programação do evento.",
  },
  {
    time: "16h30",
    type: "painel",
    title: "Da Extração à Regeneração",
    subtitle: "Novos caminhos para a gestão de recursos naturais e economia circular",
    desc: "Como empresas e movimentos sociais constroem juntos a transição para modelos regenerativos — da economia circular à gestão responsável de resíduos e recursos naturais.",
    speakers: [
      { name: "Milton Pilão", role: "CEO, Orizon", note: "TBC" },
      { name: "Waldir Beira Junior", role: "CEO, Ypê" },
      { name: "Aline Matulja", role: "Comunicadora e Ativista", note: "TBC" },
      { name: "Roberto Rocha / Ancat", role: "Representante do Movimento de Catadores", note: "TBC" },
      { name: "Naiá Tupinambá", role: "Liderança Indígena", note: "TBC" },
    ],
    moderator: { name: "Cris Guterres", role: "Jornalista e Membro do Comitê Consultivo do Movimento Conexão Circular" },
  },
  {
    time: "17h20",
    type: "painel",
    title: "Quem Programa o Futuro?",
    subtitle: "IA ética e o mundo do trabalho que queremos",
    desc: "Como a inteligência artificial está redesenhando o mercado de trabalho — e o que as empresas devem fazer para garantir que essa transformação seja justa, inclusiva e alinhada à Agenda 2030.",
    speakers: [
      { name: "Claudia Romano", role: "VP, Yduqs", note: "TBC" },
      { name: "Vivian Broge", role: "TOTVS" },
      { name: "Naiá Tupinambá", role: "Liderança Indígena", note: "TBC" },
      { name: "Daniel Duque", role: "Pesquisador, FGV" },
      { name: "Grazi Mendes", role: "Head de Diversidade, Equidade e Inclusão para as Américas, ThoughtWorks" },
      { name: "Nina da Hora", role: "Pesquisadora e Ativista em Tecnologia", note: "TBC" },
    ],
    moderator: { name: "Vinicius Pinheiro", role: "OIT – Organização Internacional do Trabalho" },
  },
  {
    time: "18h00",
    type: "encerramento",
    title: "Encerramento",
    desc: "Considerações finais e fechamento oficial da 4ª edição do Fórum Ambição 2030.",
  },
  {
    time: "18h10",
    type: "encerramento",
    title: "Networking & Coquetel",
    desc: "Momento final de relacionamento e conexões qualificadas entre os participantes.",
  },
];

function SessionCard({ session, index }: { session: Session; index: number }) {
  const [open, setOpen] = useState(false);
  const config = TYPE_CONFIG[session.type];
  const Icon = config.icon;
  const hasDetails = !!(session.desc || session.speakers?.length || session.moderator);
  const isInterval = session.type === "intervalo";

  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <button
        type="button"
        onClick={() => hasDetails && setOpen((o) => !o)}
        aria-expanded={hasDetails ? open : undefined}
        className={`forum-card group w-full rounded-xl p-5 text-left transition-colors md:p-7 ${
          hasDetails ? "cursor-pointer hover:border-white/20 hover:bg-white/6" : "cursor-default"
        } ${open ? "border-white/18 bg-white/6" : ""}`}
      >
        <div className="flex items-start gap-5 md:gap-7">
          <time className="min-w-[72px] shrink-0 font-display text-2xl font-bold leading-none tracking-tight text-white/25 transition-colors group-hover:text-white/45 md:min-w-[90px] md:text-3xl">
            {session.time}
          </time>

          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <span className={`mb-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.26em] ${config.color}`}>
                <Icon aria-hidden="true" size={10} />
                {config.label}
              </span>
              <h3 className="text-lg font-display font-black uppercase leading-tight tracking-tight text-white md:text-xl">
                {session.title}
              </h3>
              {session.subtitle && (
                <p className="mt-1 text-sm text-white/50 italic">{session.subtitle}</p>
              )}
              {!isInterval && session.speakers && !open && (
                <p className="mt-2 text-[11px] text-white/40 line-clamp-1">
                  {session.speakers.map((s) => s.name).join(" · ")}
                </p>
              )}
            </div>

            {hasDetails && (
              <ChevronDown
                aria-hidden="true"
                size={18}
                className={`mt-1 shrink-0 text-white/30 transition-transform duration-300 ${open ? "rotate-180 text-forum-cyan" : ""}`}
              />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="forum-card mt-1 rounded-xl border-white/10 bg-white/4 p-5 md:ml-[calc(72px+20px)] md:p-7 lg:ml-[calc(90px+28px)]">
              {session.desc && (
                <p className="mb-5 text-sm leading-relaxed text-white/66 md:text-base">{session.desc}</p>
              )}

              {session.speakers && session.speakers.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-forum-cyan/70">
                    {session.type === "keynote" ? "Speaker" : "Painelistas"}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {session.speakers.map((s) => (
                      <li key={s.name} className="flex flex-col rounded-lg border border-white/8 bg-white/4 px-4 py-3">
                        <span className="text-sm font-bold text-white">
                          {s.name}
                          {s.note && (
                            <span className="ml-2 text-[9px] font-black uppercase tracking-wider text-white/30">
                              {s.note}
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 text-[11px] leading-snug text-white/48">{s.role}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {session.moderator && (
                <div className="mt-4 flex items-start gap-3 border-t border-white/8 pt-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.28em] text-white/35 mt-0.5 shrink-0">
                    Moderação
                  </span>
                  <div>
                    <span className="text-sm font-bold text-white">
                      {session.moderator.name}
                      {session.moderator.note && (
                        <span className="ml-2 text-[9px] font-black uppercase tracking-wider text-white/30">
                          {session.moderator.note}
                        </span>
                      )}
                    </span>
                    <span className="ml-2 text-[11px] text-white/45">{session.moderator.role}</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export function Agenda() {
  return (
    <section id="agenda" className="forum-surface relative overflow-hidden py-24">
      <KineticBackdrop image="lineField" intensity="soft" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-6 lg:px-12">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="02 de Junho de 2026 · MASP · São Paulo"
            title="Agenda"
            outline="2026"
            description="Clique em cada sessão para ver painelistas, descrição e detalhes."
          />
        </div>

        <div className="space-y-2">
          {SESSIONS.map((session, index) => (
            <SessionCard key={`${session.time}-${session.title}`} session={session} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
