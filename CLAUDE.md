# CLAUDE.md — Fórum Ambição 2030

> Leia este arquivo ao iniciar qualquer sessão. Depois acesse `AGENTS.md` para regras completas.
> **Idioma: PT-BR** | ⚠️ Site público — gates agressivos

---

## 🎯 O que é

Site oficial da **4ª edição do Fórum Ambição 2030** — evento do Pacto Global ONU – Rede Brasil.
📅 **02 de junho de 2026 · MASP · São Paulo**
👥 ~1.000 líderes C-level | Tema: "A Década da Implementação"

**Risco principal**: data fixa pública — bug em prod afeta credibilidade do Pacto Global durante o evento.

---

## ⚡ Contexto imediato

1. Leia `AGENTS.md` — regras + approval gates completos
2. Leia `../../../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/_MOC.md` — tese + next actions
3. **Antes de qualquer copy pública**: precisa de aprovação 🔴 (Brener + Monica/Ana)
4. **Identidade visual**: seguir `UN_Global_Compact_Brand_Guidelines.pdf` — obrigatório

---

## 🛠️ Stack

```
Framework: TanStack Start + Vite + TypeScript
Lib UI:    React + Tailwind
Manager:   bun (exceção ao pnpm padrão)
Deploy:    Vercel
```

## 💻 Comandos

```bash
bun install    # bootstrap
bun dev        # dev server
bun build      # build prod
bun typecheck  # type check
```

---

## 🚦 Approval gates (resumo)

| 🔴 Sempre humano | 🟡 Co-aprovação | 🟢 Autônomo |
|---|---|---|
| qualquer copy pública | componente novo | refactor interno |
| painelistas/parceiros | nova dep | fix de bug |
| data/local/horário | mudança de layout visível | testes |
| deploy de produção | formulário/integração | docs internos |

---

## 📄 Docs críticos

```
AGENTS.md           ← regras técnicas completas
UI-REVIEW.md        ← review de UI em andamento
../../../Second-Brain/10-Projetos/10.02-Forum-Ambicao-2030/_MOC.md
```

**Arquivos somente-leitura** (não alterar sem ADR):
- `CONCEPT NOTE _ FÓRUM AMBIÇÃO 2030 - 2026.md`
- `Deck Comercial_Fórum Ambição_2026_V1.pdf`
- `UN_Global_Compact_Brand_Guidelines.pdf`
