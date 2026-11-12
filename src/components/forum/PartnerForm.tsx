import { motion } from "framer-motion";
import { ArrowRight, Check, Download, Mail, Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { KineticBackdrop, SectionHeader } from "./Identity";
import { identityAssets } from "./identity-assets";
import { NEXT_EDITION, PARTNER_CONTACT, PARTNER_TERM_URL } from "./edition";

const BENEFITS = [
  { title: "Visibilidade", desc: "Posicionamento em ambiente institucional de alto nível." },
  { title: "Relacionamento", desc: "Acesso à alta liderança e a formadores de opinião." },
  { title: "Conexão", desc: "Networking com empresas que lideram a implementação sustentável." },
  { title: "Mídia", desc: "Destaque em veículos nacionais e visibilidade espontânea." },
  { title: "Influência", desc: "Participação ativa na construção da agenda de sustentabilidade." },
];

const INTERESTS = ["Patrocínio", "Apoio institucional", "Parceria de conteúdo", "Outro"];

type FieldName = "nome" | "empresa" | "cargo" | "email" | "telefone" | "interesse" | "mensagem";
type Errors = Partial<Record<FieldName | "consentimento", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const text = (name: FieldName) => String(data.get(name) ?? "").trim();

  if (!text("nome")) errors.nome = "Informe seu nome.";
  if (!text("empresa")) errors.empresa = "Informe a empresa.";
  if (!text("cargo")) errors.cargo = "Informe seu cargo.";
  if (!EMAIL_PATTERN.test(text("email"))) errors.email = "Informe um e-mail válido.";
  if (!data.get("consentimento")) errors.consentimento = "É preciso autorizar o contato.";
  return errors;
}

/**
 * Monta o e-mail para o contato de parcerias. O site é estático e não tem
 * serviço de formulário: o envio abre o cliente de e-mail de quem preenche,
 * com a mensagem pronta. Nenhum dado passa por servidor do site.
 */
function buildMailto(data: FormData): string {
  const value = (name: FieldName) => String(data.get(name) ?? "").trim() || "—";
  const subject = `Seja parceiro · ${NEXT_EDITION.ordinal} Fórum Ambição 2030 · ${value("empresa")}`;
  const body = [
    `Nome: ${value("nome")}`,
    `Empresa: ${value("empresa")}`,
    `Cargo: ${value("cargo")}`,
    `E-mail: ${value("email")}`,
    `Telefone: ${value("telefone")}`,
    `Interesse: ${value("interesse")}`,
    "",
    value("mensagem"),
  ].join("\n");

  return `mailto:${PARTNER_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const inputClass =
  "w-full rounded-lg border border-white/14 bg-forum-ink/40 px-4 py-3 text-sm text-white placeholder:text-white/50 transition-colors focus:border-forum-sky focus:outline-none focus:ring-2 focus:ring-forum-sky/30 aria-[invalid=true]:border-forum-red";

function Field({
  name,
  label,
  error,
  required,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={`parceiro-${name}`}
        className="text-[10px] font-black uppercase tracking-[0.22em] text-white/70"
      >
        {label}
        {required ? <span className="text-forum-sky"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`parceiro-${name}-erro`} className="text-xs font-bold text-forum-red">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function PartnerForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const found = validate(data);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(`parceiro-${first}`)?.focus();
      return;
    }

    window.location.href = buildMailto(data);
    setSent(true);
  };

  const fieldProps = (name: FieldName) => ({
    id: `parceiro-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `parceiro-${name}-erro` : undefined,
    className: inputClass,
  });

  return (
    <section id="seja-parceiro" className="forum-surface relative overflow-hidden py-24 lg:py-32">
      <KineticBackdrop image="lineField" glow="center" />

      <div className="relative z-10 mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <AnimatedSection>
            <SectionHeader
              eyebrow={`Seja parceiro · ${NEXT_EDITION.label}`}
              title="Seja"
              outline="parceiro"
              description="Empresas que lideram a agenda de sustentabilidade constroem autoridade, não apenas reputação."
            />

            <ul className="mt-10 space-y-5">
              {BENEFITS.map(({ title, desc }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-forum-sky/20 text-forum-sky">
                    <Check aria-hidden="true" size={14} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block font-display font-black uppercase tracking-tight text-white">
                      {title}
                    </span>
                    <span className="mt-1 block text-sm text-white/74">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Realização + o espaço do patrocinador da 5ª edição, em aberto. */}
            <div className="mt-12 grid grid-cols-2 gap-3">
              <div className="forum-card flex min-h-[150px] flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 text-center">
                <p className="text-[9px] font-black uppercase tracking-[0.26em] text-forum-sky">
                  Realização
                </p>
                <img
                  src={identityAssets.pacto}
                  alt="Pacto Global da ONU – Rede Brasil"
                  width={800}
                  height={864}
                  loading="lazy"
                  className="h-20 w-auto object-contain opacity-90"
                />
              </div>
              <a
                href="#parceiro-nome"
                onClick={(event) => {
                  event.preventDefault();
                  const field = document.getElementById("parceiro-nome");
                  field?.scrollIntoView({ behavior: "smooth", block: "center" });
                  field?.focus({ preventScroll: true });
                }}
                className="group flex min-h-[150px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-forum-sky/60 bg-forum-sky/5 px-4 py-6 text-center transition-colors hover:border-forum-sky hover:bg-forum-sky/10"
              >
                <p className="text-[9px] font-black uppercase tracking-[0.26em] text-forum-sky">
                  Patrocínio · {NEXT_EDITION.label}
                </p>
                <span className="font-display text-xl font-black uppercase leading-tight tracking-tight text-white">
                  Seja patrocinador
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/76 transition-colors group-hover:text-white">
                  Sua marca aqui
                  <ArrowRight aria-hidden="true" size={12} />
                </span>
              </a>
            </div>
          </AnimatedSection>

          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="forum-glass rounded-2xl p-6 sm:p-9"
          >
            {sent ? (
              <div role="status" className="flex min-h-[420px] flex-col justify-center gap-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forum-sky/15 text-forum-sky">
                  <Mail aria-hidden="true" className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <p className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-white">
                  Mensagem pronta no seu e-mail
                </p>
                <p className="text-base leading-relaxed text-white/72">
                  Abrimos seu aplicativo de e-mail com os dados preenchidos — é só enviar. Se nada
                  abriu, escreva direto para{" "}
                  <a
                    href={`mailto:${PARTNER_CONTACT.email}`}
                    className="font-bold text-forum-sky underline-offset-4 hover:underline"
                  >
                    {PARTNER_CONTACT.email}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="w-fit text-[10px] font-black uppercase tracking-widest text-white/72 transition-colors hover:text-white"
                >
                  Voltar ao formulário
                </button>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="flex flex-col gap-5">
                <div>
                  <p className="font-display text-2xl font-black uppercase tracking-tight text-white">
                    Manifeste seu interesse
                  </p>
                  <p className="mt-2 text-sm text-white/74">
                    Nossa equipe de parcerias retorna com as cotas e contrapartidas da{" "}
                    {NEXT_EDITION.label}.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field name="nome" label="Nome" required error={errors.nome}>
                    <input {...fieldProps("nome")} type="text" autoComplete="name" />
                  </Field>
                  <Field name="empresa" label="Empresa" required error={errors.empresa}>
                    <input {...fieldProps("empresa")} type="text" autoComplete="organization" />
                  </Field>
                  <Field name="cargo" label="Cargo" required error={errors.cargo}>
                    <input {...fieldProps("cargo")} type="text" autoComplete="organization-title" />
                  </Field>
                  <Field name="email" label="E-mail corporativo" required error={errors.email}>
                    <input {...fieldProps("email")} type="email" autoComplete="email" />
                  </Field>
                  <Field name="telefone" label="Telefone">
                    <input {...fieldProps("telefone")} type="tel" autoComplete="tel" />
                  </Field>
                  <Field name="interesse" label="Interesse">
                    <select {...fieldProps("interesse")} defaultValue={INTERESTS[0]}>
                      {INTERESTS.map((option) => (
                        <option key={option} value={option} className="bg-forum-deep">
                          {option}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field name="mensagem" label="Mensagem">
                  <textarea
                    {...fieldProps("mensagem")}
                    rows={4}
                    placeholder="Conte o que sua empresa busca com a parceria."
                  />
                </Field>

                <div className="flex flex-col gap-2">
                  <label className="flex items-start gap-3 text-sm leading-snug text-white/72">
                    <input
                      id="parceiro-consentimento"
                      name="consentimento"
                      type="checkbox"
                      aria-invalid={errors.consentimento ? true : undefined}
                      aria-describedby={
                        errors.consentimento ? "parceiro-consentimento-erro" : undefined
                      }
                      className="mt-0.5 h-4 w-4 shrink-0 accent-forum-sky"
                    />
                    Autorizo o Pacto Global da ONU – Rede Brasil a usar estes dados apenas para
                    contato sobre parcerias com o Fórum Ambição 2030, conforme a LGPD.
                  </label>
                  {errors.consentimento ? (
                    <p
                      id="parceiro-consentimento-erro"
                      className="text-xs font-bold text-forum-red"
                    >
                      {errors.consentimento}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-forum-action px-8 py-4 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_18px_45px_rgba(74,122,168,0.35)] transition-colors hover:bg-forum-action-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Enviar interesse
                    <Send aria-hidden="true" size={14} strokeWidth={2.5} />
                  </button>
                  {PARTNER_TERM_URL ? (
                    <a
                      href={PARTNER_TERM_URL}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white transition-colors hover:border-forum-sky hover:text-forum-sky"
                    >
                      <Download aria-hidden="true" size={14} />
                      Baixar o termo
                    </a>
                  ) : null}
                </div>

                <p className="border-t border-white/10 pt-5 text-xs text-white/72">
                  Prefere falar direto? {PARTNER_CONTACT.name}, {PARTNER_CONTACT.role.toLowerCase()}
                  :{" "}
                  <a
                    href={`mailto:${PARTNER_CONTACT.email}`}
                    className="font-bold text-forum-sky underline-offset-4 hover:underline"
                  >
                    {PARTNER_CONTACT.email}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
