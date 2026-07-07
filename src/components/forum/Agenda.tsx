import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown, Mic, Users, Coffee, Star, Music, Award, ArrowRight, Building2, Zap,
} from "lucide-react";
import { SectionHeader } from "./Identity";
import { identityAssets } from "./identity-assets";
import { photoByArtist, photoBySpeaker } from "../../lib/photos";

type SessionType = "abertura" | "keynote" | "painel" | "business" | "intervalo" | "arte" | "estrategia" | "encerramento" | "debatable" | "firechat";

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
  opener?: Speaker;
  speakers?: Speaker[];
  moderator?: Speaker;
  jurados?: Speaker[];
}

// Colors aligned with Pacto Global ONU brand + ODS palette
const TYPE_CONFIG: Record<SessionType, {
  label: string;
  borderColor: string;   // Tailwind border class
  tagBg: string;         // tag pill background
  tagText: string;       // tag pill text
  dot: string;           // bullet dot color
  icon: React.ElementType;
}> = {
  abertura:    { label: "Abertura",      borderColor: "border-l-forum-cyan",    tagBg: "bg-forum-cyan/15",    tagText: "text-forum-cyan",    dot: "bg-forum-cyan",    icon: Star },
  keynote:     { label: "Keynote",       borderColor: "border-l-forum-gold",    tagBg: "bg-forum-gold/15",    tagText: "text-forum-gold",    dot: "bg-forum-gold",    icon: Mic },
  painel:      { label: "Painel",        borderColor: "border-l-[#23b9d6]",     tagBg: "bg-[#23b9d6]/12",     tagText: "text-[#23b9d6]",     dot: "bg-[#23b9d6]",     icon: Users },
  business:    { label: "Business Case", borderColor: "border-l-forum-green",   tagBg: "bg-forum-green/12",   tagText: "text-forum-green",   dot: "bg-forum-green",   icon: Award },
  intervalo:   { label: "Intervalo",     borderColor: "border-l-white/20",      tagBg: "bg-white/8",          tagText: "text-white/45",      dot: "bg-white/30",      icon: Coffee },
  arte:        { label: "Apresentação",  borderColor: "border-l-forum-magenta", tagBg: "bg-forum-magenta/12", tagText: "text-forum-magenta", dot: "bg-forum-magenta", icon: Music },
  estrategia:  { label: "Estratégia",    borderColor: "border-l-forum-cyan",    tagBg: "bg-forum-cyan/15",    tagText: "text-forum-cyan",    dot: "bg-forum-cyan",    icon: ArrowRight },
  encerramento:{ label: "Encerramento",  borderColor: "border-l-white/25",      tagBg: "bg-white/6",          tagText: "text-white/40",      dot: "bg-white/30",      icon: Star },
  debatable:   { label: "Debatable",     borderColor: "border-l-forum-gold",    tagBg: "bg-forum-gold/12",    tagText: "text-forum-gold",    dot: "bg-forum-gold",    icon: Users },
  firechat:    { label: "Firechat",      borderColor: "border-l-forum-magenta", tagBg: "bg-forum-magenta/10", tagText: "text-forum-magenta", dot: "bg-forum-magenta", icon: Zap },
};

// Extracted to module scope to avoid re-creating the array on every render
const LEGEND_TYPES: SessionType[] = ["keynote", "painel", "business", "arte", "estrategia", "debatable"];

const SESSIONS: Session[] = [
  {
    time: "09h15",
    type: "arte",
    title: "Apresentação Artística",
    speakers: [
      { name: "Diego Carneiro", title: "Violoncelista" },
    ],
  },
  {
    time: "09h25",
    type: "abertura",
    title: "Vídeo Apresentação Movimentos Pacto Global da ONU - Rede Brasil",
  },
  {
    time: "09h30",
    type: "abertura",
    title: "Abertura",
    speakers: [
      { name: "Guilherme Xavier", title: "Diretor Executivo", org: "Pacto Global - Rede Brasil" },
      { name: "Ana Paula Carracedo", title: "Presidente do Conselho", org: "Pacto Global - Rede Brasil" },
      { name: "Luciana Nicola", title: "Vice-Presidente do Conselho", org: "Pacto Global - Rede Brasil" },
    ],
  },
  {
    time: "09h45",
    duration: "15 min",
    type: "keynote",
    title: "Keynote Speaker",
    theme: "Evolução dos ODS e Sistema ONU",
    speakers: [
      { name: "Maristela Baioni", title: "Coordenadora de Programa", org: "PNUD" },
    ],
  },
  {
    time: "10h15",
    duration: "30 min",
    type: "painel",
    title: "Da Extração à Regeneração",
    theme: "Novos caminhos para a gestão de recursos naturais",
    desc: "Como empresas e movimentos sociais constroem juntos a transição para modelos regenerativos — da economia circular à gestão responsável de resíduos e recursos naturais.",
    points: [
      "Economia circular como modelo de negócio lucrativo",
      "Gestão de resíduos sólidos e responsabilidade estendida",
      "Comunidades tradicionais e saberes ancestrais na regeneração",
      "Catadores como agentes da economia circular",
      "Métricas de impacto ambiental e social integradas",
    ],
    speakers: [
      { name: "Marilia Garcez", title: "Diretora de economia circular, comunicação e sustentabilidade", org: "Orizon" },
      { name: "Edison Carlos", title: "Presidente", org: "Instituto AEGEA" },
      { name: "Aline Matulja", title: "Engenheira e Comunicadora Ambiental", org: "Instituto para Futuros Locais" },
    ],
    moderator: { name: "Emília Bizzoto", title: "Jornalista" },
  },
  {
    time: "10h45",
    duration: "40 min",
    type: "painel",
    title: "Transição Energética: Oportunidade ou Obrigação?",
    theme: "O Brasil diante da nova economia",
    desc: "Debate sobre os caminhos concretos da transição energética no Brasil — quem financia, quem regula e quem implementa.",
    points: [
      "Financiamento climático e papel dos bancos de desenvolvimento",
      "Regulação e política industrial verde no Brasil",
      "Cooperação UE–Brasil e oportunidades de mercado",
      "Casos concretos de implementação de energias renováveis",
    ],
    speakers: [
      { name: "Miguel Castro", title: "Ponto Focal Latam, Centro CER", org: "OCDE" },
      { name: "Michelle Fernandes Vieira", title: "Superintendente de Negócios de Impacto e Sustentabilidade", org: "Caixa" },
      { name: "Rafaela Guedes", title: "CEO e Fundadora & Senior Fellow", org: "RG Impact & CEBRI" },
    ],
    moderator: { name: "Sofia Schuck", title: "Jornalista", org: "Exame" },
  },
  {
    time: "11h25",
    duration: "20 min",
    type: "keynote",
    title: "Keynote Speaker",
    theme: "Financiamento Sustentável",
    speakers: [
      { name: "Adriana Albanese", title: "Diretora Relações com Investidores e Sustentabilidade", org: "Aegea" },
    ],
  },
  {
    time: "11h45",
    duration: "40 min",
    type: "painel",
    title: "Rastreabilidade na Cadeia de Valor",
    opener: { name: "Renato Maia Lopes", title: "Diretor jurídico de governança corporativa, riscos e compliance", org: "CBA" },
    theme: "Onde compliance e direitos humanos se encontram",
    desc: "Como empresas estão transformando suas cadeias produtivas para garantir integridade, rastreabilidade e respeito aos direitos humanos.",
    points: [
      "Due diligence em direitos humanos: da teoria à prática",
      "Tecnologia e rastreabilidade na cadeia produtiva",
      "Compliance socioambiental como critério de parceria",
      "Trabalho digno e certificações internacionais",
    ],
    speakers: [
      { name: "Clarice Coppetti", title: "Diretora Executiva de Assuntos Corporativos", org: "Petrobras" },
      { name: "Irina Bacci", title: "Diretora Técnica", org: "Fundação Pan-Americana para o Desenvolvimento (PADF)" },
      { name: "Ana Cristina Rosa Garcia", title: "Vice-presidenta Corporativa", org: "Banco do Brasil" },
      { name: "Maria Luiza Pinto", title: "Vice-presidente Executiva de Gente e Gestão, Sustentabilidade, Comunicação e Marca", org: "Suzano" },
    ],
    moderator: { name: "Joyce Ribeiro", title: "Jornalista" },
  },
  {
    time: "12h25",
    duration: "2h",
    type: "intervalo",
    title: "Almoço",
    desc: "Pausa estratégica para networking qualificado entre lideranças de diferentes setores.",
  },
  {
    time: "14h30",
    duration: "20 min",
    type: "keynote",
    title: "Keynote Speaker",
    theme: "Liderança com saúde mental e significado",
    desc: "Como líderes podem sustentar alta performance sem abrir mão do propósito e do bem-estar — uma perspectiva prática para os desafios da Década da Implementação.",
    speakers: [
      { name: "Alexandre Coimbra", title: "Psicólogo, escritor best-seller, palestrante e consultor em saúde mental corporativa" },
    ],
  },
  {
    time: "14h50",
    duration: "30 min",
    type: "painel",
    title: "Protagonismo sem fronteiras: Recomeços que Inspiram",
    speakers: [
      { name: "Danielle Suzuki", title: "Apoiadora de Alto Perfil", org: "ACNUR" },
      { name: "Risett Campos" },
      { name: "Fernando Viriato", title: "Vice-Presidente Sênior de Talento e Cultura", org: "Accor Américas" },
    ],
    moderator: { name: "Victor Boyadjian", title: "Jornalista" },
  },
  {
    time: "15h20",
    duration: "60 min",
    type: "estrategia",
    title: "Estratégia Ambição 2030",
    theme: "Novos compromissos, metas e reconhecimento",
    desc: "Highlights do novo Relatório da Ambição 2030, novas metas dos Movimentos, lançamento do Estudo do Salário Digno e do Guia Saúde Mental e Futuro do Trabalho.",
    points: [
      "Highlights do novo Relatório da Ambição 2030",
      "Novas metas dos movimentos e novo nome do Movimento Impacto Biomas",
      "Lançamento do Estudo do Salário Digno e do Guia Saúde Mental e Futuro do Trabalho",
      "Menção aos Hubs ODS e Multiplicadores",
      "Reconhecimento das empresas que bateram as metas",
      "Agradecimento das empresas embaixadoras",
    ],
    speakers: [
      { name: "Mônica Gregori", title: "Diretora de Impacto", org: "Pacto Global - Rede Brasil" },
    ],
  },
  {
    time: "16h10",
    duration: "20 min",
    type: "keynote",
    title: "Keynote Speaker",
    speakers: [
      { name: "Aretha Duarte" },
    ],
  },
  {
    time: "16h30",
    type: "debatable",
    title: "Debatable",
    theme: "Os ODS são o melhor framework para ação coletiva",
    speakers: [
      { name: "Daniel Bento Teixeira", title: "Diretor Executivo", org: "CEERT – Centro de Estudos das Relações do Trabalho e Desigualdades" },
      { name: "Fabiana Costa", title: "Head de Sustentabilidade", org: "Bradesco" },
      { name: "Rodrigo Santini", title: "Diretor de Impacto e Relações", org: "Mars Brasil" },
      { name: "Sonia Chapman", title: "Diretora Executiva", org: "Rede Empresarial Brasileira de Avaliação de Ciclo de Vida (Rede ACV)" },
      { name: "Patrícia Acioli", title: "Diretora de Comunicação e Sustentabilidade", org: "Scania Group" },
      { name: "Leandro Machado", title: "Sócio-fundador", org: "CAUSE" },
    ],
    jurados: [
      { name: "Bruna Helena Barros", title: "Conselheira da Plataforma de Ação Colaborativa", org: "Fundação BMW" },
      { name: "Edson Higo", title: "CEO", org: "AYA Earth Partners" },
      { name: "Juliana Silva", title: "Diretora de Sustentabilidade", org: "Motiva" },
    ],
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
      { name: "Joice Portella", title: "Diretora de Sustentabilidade, Parcerias e Carreiras", org: "Yduqs" },
      { name: "Vivian Broge", title: "Vice Presidente de RH e MKT", org: "TOTVS" },
      { name: "Daniel Duque", title: "Pesquisador de Economia Aplicada", org: "FGV/Ibre" },
      { name: "Vinicius Pinheiro", title: "Diretor", org: "OIT no Brasil" },
    ],
    moderator: { name: "Ana Bavon", title: "Consultora", org: "Ana Bavon Strategic Consulting" },
  },
  {
    time: "18h",
    duration: "20 min",
    type: "arte",
    title: "Atração Artística",
    theme: "Cultura como expressão da Década da Implementação",
    desc: "Encerramento cultural da programação — arte integrada à agenda de sustentabilidade como expressão dos valores e da força do Fórum Ambição 2030.",
    speakers: [
      { name: "Céu", title: "Cantora e Compositora Brasileira" },
    ],
  },
  {
    time: "18h20",
    type: "encerramento",
    title: "Encerramento",
  },
  {
    time: "18h30",
    type: "encerramento",
    title: "Momento de Networking // Coquetel",
  },
];

function SpeakerCard({ speaker, index }: { speaker: Speaker; index: number }) {
  const photo = photoBySpeaker(speaker.name);
  return (
    <li className="flex items-start gap-3 rounded-xl border border-white/10 bg-forum-navy/60 p-4 backdrop-blur-sm">
      {photo ? (
        <img
          src={photo}
          alt={speaker.name}
          width={40}
          height={40}
          className="mt-0.5 h-10 w-10 shrink-0 rounded-full object-cover object-top ring-1 ring-white/20"
        />
      ) : (
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/8 text-[10px] font-black text-white/50">
          {index + 1}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[13px] font-bold leading-snug text-white">{speaker.name}</p>
        {speaker.title && (
          <p className="mt-0.5 text-[11px] leading-snug text-white/58">{speaker.title}</p>
        )}
        {speaker.org && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <Building2 aria-hidden="true" size={9} className="shrink-0 text-forum-cyan/60" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forum-cyan/75">
              {speaker.org}
            </span>
          </div>
        )}
      </div>
    </li>
  );
}

function ModeratorCard({ moderator }: { moderator: Speaker }) {
  const photo = photoBySpeaker(moderator.name);
  return (
    <div className="flex items-center gap-4 rounded-xl border border-forum-cyan/30 bg-forum-cyan/8 px-5 py-4">
      {photo ? (
        <img
          src={photo}
          alt={moderator.name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover object-top ring-1 ring-forum-cyan/30"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-forum-cyan/30 bg-forum-cyan/15">
          <Mic aria-hidden="true" size={16} className="text-forum-cyan" strokeWidth={1.8} />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-[9px] font-black uppercase tracking-[0.38em] text-forum-cyan/80">
          Moderação
        </p>
        <p className="text-[14px] font-bold leading-snug text-white">{moderator.name}</p>
        {moderator.title && (
          <p className="mt-0.5 text-[12px] leading-snug text-white/60">{moderator.title}</p>
        )}
        {moderator.org && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <Building2 aria-hidden="true" size={9} className="shrink-0 text-forum-cyan/55" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-forum-cyan/65">
              {moderator.org}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function ArteFeatureRow({ session, index }: { session: Session; index: number }) {
  const cfg = TYPE_CONFIG[session.type];
  const artist = session.speakers?.[0];
  const photo = artist ? photoByArtist(artist.name) : undefined;

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ delay: index * 0.02, duration: 0.38 }}
      className={`relative border-l-[4px] ${cfg.borderColor} overflow-hidden`}
    >
      <div className="flex items-stretch bg-forum-navy/40">
        {/* Time block */}
        <div className="flex w-24 shrink-0 flex-col justify-center border-r border-white/8 px-4 py-5 md:w-28 md:px-5">
          <time className="block font-display text-xl font-black leading-none tracking-tight text-white md:text-2xl">
            {session.time}
          </time>
          {session.duration && (
            <span className="mt-1.5 block text-[9px] font-bold uppercase tracking-widest text-white/35">
              {session.duration}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 items-center gap-5 px-5 py-5 md:px-7">
          <div className="min-w-0 flex-1">
            <span className={`mb-2.5 inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.28em] ${cfg.tagBg} ${cfg.tagText}`}>
              <Music aria-hidden="true" size={8} strokeWidth={2.5} />
              {cfg.label}
            </span>
            <h3 className="text-[15px] font-bold leading-snug tracking-tight text-white md:text-base">
              {session.title}
            </h3>
            {session.theme && (
              <p className="mt-1 text-[12px] leading-snug text-white/52 md:text-[13px]">{session.theme}</p>
            )}
            {artist && (
              <div className="mt-3 flex items-center gap-3">
                {photo && (
                  <img
                    src={photo}
                    alt={artist.name}
                    width={300}
                    height={300}
                    className="h-12 w-12 rounded-full border-2 border-forum-magenta/40 object-cover object-top"
                  />
                )}
                <div>
                  <p className={`text-[13px] font-black uppercase tracking-tight ${cfg.tagText}`}>
                    {artist.name}
                  </p>
                  {artist.title && (
                    <p className="text-[11px] text-white/55">{artist.title}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Large photo on desktop */}
          {photo && (
            <div className="hidden shrink-0 overflow-hidden rounded-xl md:block">
              <img
                src={photo}
                alt={artist?.name ?? "Atração Artística"}
                width={300}
                height={300}
                className="h-28 w-28 object-cover object-top lg:h-32 lg:w-32"
              />
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function SessionRow({ session, index }: { session: Session; index: number }) {
  const [open, setOpen] = useState(false);
  const cfg = TYPE_CONFIG[session.type];
  const Icon = cfg.icon;
  const opener = session.opener;
  const confirmedSpeakers = session.speakers?.filter((s) => !s.note) ?? [];
  const confirmedModerator = session.moderator?.note ? undefined : session.moderator;
  const confirmedJurados = session.jurados?.filter((s) => !s.note) ?? [];
  const hasDetails = !!(session.desc || session.points?.length || opener || confirmedSpeakers.length || confirmedModerator || confirmedJurados.length);
  const isBreak = session.type === "intervalo" || session.type === "encerramento";
  const speakerLabel = session.type === "keynote" || session.type === "business" ? "Speaker" : "Painelistas";

  return (
    <motion.article
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ delay: index * 0.02, duration: 0.38 }}
    >
      {/* Row header */}
      <button
        type="button"
        onClick={() => hasDetails && setOpen((o) => !o)}
        aria-expanded={hasDetails ? open : undefined}
        className={`group relative w-full border-l-[4px] text-left transition-colors duration-200 ${cfg.borderColor} ${
          open
            ? "bg-forum-navy/80"
            : "bg-forum-navy/40 hover:bg-forum-navy/65"
        } ${hasDetails ? "cursor-pointer" : "cursor-default"}`}
      >
        <div className="flex items-stretch">
          {/* Time block */}
          <div className="flex w-24 shrink-0 flex-col justify-center border-r border-white/8 px-4 py-5 md:w-28 md:px-5">
            <time className="block font-display text-xl font-black leading-none tracking-tight text-white md:text-2xl">
              {session.time}
            </time>
            {session.duration && (
              <span className="mt-1.5 block text-[9px] font-bold uppercase tracking-widest text-white/35">
                {session.duration}
              </span>
            )}
          </div>

          {/* Content block */}
          <div className="flex flex-1 items-center justify-between gap-4 px-5 py-5 md:px-7">
            <div className="min-w-0 flex-1">
              {/* Type tag */}
              <span className={`mb-2.5 inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.28em] ${cfg.tagBg} ${cfg.tagText}`}>
                <Icon aria-hidden="true" size={8} strokeWidth={2.5} />
                {cfg.label}
              </span>

              {/* Title */}
              <h3 className="text-[15px] font-bold leading-snug tracking-tight text-white md:text-base">
                {session.title}
              </h3>

              {/* Theme */}
              {session.theme && !isBreak && (
                <p className="mt-1 text-[12px] leading-snug text-white/52 md:text-[13px]">
                  {session.theme}
                </p>
              )}

              {/* Collapsed speaker preview — confirmed only, with title */}
              {!isBreak && !open && (confirmedSpeakers.length > 0 || confirmedModerator) && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {confirmedSpeakers.map((s) => (
                    <span key={s.name} className="inline-flex items-baseline gap-1.5 rounded-sm border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] leading-tight">
                      <span className="font-bold text-white/75">{s.name}</span>
                      {s.title && <span className="text-white/35">{s.title}{s.org ? ` · ${s.org}` : ""}</span>}
                    </span>
                  ))}
                  {confirmedModerator && (
                    <span className="inline-flex items-center gap-1.5 rounded-sm border border-forum-cyan/20 bg-forum-cyan/8 px-2.5 py-1 text-[10px] leading-tight">
                      <Mic aria-hidden="true" size={8} strokeWidth={2.5} className="shrink-0 text-forum-cyan/70" />
                      <span className="font-bold text-forum-cyan/80">{confirmedModerator.name}</span>
                      {confirmedModerator.title && <span className="text-forum-cyan/45">{confirmedModerator.title}</span>}
                    </span>
                  )}
                </div>
              )}
            </div>

            {hasDetails && (
              <ChevronDown
                aria-hidden="true"
                size={15}
                className={`shrink-0 text-white/25 transition-all duration-300 ${open ? "rotate-180 text-forum-cyan/60" : ""}`}
              />
            )}
          </div>
        </div>
      </button>

      {/* Expanded panel */}
      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            key="expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className={`border-l-[4px] ${cfg.borderColor} border-b border-r border-white/8 bg-forum-ink/60 px-5 pb-7 pt-5 md:pl-[calc(7rem+1.75rem)] md:pr-8`}>

              {session.desc && (
                <p className="mb-5 max-w-2xl text-[13px] leading-relaxed text-white/72 md:text-sm">
                  {session.desc}
                </p>
              )}

              {session.points && session.points.length > 0 && (
                <div className="mb-6">
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.38em] text-white/32">
                    Tópicos em debate
                  </p>
                  <ul className="space-y-1.5">
                    {session.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[13px] leading-snug text-white/75">
                        <span className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${cfg.dot}`} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {opener && (
                <div className="mb-5">
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.38em] text-white/32">
                    Abertura
                  </p>
                  <ul className="max-w-xs">
                    <SpeakerCard speaker={opener} index={0} />
                  </ul>
                </div>
              )}

              {/* Speaker grid */}
              {confirmedSpeakers.length > 0 && (
                <div className={confirmedModerator ? "mb-3" : ""}>
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.38em] text-white/32">
                    {speakerLabel}
                  </p>
                  <ul className={`grid gap-2 ${confirmedSpeakers.length > 1 ? "sm:grid-cols-2" : "max-w-xs"}`}>
                    {confirmedSpeakers.map((s, i) => (
                      <SpeakerCard key={s.name} speaker={s} index={i} />
                    ))}
                  </ul>
                </div>
              )}

              {confirmedModerator && (
                <div className="mt-3 max-w-sm">
                  <ModeratorCard moderator={confirmedModerator} />
                </div>
              )}

              {confirmedJurados.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 text-[9px] font-black uppercase tracking-[0.38em] text-white/32">
                    Jurados
                  </p>
                  <ul className={`grid gap-2 ${confirmedJurados.length > 1 ? "sm:grid-cols-2" : "max-w-xs"}`}>
                    {confirmedJurados.map((s, i) => (
                      <SpeakerCard key={s.name} speaker={s} index={i} />
                    ))}
                  </ul>
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
    <section id="agenda" className="relative overflow-hidden bg-forum-deep py-24">
      {/* KV background — subtle */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={identityAssets.kv}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forum-deep via-forum-deep/95 to-forum-deep" />
      </div>

      <div className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            eyebrow="02 de Junho de 2026 · MASP · São Paulo"
            title="Programação"
            outline="do Evento"
            description="Clique em qualquer sessão para ver tema, tópicos em debate, painelistas e detalhes."
          />
        </div>

        {/* Legend */}
        <div className="mb-6 flex flex-wrap gap-2">
          {LEGEND_TYPES.map((type) => {
            const c = TYPE_CONFIG[type];
            const Ic = c.icon;
            return (
              <span
                key={type}
                className={`inline-flex items-center gap-1.5 rounded-sm border border-white/8 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.24em] ${c.tagBg} ${c.tagText}`}
              >
                <Ic aria-hidden="true" size={8} strokeWidth={2.5} />
                {c.label}
              </span>
            );
          })}
        </div>

        {/* Session list — sharp institutional rows */}
        <div className="overflow-hidden rounded-xl border border-white/10">
          <div className="divide-y divide-white/8">
            {SESSIONS.map((session, index) =>
              session.type === "arte" ? (
                <ArteFeatureRow
                  key={`${session.time}-${session.title}`}
                  session={session}
                  index={index}
                />
              ) : (
                <SessionRow
                  key={`${session.time}-${session.title}`}
                  session={session}
                  index={index}
                />
              )
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-[9px] font-bold uppercase tracking-[0.32em] text-white/20">
          Programação sujeita a alterações
        </p>
      </div>
    </section>
  );
}
