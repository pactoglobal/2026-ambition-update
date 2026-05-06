# AGENTS.md — 2026-ambition-update (Forum Ambicao 2030)

> Para qualquer agente que abrir este repo: leia tambem `../AGENTS.md` (topologia geral).
> Idioma: **PT-BR**.

---

## 1. Identidade

- **Repo**: 2026-ambition-update
- **Papel**: site oficial da **4a edicao do Forum Ambicao 2030** — evento anual do Pacto Global da ONU – Rede Brasil. **02 de junho de 2026 · MASP · Sao Paulo**.
- **Tema 2026**: "A Decada da Implementacao: Como as Empresas Estao Redesenhando o Futuro do Brasil"
- **Audiencia esperada**: ~1.000 lideres C-level, sociedade civil, poder publico
- **Stack** (do `package.json`):
  - TanStack Start TS + Vite
  - bun como package manager (excecao a stack default)
  - React + TypeScript
- **Risco principal**: data fixa publica — qualquer bug em prod afeta credibilidade do Pacto Global durante o evento.

## 2. Fonte da verdade no vault

**Sempre leia antes de mexer:**

- `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/_MOC.md`
- `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/Brief.md` (concept note, eixos tematicos, painelistas confirmados)
- `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/Roadmap.md`
- `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/Regras-do-Projeto.md`
- `../Second-Brain/20-Areas/20.01-Pacto-Global-ONU/_MOC.md` (governanca institucional)

**Documentos do repo a respeitar:**

- `CONCEPT NOTE _ FÓRUM AMBIÇÃO 2030 - 2026.md` (concept note oficial)
- `Deck Comercial_Fórum Ambição_2026_V1.pdf` (deck patrocinio)
- `UN_Global_Compact_Brand_Guidelines.pdf` (**OBRIGATORIO** seguir nas cores/tipo/logo)
- `UI-REVIEW.md` (review de UI em curso)

## 3. Rituais de escrita no vault (DRY)

**Regra base**: trabalho agentic via Paperclip → activity log da issue eh canon. Vault nao espelha. Antes de escrever, regra das 3 perguntas (`../AGENTS.md` §4).

| Gatilho | O que escrever | Onde | Template |
|---|---|---|---|
| Mudanca de copy publica (sobrevive a issue) | ADR + diff antes/depois | `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/Decisions/YYYY-MM-DD-copy-<slug>.md` | `T-Decision-Log` |
| Inclusao/remocao de painelista, patrocinador ou parceiro | ADR | mesmo lugar | `T-Decision-Log` |
| Mudanca em data, horario, local | ADR | mesmo lugar | `T-Decision-Log` |
| Sessao **humana** (sem agente Paperclip) ou kickoff de fase | nota | `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/Sessions/` | `T-Session-AI` |
| Post-mortem de bug em producao | sintese | `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/Sessions/YYYY-MM-DD-postmortem-<slug>.md` | livre |
| Aprendizado generalizavel | Permanent | `../Second-Brain/40-Zettelkasten/40.03-Permanent/` | `T-Permanent` |

**O que NAO escrever no vault**: sessao de codigo agentic com issue aberta (activity log serve), espelho de issue.

## 4. Approval gates

Como o site eh **publico em nome do Pacto Global ONU**, gates sao agressivos:

- 🔴 **Sempre humano (Brener + Monica/Ana se for institucional)**:
  - **Qualquer** mudanca de copy publica
  - Inclusao/remocao de logo de parceiro, patrocinador ou apoio
  - Inclusao/remocao de nome de painelista
  - Mudanca de data, horario ou local
  - Deploy para producao
  - Mudanca em `UN_Global_Compact_Brand_Guidelines` ou desvio dos guidelines
  - Adicao de qualquer formulario que colete dado pessoal (LGPD)

- 🟡 **Co-aprovacao**:
  - Mudanca de UI sem alterar copy nem logos
  - Refactor de componentes
  - Adicao de pacote npm
  - Mudanca em CI / deploy pipeline
  - Mudanca em `vite.config` ou config de build

- 🟢 **Autonomo**:
  - Refactor sem mudanca visual nem de comportamento
  - Adicao de testes
  - Fix de typo em codigo (NAO em copy publica — copy passa pelo gate)
  - Atualizacao de dependencias **patch** (x.y.Z) com `bun update`
  - Atualizacao de docs internos (UI-REVIEW.md, Readme.txt)

Matriz completa: `../Second-Brain/20-Areas/20.06-Empresa-Zero-Humanos/Playbooks/Approval-Gate-Matrix.md`

## 5. LGPD / privacidade

- **Qualquer** formulario que colete dado pessoal (nome, email, CPF, telefone) precisa:
  - Texto de consentimento explicito
  - Politica de privacidade publicada
  - Aprovacao do juridico do Pacto Global antes do deploy
  - Storage seguro (Supabase com RLS, nao S3 publico)
- **Captura de imagem do evento**: precisa contrato de cessao com painelistas + aviso publico no site.

## 6. Brand guidelines (UN Global Compact)

Antes de QUALQUER mudanca visual, abrir `UN_Global_Compact_Brand_Guidelines.pdf` e validar:
- Cores oficiais (azul UN + paleta secundaria)
- Logo: nunca esticar, nunca recolorir, sempre com clear space
- Tipografia: respeitar hierarquia
- Combinacao com logo Pacto Global – Rede Brasil

Se a guideline nao cobrir o caso especifico, **gate 🔴**: pergunta ao Brener antes de criar precedente.

## 7. Comandos canonicos

```bash
# Bootstrap (este repo usa bun, nao pnpm)
bun install

# Dev
bun run dev          # vite dev

# Build
bun run build        # vite build
bun run build:dev    # build em modo dev (debug)

# Preview de prod
bun run preview
```

## 8. Secrets

- Provavelmente API key de algum servico (analytics, mailer, formulario). Validar `package.json` quando precisar.
- `.env` no `.gitignore` (verificar).
- LGPD: nao logar dado pessoal em console nem em logs de servidor.

## 9. Commits

- PT-BR. Conventional commits.
- Ex: `feat(landing): adicionar secao de painelistas`
- Antes de push para producao: SEMPRE pedir aprovacao explicita do Brener.

## 10. Linka

- Topologia: `../AGENTS.md`
- Vault MOC: `../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/_MOC.md`
- Pacto Global Area: `../Second-Brain/20-Areas/20.01-Pacto-Global-ONU/_MOC.md`
