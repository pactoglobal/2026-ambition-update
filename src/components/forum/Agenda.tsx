import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mic, Users, Coffee, Star, Music, Award, ArrowRight, Building2 } from "lucide-react";
import { KineticBackdrop, SectionHeader } from "./Identity";

type SessionType = "abertura" | "keynote" | "painel" | "business" | "intervalo" | "arte" | "estrategia" | "encerramento";

interface Speaker {
  name: string;
  title?: string;
  org?: string;
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

const TYPE_CONFIG: Record<SessionType, { label: string; accent: string; accentText: string; badge: string; icon: React.ElementType }> = {
  abertura:    { label: "Abertura",      accent: "bg-forum-cyan",    accentText: "text-forum-cyan",    badge: "text-forum-cyan  border-forum-cyan/30  bg-forum-cyan/8",      icon: Star },
  keynote:     { label: "Keynote",       accent: "bg-forum-gold",    accentText: "text-forum-gold",    badge: "text-forum-gold  border-forum-gold/30  bg-forum-gold/8",      icon: Mic },
  painel:      { label: "Painel",        accent: "bg-forum-blue",    accentText: "text-forum-blue",    badge: "text-forum-blue  border-forum-blue/30  bg-forum-blue/8",      icon: Users },
  business:    { label: "Business Case", accent: "bg-forum-green",   accentText: "text-forum-green",   badge: "text-forum-green border-forum-green/30 bg-forum-green/8",     icon: Award },
  intervalo:   { label: "Intervalo",     accent: "bg-white/20",      accentText: "text-white/40",      badge: "text-white/40    border-white/12        bg-white/4",           icon: Coffee },
  arte:        { label: "Apresentação",  accent: "bg-forum-magenta", accentText: "text-forum-magenta", badge: "text-forum-magenta border-forum-magenta/30 bg-forum-magenta/8", icon: Music },
  estrategia:  { label: "Estratégia",    accent: "bg-forum-cyan",    accentText: "text-forum-cyan",    badge: "text-forum-cyan  border-forum-cyan/30  bg-forum-cyan/8",      icon: ArrowRight },
  encerramento:{ label: "Encerramento",  accent: "bg-white/30",      accentText: "text-white/50",      badge: "text-white/50    border-white/16        bg-white/5",           icon: Star },
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
      { name: "Guilherme Xavier", title: "Diretor Executivo", org: "Pacto Global – Rede Brasil" },
      { name: "Presidente do Conselho", title: "Presidente do Conselho", org: "Pacto Global – Rede Brasil" },
      { name: "Coordenador Residente", title: "Coordenador Residente do Sistema ONU", org: "ONU Brasil" },
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
      { name: "Avanish Sahai", title: "Keynote Speaker", note: "TBC" },
    ],
  },
  {
    time: "10h10",
    duration: "50 min",
    type: "painel",
    title: "Transição Energética: Oportunidade ou Obrigação?",
    theme: "O Brasil diante da nova economia de baixo carbono",
    desc: "Debate sobre os caminhos concretos da transição energética no Brasil — quem financia, quem regula e quem implementa.",
    points: [
      "Financiamento climático e papel dos bancos de desenvolvimento",
      "Regulação e política industrial verde no Brasil",
      "Cooperação UE–Brasil e oportunidades de mercado",
      "Casos concretos de implementação de energias renováveis",
    ],
    speakers: [
      { name: "Rafaela Guedes", org: "CEBRI" },
      { name: "Marian Schuegraf", title: "Chefe da Delegação", org: "União Europeia no Brasil", note: "TBC" },
      { name: "Carlos Carboni", title: "Diretor de Cooperação", org: "Itaipu Binacional", note: "TBC" },
      { name: "Manuel Reyes-Retana", title: "Diretor", org: "IFC Brasil", note: "TBC" },
    ],
    moderator: { name: "Giovana Girardi", title: "Jornalista", org: "Estadão", note: "TBC" },
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
      { name: "Alexandre Coimbra", title: "Consultor de Saúde Mental e Escritor", org: "Valor Econômico · TV Globo" },
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
      { name: "Malu Pinto", title: "VP Executiva de Gente, Gestão, Sustentabilidade e Comunicação", org: "Suzano" },
      { name: "Ricardo Wagner", title: "Diretor de Compliance", org: "Petrobras", note: "TBC" },
      { name: "Irina Bacci", org: "PADF", note: "TBC" },
      { name: "Waleria Sampaio", title: "Gerente Executiva de Estratégia e Governança de Sustentabilidade", note: "TBC" },
      { name: "Vinicius Pinheiro", org: "OIT – Organização Internacional do Trabalho", note: "TBC" },
    ],
    moderator: { name: "Caco Barcelos", title: "Jornalista", note: "TBC" },
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
      { name: "Adriana Albanese", title: "Diretora de Sustentabilidade", org: "Aegea" },
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
    duration: "20 min",
    type: "painel",
    title: "Protagonismo sem Fronteiras",
    theme: "Entre o palco e o mundo: quando arte e ativismo se encontram",
    desc: "A agenda de gênero em tempos de crise — como artistas e ativistas amplificam causas urgentes e transformam a narrativa pública sobre igualdade e representatividade.",
    points: [
      "Arte como instrumento de transformação social e política",
      "Ativismo e protagonismo feminino na cena pública",
      "Representatividade e visibilidade como alavancas de mudança",
    ],
    speakers: [
      { name: "Camila Pitanga", title: "Atriz e Embaixadora", org: "ONU Mulheres", note: "TBC" },
      { name: "Fernanda Torres", title: "Atriz", note: "TBC" },
      { name: "Maria Prata", title: "Escritora e Roteirista", note: "TBC" },
    ],
  },
  {
    time: "14h50",
    duration: "30 min",
    type: "painel",
    title: "Protagonismo sem Fronteiras",
    theme: "Recomeços que inspiram e lideram",
    desc: "Trajetórias reais de superação e liderança — como diversidade, inclusão e recomeços são forças estratégicas para as organizações e para a sociedade.",
    points: [
      "Diversidade na liderança: metas, dados e accountability",
      "Inclusão de pessoas refugiadas no mercado de trabalho",
      "Trajetórias de recomeço como modelo de resiliência organizacional",
    ],
    speakers: [
      { name: "Dani Suzuki", title: "Atriz e Ativista", note: "TBC" },
      { name: "Pessoa Refugiada", title: "Trajetória de superação e recomeço" },
      { name: "Fernando Viriato", title: "VP Sênior de Talento e Cultura", org: "Accor Américas", note: "TBC" },
    ],
    moderator: { name: "Maria Prata", title: "Escritora e Roteirista", note: "TBC" },
  },
  {
    time: "15h10",
    duration: "60 min",
    type: "estrategia",
    title: "Estratégia Ambição 2030",
    theme: "Novos compromissos, metas e reconhecimento",
    desc: "Highlights do novo Relatório da Ambição 2030, novas metas dos Movimentos, lançamento do Estudo do Salário Digno e do Guia Saúde Mental e Futuro do Trabalho.",
    points: [
      "Highlights do novo Relatório da Ambição 2030",
      "Novas metas dos 10 Movimentos e novo nome do Movimento Impacto Biomas",
      "Lançamento: Estudo do Salário Digno",
      "Lançamento: Guia Saúde Mental e Futuro do Trabalho",
      "Menção aos Hubs ODS e Multiplicadores",
      "Reconhecimento das empresas que bateram metas",
      "Agradecimento às Empresas Embaixadoras",
    ],
    speakers: [
      { name: "Mônica Gregori", title: "Diretora de Impacto", org: "Pacto Global – Rede Brasil" },
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
      { name: "Waldir Beira Junior", title: "CEO", org: "Ypê" },
      { name: "Jera Guarani", title: "Liderança Indígena" },
      { name: "Milton Pilão", title: "CEO", org: "Orizon", note: "TBC" },
      { name: "Aline Matulja", title: "Comunicadora e Ativista", note: "TBC" },
    ],
    moderator: { name: "Cris Guterres", title: "Jornalista e Membro do Comitê Consultivo", org: "Movimento Conexão Circular" },
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
      { name: "Vivian Broge", org: "TOTVS" },
      { name: "Claudia Romano", title: "VP", org: "Yduqs", note: "TBC" },
      { name: "Daniel Duque", title: "Pesquisador", org: "FGV", note: "TBC" },
      { name: "Gilson Rodrigues", title: "Fundador", org: "G10 Favelas", note: "TBC" },
      { name: "Nina da Hora", title: "Pesquisadora e Ativista em Tecnologia", note: "TBC" },
    ],
    moderator: { name: "Ana Bavon", title: "CEO e Head de Estratégia", org: "Ana Bavon Strategic Consulting" },
  },
  {
    time: "18h00",
    duration: "20 min",
    type: "arte",
    title: "Atração Artística",
    theme: "Cultura como expressão da Década da Implementação",
    desc: "Encerramento cultural da programação — arte integrada à agenda de sustentabilidade como expressão dos valores e da força do Fórum Ambição 2030.",
  },
  {
    time: "18h20",
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
    time: "18h30",
    duration: "—",
    type: "encerramento",
    title: "Networking & Coquetel",
    theme: "Conexões que geram impacto",
    desc: "Momento final de relacionamento e conexões qualificadas entre os participantes — onde parcerias começam e compromissos se fortalecem.",
  },
];

function SpeakerCard({ speaker, index, accentText }: { speaker: Speaker; index: number; accentText: string }) {
  return (
    <li className="group/card relative flex flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-200 hover:border-white/18 hover:bg-white/[0.07]">
      {/* Number badge */}
      <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/8 text-[9px] font-black text-white/35">
        {index + 1}
      </span>

      {/* Name */}
      <div className="pr-6">
        <p className="text-[14px] font-bold leading-snug tracking-tight text-white">
          {speaker.name}
        </p>
        {speaker.title && (
          <p className="mt-1 text-[12px] leading-snug text-white/60">
            {speaker.title}
          </p>
        )}
      </div>

      {/* Org pill */}
      {speaker.org && (
        <div className="flex items-center gap-1.5">
          <Building2 aria-hidden="true" size={9} className={`shrink-0 ${accentText} opacity-70`} />
          <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accentText} opacity-80`}>
            {speaker.org}
          </span>
        </div>
      )}
    </li>
  );
}

function ModeratorCard({ moderator }: { moderator: Speaker }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-forum-cyan/25 bg-forum-cyan/[0.07] px-5 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forum-cyan/30 bg-forum-cyan/12">
        <Mic aria-hidden="true" size={15} className="text-forum-cyan" strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-[9px] font-black uppercase tracking-[0.36em] text-forum-cyan/80">
          Moderação
        </p>
        <p className="text-[14px] font-bold leading-snug text-white">{moderator.name}</p>
        {moderator.title && (
          <p className="mt-0.5 text-[12px] leading-snug text-white/60">{moderator.title}</p>
        )}
        {moderator.org && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <Building2 aria-hidden="true" size={9} className="shrink-0 text-forum-cyan/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-forum-cyan/70">
              {moderator.org}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function SessionCard({ session, index }: { session: Session; index: number }) {
  const [open, setOpen] = useState(false);
  const config = TYPE_CONFIG[session.type];
  const Icon = config.icon;
  const confirmedSpeakers = session.speakers?.filter((s) => !s.note) ?? [];
  const confirmedModerator = session.moderator?.note ? undefined : session.moderator;
  const hasDetails = !!(session.desc || session.points?.length || confirmedSpeakers.length || confirmedModerator);
  const isInterval = session.type === "intervalo" || session.type === "encerramento";
  const speakerLabel = session.type === "keynote" || session.type === "business" ? "Speaker" : "Painelistas";
  const useGrid = confirmedSpeakers.length > 1;

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
        <div className={`absolute inset-y-0 left-0 w-[3px] ${config.accent} opacity-70 transition-opacity ${open ? "opacity-100" : "group-hover:opacity-90"}`} />

        <div className="flex items-start py-5 pl-5 pr-5 md:py-6 md:pl-7 md:pr-7">
          {/* Time column */}
          <div className="mr-5 w-16 shrink-0 md:mr-7 md:w-20">
            <time className="block font-display text-2xl font-black leading-none tracking-tight text-white/50 transition-colors group-hover:text-white/75 md:text-3xl">
              {session.time}
            </time>
            {session.duration && (
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-white/30">
                {session.duration}
              </span>
            )}
          </div>

          {/* Main content */}
          <div className="flex flex-1 items-start justify-between gap-4 min-w-0">
            <div className="min-w-0 flex-1">
              <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.24em] ${config.badge}`}>
                <Icon aria-hidden="true" size={9} strokeWidth={2.5} />
                {config.label}
              </span>

              <h3 className="text-base font-display font-black uppercase leading-tight tracking-tight text-white md:text-lg">
                {session.title}
              </h3>

              {session.theme && (
                <p className="mt-1.5 text-sm font-medium italic leading-snug text-white/58">
                  {session.theme}
                </p>
              )}

              {/* Collapsed preview */}
              {!isInterval && !open && (confirmedSpeakers.length > 0 || confirmedModerator) && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {confirmedSpeakers.length > 0 && (
                    <p className="text-[11px] tracking-wide text-white/42 line-clamp-1">
                      {confirmedSpeakers.map((s) => s.name).join("  ·  ")}
                    </p>
                  )}
                  {confirmedModerator && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-forum-cyan/20 bg-forum-cyan/8 px-2.5 py-0.5 text-[10px] font-bold text-forum-cyan/75">
                      <Mic aria-hidden="true" size={8} strokeWidth={2.5} />
                      {confirmedModerator.name}
                    </span>
                  )}
                </div>
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
            <div className="rounded-b-xl border-x border-b border-white/12 bg-white/[0.04] px-5 pb-7 pt-5 md:px-7 md:pb-8">
              <div className="mb-5 h-px w-full bg-white/8" />

              {session.desc && (
                <p className="mb-6 text-sm leading-relaxed text-white/75 md:text-[0.94rem]">
                  {session.desc}
                </p>
              )}

              {session.points && session.points.length > 0 && (
                <div className="mb-7">
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.36em] text-white/35">
                    Tópicos em debate
                  </p>
                  <ul className="space-y-2">
                    {session.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-[13px] leading-snug text-white/78">
                        <span className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${config.accent}`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Speaker bento grid */}
              {confirmedSpeakers.length > 0 && (
                <div className={confirmedModerator ? "mb-3" : ""}>
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.36em] text-white/35">
                    {speakerLabel}
                  </p>
                  <ul className={`grid gap-2 ${useGrid ? "sm:grid-cols-2" : "max-w-sm"}`}>
                    {confirmedSpeakers.map((s, i) => (
                      <SpeakerCard
                        key={s.name}
                        speaker={s}
                        index={i}
                        accentText={config.accentText}
                      />
                    ))}
                  </ul>
                </div>
              )}

              {confirmedModerator && (
                <div className="mt-3">
                  <ModeratorCard moderator={confirmedModerator} />
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

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        <div className="mb-14">
          <SectionHeader
            eyebrow="02 de Junho de 2026 · MASP · São Paulo"
            title="Programação"
            outline="do Evento"
            description="Clique em qualquer sessão para expandir tema, tópicos em debate, painelistas e detalhes."
          />
        </div>

        {/* Legend */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          {(["keynote", "painel", "business", "arte", "estrategia"] as SessionType[]).map((type) => {
            const c = TYPE_CONFIG[type];
            const Ic = c.icon;
            return (
              <span key={type} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] ${c.badge}`}>
                <Ic aria-hidden="true" size={9} strokeWidth={2.5} />
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

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/22">
          Programação sujeita a alterações
        </p>
      </div>
    </section>
  );
}
