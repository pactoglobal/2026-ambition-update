import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mic, Users, Coffee, Star, Music, Award, ArrowRight } from "lucide-react";
import { KineticBackdrop, SectionHeader } from "./Identity";

type SessionType = "abertura" | "keynote" | "painel" | "business" | "intervalo" | "arte" | "estrategia" | "encerramento";

interface Speaker {
  name: string;
  role: string;
  note?: string;
}

interface Session {
  time: string;
  duration?: string;
  type: SessionType;
  title: string;
  theme?: string;
  desc?: string;
  points?: string[];
  speakers?: Speaker[];
  moderator?: Speaker;
}

const TYPE_CONFIG: Record<SessionType, { label: string; accent: string; badge: string; icon: React.ElementType }> = {
  abertura:    { label: "Abertura",      accent: "bg-forum-cyan",    badge: "text-forum-cyan  border-forum-cyan/30  bg-forum-cyan/8",     icon: Star },
  keynote:     { label: "Keynote",       accent: "bg-forum-gold",    badge: "text-forum-gold  border-forum-gold/30  bg-forum-gold/8",     icon: Mic },
  painel:      { label: "Painel",        accent: "bg-forum-blue",    badge: "text-forum-blue  border-forum-blue/30  bg-forum-blue/8",     icon: Users },
  business:    { label: "Business Case", accent: "bg-forum-green",   badge: "text-forum-green border-forum-green/30 bg-forum-green/8",    icon: Award },
  intervalo:   { label: "Intervalo",     accent: "bg-white/20",      badge: "text-white/40    border-white/12        bg-white/4",          icon: Coffee },
  arte:        { label: "Apresentação",  accent: "bg-forum-magenta", badge: "text-forum-magenta border-forum-magenta/30 bg-forum-magenta/8", icon: Music },
  estrategia:  { label: "Estratégia",    accent: "bg-forum-cyan",    badge: "text-forum-cyan  border-forum-cyan/30  bg-forum-cyan/8",     icon: ArrowRight },
  encerramento:{ label: "Encerramento",  accent: "bg-white/30",      badge: "text-white/50    border-white/16        bg-white/5",          icon: Star },
};

const SESSIONS: Session[] = [
  {
    time: "09h30",
    duration: "20 min",
    type: "abertura",
    title: "Abertura Oficial",
    theme: "A Década da Implementação",
    desc: "Boas-vindas institucionais e apresentação da 4ª edição do Fórum Ambição 2030 — o maior encontro de sustentabilidade corporativa do Brasil.",
    points: [
      "Contexto da Agenda 2030 e urgência da implementação",
      "Papel estratégico do setor privado brasileiro",
      "Destaques da edição 2026",
    ],
    speakers: [
      { name: "Guilherme Xavier", role: "Diretor Executivo, Pacto Global – Rede Brasil" },
      { name: "Presidente do Conselho", role: "Pacto Global – Rede Brasil" },
      { name: "Coordenador Residente do Sistema ONU", role: "ONU Brasil" },
    ],
  },
  {
    time: "09h50",
    duration: "20 min",
    type: "keynote",
    title: "Keynote de Abertura",
    theme: "Liderança global na era da transformação",
    desc: "Palestra de abertura com perspectiva global sobre o papel das empresas na construção de um futuro mais sustentável e equitativo.",
    points: [
      "Tendências globais de sustentabilidade corporativa",
      "O que as empresas líderes estão fazendo diferente",
      "Oportunidades para o Brasil na nova economia",
    ],
    speakers: [
      { name: "Avanish Sahai", role: "Keynote Speaker" },
    ],
  },
  {
    time: "10h10",
    duration: "50 min",
    type: "painel",
    title: "Transição Energética: Oportunidade ou Obrigação?",
    theme: "O Brasil diante da nova economia de baixo carbono",
    desc: "Debate sobre os caminhos concretos da transição energética no Brasil — quem financia, quem regula e quem implementa. Como o setor empresarial, o poder público e a cooperação internacional convergem para uma economia de baixo carbono competitiva.",
    points: [
      "Financiamento climático e papel dos bancos de desenvolvimento",
      "Regulação e política industrial verde no Brasil",
      "Cooperação UE–Brasil e oportunidades de mercado",
      "Casos concretos de implementação de energias renováveis",
    ],
    speakers: [
      { name: "Marian Schuegraf", role: "Chefe da Delegação da União Europeia no Brasil", note: "TBC" },
      { name: "Carlos Carboni", role: "Diretor de Cooperação, Itaipu Binacional", note: "TBC" },
      { name: "Manuel Reyes-Retana", role: "Diretor IFC Brasil", note: "TBC" },
    ],
    moderator: { name: "Giovana Girardi", role: "Jornalista, Estadão", note: "TBC" },
  },
  {
    time: "11h00",
    duration: "20 min",
    type: "keynote",
    title: "Keynote: Liderança com Saúde Mental e Significado",
    theme: "Alta performance com propósito e bem-estar",
    desc: "Como líderes podem sustentar alta performance sem abrir mão do propósito e do bem-estar — uma perspectiva prática para os desafios da Década da Implementação.",
    points: [
      "Saúde mental como vantagem competitiva organizacional",
      "Liderança regenerativa: do esgotamento ao significado",
      "Ferramentas práticas para gestores e equipes",
    ],
    speakers: [
      {
        name: "Alexandre Coimbra",
        role: "Palestrante, consultor de saúde mental, escritor best seller — Valor Econômico e TV Globo",
      },
    ],
  },
  {
    time: "11h20",
    duration: "50 min",
    type: "painel",
    title: "Rastreabilidade e Transparência na Cadeia de Valor",
    theme: "Onde compliance, rastreabilidade e direitos humanos se encontram",
    desc: "Como empresas estão transformando suas cadeias produtivas para garantir integridade, rastreabilidade e respeito aos direitos humanos — da extração ao consumidor final.",
    points: [
      "Due diligence em direitos humanos: da teoria à prática",
      "Tecnologia e rastreabilidade na cadeia produtiva",
      "Compliance socioambiental como critério de parceria",
      "Trabalho digno e certificações internacionais",
      "Casos de fornecedores de alto risco transformados",
    ],
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
    duration: "20 min",
    type: "business",
    title: "Business Case: Financiamento Sustentável",
    theme: "ESG em escala: da estratégia ao balanço",
    desc: "Apresentação de caso prático sobre como o financiamento sustentável viabiliza a implementação de estratégias ESG em escala, com resultados mensuráveis e impacto real.",
    points: [
      "Estruturação de instrumentos de financiamento verde",
      "Métricas de impacto e retorno financeiro integrado",
      "Lições aprendidas e replicabilidade do modelo",
    ],
    speakers: [
      { name: "Adriana Albanese", role: "Diretora de Relações com Investidores e Sustentabilidade, Aegea" },
    ],
  },
  {
    time: "12h30",
    duration: "2h",
    type: "intervalo",
    title: "Almoço & Networking",
    desc: "Pausa estratégica para networking qualificado entre lideranças de diferentes setores.",
  },
  {
    time: "14h30",
    duration: "40 min",
    type: "painel",
    title: "Protagonismo sem Fronteiras",
    theme: "A agenda de gênero em tempos de crise — arte, ativismo e liderança",
    desc: "Em dois momentos: Parte 1 — quando arte e ativismo se encontram; Parte 2 — Recomeços que inspiram e lideram. A terceira meta do Movimento Elas Lideram prevê que 50% das posições de liderança sejam compostas por grupos sub-representados.",
    points: [
      "Arte como instrumento de transformação social e política",
      "Ativismo corporativo: limites e responsabilidades",
      "Diversidade na liderança: metas, dados e accountability",
      "Trajetórias de recomeço e representatividade",
    ],
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
    duration: "60 min",
    type: "estrategia",
    title: "Estratégia Ambição 2030",
    theme: "Novos compromissos, metas e reconhecimento",
    desc: "Highlights do novo Relatório da Ambição 2030, novas metas dos Movimentos, lançamento do Estudo do Salário Digno e do Guia Saúde Mental e Futuro do Trabalho.",
    points: [
      "Lançamento do Relatório Ambição 2030 — edição 2026",
      "Novas metas dos 10 Movimentos do Pacto Global",
      "Lançamento: Estudo do Salário Digno",
      "Lançamento: Guia Saúde Mental e Futuro do Trabalho",
      "Reconhecimento das empresas que bateram metas",
      "Celebração das Empresas Embaixadoras",
    ],
    speakers: [
      { name: "Mônica Gregori", role: "Diretora de Impacto, Pacto Global – Rede Brasil" },
    ],
  },
  {
    time: "16h10",
    duration: "20 min",
    type: "arte",
    title: "Apresentação Artística",
    theme: "Cultura integrada à agenda de sustentabilidade",
    desc: "Intervenção cultural e reflexiva integrada à programação do evento — arte como expressão dos valores da Década da Implementação.",
  },
  {
    time: "16h30",
    duration: "50 min",
    type: "painel",
    title: "Da Extração à Regeneração",
    theme: "Novos caminhos para a gestão de recursos naturais e economia circular",
    desc: "Como empresas e movimentos sociais constroem juntos a transição para modelos regenerativos — da economia circular à gestão responsável de resíduos e recursos naturais.",
    points: [
      "Economia circular como modelo de negócio lucrativo",
      "Gestão de resíduos sólidos e responsabilidade estendida",
      "Comunidades tradicionais e saberes ancestrais na regeneração",
      "Catadores como agentes da economia circular",
      "Métricas de impacto ambiental e social integradas",
    ],
    speakers: [
      { name: "Milton Pilão", role: "CEO, Orizon", note: "TBC" },
      { name: "Waldir Beira Junior", role: "CEO, Ypê" },
      { name: "Aline Matulja", role: "Comunicadora e Ativista", note: "TBC" },
      { name: "Roberto Rocha / Ancat", role: "Representante do Movimento de Catadores", note: "TBC" },
      { name: "Naiá Tupinambá", role: "Liderança Indígena", note: "TBC" },
    ],
    moderator: { name: "Cris Guterres", role: "Jornalista e Membro do Comitê Consultivo, Movimento Conexão Circular" },
  },
  {
    time: "17h20",
    duration: "40 min",
    type: "painel",
    title: "Quem Programa o Futuro?",
    theme: "IA ética e o mundo do trabalho que queremos",
    desc: "Como a inteligência artificial está redesenhando o mercado de trabalho — e o que as empresas devem fazer para garantir que essa transformação seja justa, inclusiva e alinhada à Agenda 2030.",
    points: [
      "IA generativa e o impacto nas ocupações de baixa e média renda",
      "Viés algorítmico, diversidade e equidade no recrutamento",
      "Requalificação profissional: quem paga a conta?",
      "Proteção social na era do trabalho plataformizado",
      "Governança de IA ética no ambiente corporativo",
    ],
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
    duration: "10 min",
    type: "encerramento",
    title: "Encerramento Oficial",
    theme: "Compromissos para a próxima etapa",
    desc: "Considerações finais, síntese dos compromissos assumidos e fechamento oficial da 4ª edição do Fórum Ambição 2030.",
    points: [
      "Síntese dos principais compromissos do dia",
      "Próximos passos da Ambição 2030",
      "Convite à próxima edição",
    ],
  },
  {
    time: "18h10",
    duration: "—",
    type: "encerramento",
    title: "Networking & Coquetel",
    theme: "Conexões que geram impacto",
    desc: "Momento final de relacionamento e conexões qualificadas entre os participantes — onde parcerias começam e compromissos se fortalecem.",
  },
];

function SessionCard({ session, index }: { session: Session; index: number }) {
  const [open, setOpen] = useState(false);
  const config = TYPE_CONFIG[session.type];
  const Icon = config.icon;
  const hasDetails = !!(session.desc || session.points?.length || session.speakers?.length || session.moderator);
  const isInterval = session.type === "intervalo" || session.type === "encerramento";

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.025, duration: 0.35 }}
      className="group"
    >
      <button
        type="button"
        onClick={() => hasDetails && setOpen((o) => !o)}
        aria-expanded={hasDetails ? open : undefined}
        className={`relative w-full overflow-hidden rounded-xl border text-left transition-all duration-200 ${
          open
            ? "border-white/16 bg-white/[0.06]"
            : "border-white/8 bg-white/[0.03] hover:border-white/14 hover:bg-white/[0.05]"
        } ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Left accent bar */}
        <div className={`absolute inset-y-0 left-0 w-[3px] ${config.accent} opacity-70 transition-opacity ${open ? "opacity-100" : "group-hover:opacity-90"}`} />

        <div className="flex items-start gap-0 pl-5 pr-5 py-5 md:pl-7 md:pr-7 md:py-6">
          {/* Time column */}
          <div className="mr-5 shrink-0 md:mr-7">
            <time className="block font-display text-2xl font-black leading-none tracking-tight text-white/50 transition-colors group-hover:text-white/75 md:text-3xl">
              {session.time}
            </time>
            {session.duration && (
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-white/35">
                {session.duration}
              </span>
            )}
          </div>

          {/* Main content */}
          <div className="flex flex-1 items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              {/* Badge */}
              <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.24em] ${config.badge}`}>
                <Icon aria-hidden="true" size={9} strokeWidth={2.5} />
                {config.label}
              </span>

              {/* Title */}
              <h3 className="text-base font-display font-black uppercase leading-tight tracking-tight text-white md:text-lg">
                {session.title}
              </h3>

              {/* Theme */}
              {session.theme && (
                <p className="mt-1.5 text-sm font-medium italic text-white/65 leading-snug">
                  {session.theme}
                </p>
              )}

              {/* Speakers preview (collapsed) */}
              {!isInterval && session.speakers && !open && (
                <p className="mt-3 text-[11px] text-white/48 line-clamp-1 tracking-wide">
                  {session.speakers.map((s) => s.name).join("  ·  ")}
                </p>
              )}
            </div>

            {hasDetails && (
              <ChevronDown
                aria-hidden="true"
                size={16}
                className={`mt-1 shrink-0 text-white/28 transition-all duration-300 ${open ? "rotate-180 text-forum-cyan/70" : ""}`}
              />
            )}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="border-x border-b border-white/12 rounded-b-xl bg-white/[0.05] px-5 pb-6 pt-5 md:px-7 md:pb-8">
              {/* Divider */}
              <div className="mb-5 h-px w-full bg-white/10" />

              {/* Description */}
              {session.desc && (
                <p className="mb-5 text-sm leading-relaxed text-white/82 md:text-[0.94rem]">
                  {session.desc}
                </p>
              )}

              {/* Key topics */}
              {session.points && session.points.length > 0 && (
                <div className="mb-6">
                  <p className={`mb-3 text-[9px] font-black uppercase tracking-[0.32em] ${config.badge.split(" ")[0]}`}>
                    Tópicos em debate
                  </p>
                  <ul className="space-y-2.5">
                    {session.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-white/86 leading-snug">
                        <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${config.accent}`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Speakers */}
              {session.speakers && session.speakers.length > 0 && (
                <div className="mb-4">
                  <p className={`mb-3 text-[9px] font-black uppercase tracking-[0.32em] ${config.badge.split(" ")[0]}`}>
                    {session.type === "keynote" || session.type === "business" ? "Speaker" : "Painelistas"}
                  </p>
                  <ul className={`grid gap-2 ${session.speakers.length > 3 ? "sm:grid-cols-2" : "sm:grid-cols-1 max-w-lg"}`}>
                    {session.speakers.map((s) => (
                      <li
                        key={s.name}
                        className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <div className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${config.accent}`} />
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[13px] font-bold text-white leading-snug">
                              {s.name}
                            </span>
                            {s.note && (
                              <span className={`rounded border px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider ${config.badge.split(" ")[0]} border-current opacity-60`}>
                                {s.note}
                              </span>
                            )}
                          </div>
                          <span className="mt-0.5 block text-[12px] leading-snug text-white/65">
                            {s.role}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Moderator */}
              {session.moderator && (
                <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/50" />
                  <div className="min-w-0">
                    <p className="mb-0.5 text-[9px] font-black uppercase tracking-[0.28em] text-white/50">
                      Moderação
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-bold text-white">
                        {session.moderator.name}
                      </span>
                      {session.moderator.note && (
                        <span className="rounded border border-white/20 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white/50">
                          {session.moderator.note}
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-white/65">{session.moderator.role}</span>
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
        <div className="mb-14">
          <SectionHeader
            eyebrow="02 de Junho de 2026 · MASP · São Paulo"
            title="Programação"
            outline="do Evento"
            description="Selecione qualquer sessão para ver tema, tópicos em debate, painelistas e detalhes."
          />
        </div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap gap-3">
          {(["keynote", "painel", "business", "arte", "estrategia"] as SessionType[]).map((type) => {
            const c = TYPE_CONFIG[type];
            const Icon = c.icon;
            return (
              <span key={type} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] ${c.badge}`}>
                <Icon aria-hidden="true" size={9} strokeWidth={2.5} />
                {c.label}
              </span>
            );
          })}
        </div>

        <div className="space-y-1.5">
          {SESSIONS.map((session, index) => (
            <SessionCard key={`${session.time}-${session.title}`} session={session} index={index} />
          ))}
        </div>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/24">
          Programação sujeita a alterações · TBC = confirmação pendente
        </p>
      </div>
    </section>
  );
}
