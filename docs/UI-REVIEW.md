# UI Review — 4º Fórum Ambição 2030 (2026)

**Auditado em:** 04 de maio de 2026  
**Base:** Auditoria de código + screenshots do servidor de desenvolvimento  
**Screenshots:** Não capturados para este projeto (servidor na porta 5173 não estava rodando; porta 3000 pertencia a outro projeto)  
**Stack:** React 19, TypeScript, TanStack Router, Tailwind CSS v4, Framer Motion, shadcn/ui

---

## Sumário de Pontuações

| Pilar | Score | Achado Principal |
|-------|-------|------------------|
| 1. Visual Design | 7/10 | Identidade forte, mas inconsistências de sistema entre seções |
| 2. UX / Fluxo | 6/10 | Navegação funcional, mas CTA "Participar" aponta para FAQ e ID duplicado quebra âncoras |
| 3. Acessibilidade | 4/10 | Zero `aria-label` em botões interativos, `<button>` sem `type`, roles ausentes |
| 4. Performance / Animações | 6/10 | Uso correto de `transform`/`opacity`, mas `height: auto` no FAQ e imagens sem dimensões |
| 5. Responsividade | 7/10 | Layout responsivo bem estruturado, porém logos no Hero colapsam mal em mobile |
| 6. Anti-template | 8/10 | Design claramente intencional e com identidade própria — acima da média do ecossistema shadcn |

**Total: 38/60**

---

## Top 3 Correções Prioritárias

1. **ID duplicado `"local"` nos componentes `EventInfo` e `Venue`** — O link "Como Chegar" no Hero e o item de scroll-spy nunca levam o usuário ao mapa correto, pois dois elementos disputam o mesmo ID. Impacto: jornada de conversão quebrada. Correção: renomear `EventInfo` para `id="info-evento"` e ajustar o scroll-spy na Navbar para incluir `"local"` corretamente.

2. **CTA "Participar" (Navbar e drawer mobile) aponta para `#faq`** — Um botão de chamada para ação principal que leva à seção de dúvidas é uma inconsistência grave de UX. O usuário espera um formulário de inscrição ou uma ação concreta. Impacto: taxa de conversão comprometida. Correção: criar uma seção `id="inscricao"` ou apontar para o formulário de contato/RSVP real.

3. **Ausência total de `aria-label` em botões interativos** — Nenhum `<button>` ou `<motion.button>` nos 16 componentes tem `aria-label`. Os controles do carousel de Speakers, Agenda tabs, FAQ accordion e botão de hambúrguer da Navbar são inacessíveis para usuários de leitores de tela. Impacto: evento institucional de uma ONU sem conformidade básica de acessibilidade. Correção: adicionar `aria-label` em todos os botões de controle de carousel, accordion, menu e CTAs.

---

## Achados Detalhados

### Pilar 1: Visual Design (7/10)

**Achados positivos:**

- Sistema de design bem estabelecido com tokens OKLCH em `styles.css` cobrindo toda a paleta UNGC, cores de marca (`brand-deep`, `brand-teal`, `brand-lightblue`) e tipografia customizada (fonte Flama com três pesos, Lora como serif de suporte).
- A estratégia visual dark com `#05101f` como base cria profundidade e diferencia o evento do site institucional do Pacto Global.
- Uso consistente de `font-black` + `uppercase` + `tracking-tighter` cria uma voz tipográfica reconhecível nos títulos das seções (Agenda, Speakers, FAQ, Stats).
- A técnica de `WebkitTextStroke` para o efeito de texto vazado nos títulos de seção é uma escolha editorial acima do padrão de templates.
- Stats e EventInfo têm bom ritmo visual com ícones circularizados e cards com bordas semitransparentes.

**Problemas encontrados:**

- **Inconsistência de sistema entre seções:** `Venue.tsx` usa `text-ungc-blue` (cor azul clara) em um fundo escuro, enquanto todas as outras seções usam `text-white`. O título "Local do Evento" em `Venue.tsx` linha 8 (`text-ungc-blue`) ficará praticamente invisível no fundo `bg-brand-deep`.
- **Contact.tsx diverge completamente do sistema visual** (linhas 1-54): usa `text-foreground`, `bg-card/60`, `border-ungc-tone3/30` e `text-muted-foreground` — classes de modo claro — numa página inteiramente escura. Esses tokens apontam para `#1E3250` no modo claro mas `#FFFFFF` no escuro, e sem classe `.dark` aplicada ao body, o Contact ficará com fundo de card quase idêntico ao fundo da página.
- **Footer usa `backgroundColor: "#1E3250"` inline** (Footer.tsx linha 6) em vez do token `bg-ungc-blue` do sistema. Duplicação desnecessária e fora do padrão.
- **Gallery.tsx título** usa `text-ungc-blue` (linha 71) sobre fundo `bg-brand-deep/20` — mesmo problema de contraste do Venue.
- **11 tamanhos de fonte distintos** em uso (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl) — excede a escala recomendada de máximo 6 níveis para uma landing page.

**Recomendações:**
- Corrigir `Venue.tsx` e `Gallery.tsx`: substituir `text-ungc-blue` por `text-white` nos títulos.
- Refatorar `Contact.tsx` para usar os tokens do tema escuro (`text-white`, `bg-white/5`, `border-white/10`) como nas demais seções.
- Substituir `style={{ backgroundColor: "#1E3250" }}` no Footer por `className="bg-ungc-blue"`.
- Consolidar a escala tipográfica: eliminar `text-6xl` e `text-7xl` do Hero ou documentá-los como exclusivos da seção hero.

---

### Pilar 2: UX / Fluxo (6/10)

**Achados positivos:**

- Scroll-spy na Navbar com `setActiveSection` (Navbar.tsx linhas 25-36) funciona com `passive: true` — boa prática.
- Estrutura da página segue uma progressão lógica: Hero → Info do evento → Sobre → Estatísticas → Speakers → Agenda → Natureza/Conexão → Público → Galeria → Local → FAQ → Patrocinadores → Contato.
- Scroll indicator animado no Hero orienta o usuário sem ser invasivo.
- FAQ accordion com `AnimatePresence` oferece experiência fluida de expansão/colapso.
- EventInfo apresenta data, horário e local imediatamente após o Hero — responde às três principais dúvidas de um evento logo na entrada.

**Problemas encontrados:**

- **CTA principal "Participar" (Navbar.tsx linha 119, linha 180) aponta para `#faq`** em vez de um mecanismo de inscrição. Para um evento exclusivo para convidados, faz sentido ter um CTA que direcione para o formulário ou contato RSVP.
- **ID duplicado `"local"`** existe em `EventInfo.tsx` (linha 13) e `Venue.tsx` (linha 5). O navegador resolve para o primeiro elemento encontrado no DOM, então `document.getElementById("local")` sempre encontrará EventInfo e nunca o mapa do Venue. O Hero tem um botão "Como Chegar" que aponta para `#local` — este link está quebrado na prática.
- **Navbar inclui apenas 4 links** (O Evento, Speakers, Agenda, FAQ), omitindo seções importantes como Galeria, Patrocinadores e Contato. Usuários que chegam diretamente numa âncora não têm como navegar de volta a essas seções pela navbar.
- **Speakers carousel** não tem indicação de quantos speakers existem além dos visíveis — os dots de navegação (linha 160-168) não têm `aria-label` e nem indicação visual de qual está ativo.
- **Galeria (Gallery.tsx)** tem ícone `Maximize2` nas imagens (linha 146) que sugere uma ação de ampliar/lightbox, mas não há implementação de lightbox — o clique não faz nada.

**Recomendações:**
- Redirecionar o CTA "Participar" para `#contato` com âncora direta ao e-mail RSVP, ou criar uma seção de inscrição/lista de espera.
- Renomear `id="local"` em `EventInfo` para `id="info-evento"`.
- Implementar lightbox básico na Gallery ou remover o ícone `Maximize2` para não criar expectativa falsa.
- Adicionar "Galeria" e "Contato" nos links da Navbar ou no drawer mobile.

---

### Pilar 3: Acessibilidade (4/10)

**Achados positivos:**

- Fonte Flama tem `font-display: swap` declarado corretamente (styles.css linhas 9, 16, 24) — evita FOIT.
- Imagens decorativas usam `alt=""` corretamente (NaturePatchwork.tsx linha 43 — globo de fundo).
- `<main>` está presente em index.tsx envolvendo o conteúdo principal.
- Scroll handler da Navbar usa `{ passive: true }` (Navbar.tsx linha 39).
- iFrame do mapa tem `allowFullScreen` e `loading="lazy"`.

**Problemas encontrados:**

- **Zero `aria-label` em toda a codebase** de componentes forum. O grep por `aria-label` retornou vazio. Isso afeta:
  - Botão hambúrguer da Navbar (Navbar.tsx linha 128): sem label — leitor de tela anuncia apenas "botão".
  - Botão de fechar drawer (linha 157): sem label.
  - Controles prev/next do carousel de Speakers (linhas 82-97): sem label.
  - Controles prev/next da Gallery (linhas 89-104): sem label.
  - Dots de paginação do Speakers (linhas 160-168): sem label — "Ir para slide N" não está descrito.
  - Botão de accordion do FAQ (Faq.tsx linha 64): sem `aria-expanded`.
- **Nenhum `<button>` tem `type="button"`** — Em formulários ou páginas com `<form>`, botões sem type se tornam `submit` por padrão, podendo causar comportamento inesperado.
- **Semântica de navegação ausente:** `<nav>` em Navbar.tsx não tem `aria-label="Navegação principal"`. Páginas com múltiplas regiões de navegação precisam ser rotuladas.
- **FAQ accordion** não tem `aria-expanded` no botão (Faq.tsx linha 64) nem `aria-controls` relacionando o botão ao painel que controla — requisito do padrão ARIA Disclosure.
- **Tabs da Agenda** (Agenda.tsx linhas 41-54): usa `<button>` sem `role="tab"`, `aria-selected` ou `aria-controls`. Não respeita o padrão ARIA Tabs.
- **Contraste potencialmente insuficiente:** `text-white/40` (40% de opacidade sobre `#05101f`) resulta em aproximadamente `#667` sobre `#05101f` — provavelmente abaixo do ratio 4.5:1 exigido para WCAG AA em textos pequenos. Afeta labels de seção em Hero, Footer e Sponsors.

**Recomendações (por ordem de impacto):**
1. Adicionar `aria-label="Abrir menu"` / `aria-label="Fechar menu"` no hambúrguer + `aria-expanded={mobileOpen}`.
2. Adicionar `aria-expanded` e `aria-controls` no accordion FAQ.
3. Converter tabs da Agenda para padrão ARIA (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`).
4. Adicionar `aria-label="Slide anterior"` e `aria-label="Próximo slide"` nos controles de carousel.
5. Adicionar `type="button"` em todos os `<button>` que não são de submissão.
6. Revisar contraste de `text-white/40` — considerar `text-white/60` como mínimo para labels de suporte.

---

### Pilar 4: Performance / Animações (6/10)

**Achados positivos:**

- Todas as animações usam exclusivamente `opacity`, `transform` (`y`, `x`, `scale`, `rotate`) e `filter` (blur em elementos de fundo) — compositor-friendly, não causam layout thrashing.
- `whileInView` com `viewport={{ once: true }}` está consistentemente aplicado, evitando re-animações a cada scroll.
- O scroll handler da Navbar usa `{ passive: true }` — não bloqueia o thread principal.
- Imagens do carrossel têm `draggable={false}` para evitar comportamento padrão que interferiria no drag do Embla.
- `staggerChildren` no Hero é razoável (0.18s) e não atrasa o LCP.

**Problemas encontrados:**

- **`height: "auto"` animado no FAQ (Faq.tsx linha 89):** Framer Motion lida com isso via JavaScript de medição, mas animar `height` não é compositor-friendly e causa layout recalculations. Para um accordion, o custo é aceitável mas existe — alternativa: `clip-path` ou `scaleY` com `overflow: hidden`.
- **Imagens do carousel de Speakers** (Speakers.tsx linhas 116-119) e Gallery (Gallery.tsx linha 131-134) não têm `width` e `height` explícitos — causa CLS (Cumulative Layout Shift) enquanto as imagens carregam, penalizando o CLS.
- **Todas as imagens do Speakers e Gallery são do Unsplash** (15 URLs externas no total). Em produção com imagens reais dos speakers, sem `width`/`height` ou `aspect-ratio` inline, haverá CLS.
- **Venue gallery** carrega imagens de `/img/venue-gallery/venue-gallery-{1-4}.jpg` com `loading="lazy"` corretamente, mas não tem `width` e `height` declarados.
- **`will-change` não está sendo usado** — aceitável, pois já existem animações only em `transform`/`opacity`.
- **Autoplay no carousel de Speakers** (delay 4000ms) pode ser problemático para usuários com `prefers-reduced-motion`. Não há checagem de `useReducedMotion` em nenhum componente.
- **`scale: 1.1` no Hero** (Hero.tsx linha 22) durante 2 segundos na imagem de fundo pode ser notado como movimento não solicitado por usuários sensíveis.

**Recomendações:**
1. Adicionar `width` e `height` (ou `aspect-ratio` via Tailwind) em todas as tags `<img>` dos carousels para eliminar CLS.
2. Implementar `useReducedMotion` (ou criar hook) para desabilitar autoplay e animações de entrada em respeito à preferência do usuário — alinhado com a regra `web/performance.md`.
3. Considerar substituir `height: "auto"` no FAQ por animação via `clip-path` para eliminar o único ponto de layout animation.

---

### Pilar 5: Responsividade (7/10)

**Achados positivos:**

- Layout principal do Hero usa `flex-col lg:flex-row` com gap gerenciado — transição limpa entre mobile e desktop.
- Drawer mobile bem implementado com `motion.div` em slide from right + backdrop.
- EventInfo usa `grid-cols-1 md:grid-cols-3` — colapso gracioso.
- Stats usa `grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4` — escalonamento adequado.
- Venue usa `grid-cols-1 lg:grid-cols-2` com `h-[400px]` fixo no mapa para evitar colapso.

**Problemas encontrados:**

- **Logos no Hero em mobile** (Hero.tsx linhas 49-61): o bloco `absolute top-8 right-6` com "Realização" e "Patrocínio Master" fica sobreposto ao conteúdo principal em telas < 375px. O conteúdo central tem `pt-32` mas os logos absolutos não têm um breakpoint para desaparecer ou reposicionar em telas muito pequenas.
- **`w-[85vw]` no drawer mobile** (Navbar.tsx linha 155) é correto, mas o conteúdo interno com `p-10` pode apertar em iPhone SE (375px) — 85% de 375px = 319px minus 80px de padding = 239px úteis para texto de `text-2xl font-black`.
- **NaturePatchwork** (NaturePatchwork.tsx linha 20): usa `grid-cols-2 lg:grid-cols-4`. Em tablet (768px), 2 colunas para fotos + 1 célula de branding resulta em grid com célula órfã na segunda linha em telas médias, já que são 4 elementos totais em grid de 2.
- **Sponsors** (Sponsors.tsx linhas 10-32): `flex-col md:flex-row` funciona, mas o divisor vertical `hidden md:block absolute right-0` coexiste com um divisor horizontal `block md:hidden absolute bottom-0` — ambos usam `absolute`, o que pode criar sobreposições na transição de breakpoints exatos.
- **Gallery carousel** com `w-[80vw]` em mobile: em iPhone SE, 80vw = 300px. Funcional, mas sem padding interno os títulos de imagem no hover ficam tight.

**Recomendações:**
1. Em Hero, adicionar `hidden sm:flex` ou mover os logos de realização para dentro do fluxo do documento em mobile, posicionando-os abaixo do CTA.
2. Revisar NaturePatchwork para `grid-cols-2 md:grid-cols-4` em vez de usar `lg:` como breakpoint do grid de 4 colunas.

---

### Pilar 6: Anti-template (8/10)

**Achados positivos:**

- O projeto claramente não é um template padrão shadcn/Tailwind. Tem identidade própria construída em cima da marca UNGC.
- A escolha de fundo `#05101f` (mais escuro que o `#1E3250` padrão do UNGC) cria profundidade e drama adequados para um evento de alto nível.
- Fonte customizada Flama (fonte institucional do UNGC/Pacto Global) é uma escolha correta e diferenciada — não usa o stack de sistema.
- Técnicas editoriais como `WebkitTextStroke` para texto vazado em títulos de seção são escolhas deliberadas, não defaults.
- O componente NaturePatchwork com grid 2×2 + célula de branding e sobreposição circular é inventivo.
- Carousel de Speakers com grayscale → colorido no hover é uma interação elegante com propósito.
- Scroll indicator animado no Hero com mouse e bolinha pulsante evita o clichê de "seta genérica".
- Stats com ícones que giram 360° no hover é um detalhe de polimento acima do esperado.

**Problemas encontrados:**

- **Contact.tsx é o único componente que parece um template shadcn** (linhas 1-54): usa `rounded-2xl border border-ungc-tone3/30 bg-card/60 p-6` com tokens semânticos de shadcn. Contrasta visualmente com o restante da página.
- **About.tsx** (linhas 1-35) é três parágrafos de texto corrido sem nenhum elemento visual, sem decoração, sem contraponto visual. É funcionalmente válido mas não tem a mesma energia do restante da página.
- **Speakers usam fotos do Unsplash de pessoas genéricas** — nomes reais (Guilherme Xavier, Adriana Albanese, Oliver Stuenkel) com rostos de banco de imagem. Em produção, isso pode gerar reação negativa se o evento for público. Em dev é aceitável mas deve ser sinalizado.
- **Todos os links sociais dos speakers apontam para `"#"`** — em um evento institucional real, isso diminui a percepção de acabamento.

---

## Inconsistências de Sistema Identificadas

| Problema | Arquivo | Linha | Correção |
|----------|---------|-------|---------|
| `id="local"` duplicado | EventInfo.tsx | 13 | Renomear para `id="info-evento"` |
| `id="local"` duplicado | Venue.tsx | 5 | Manter como destino de "Como Chegar" |
| `text-ungc-blue` em fundo escuro | Gallery.tsx | 71 | `text-white` |
| `text-ungc-blue` em fundo escuro | Venue.tsx | 8 | `text-white` |
| `backgroundColor: "#1E3250"` hardcoded | Footer.tsx | 6 | `className="bg-ungc-blue"` |
| `#1E3250` hardcoded em style | Gallery.tsx | 74 | Usar token via CSS var |
| CTA "Participar" aponta para `#faq` | Navbar.tsx | 119, 180 | Apontar para `#contato` ou seção RSVP |
| Tokens de modo claro em página escura | Contact.tsx | 24, 25, 29, 41 | Usar classes `text-white`, `bg-white/5` |

---

## Arquivos Auditados

- `src/styles.css` — Design tokens, paleta, tipografia
- `src/forum-overrides.css` — Overrides pontuais (mínimos)
- `src/routes/index.tsx` — Composição da página, meta tags
- `src/components/forum/Hero.tsx`
- `src/components/forum/Navbar.tsx`
- `src/components/forum/EventInfo.tsx`
- `src/components/forum/About.tsx`
- `src/components/forum/Stats.tsx`
- `src/components/forum/Speakers.tsx`
- `src/components/forum/Agenda.tsx`
- `src/components/forum/NaturePatchwork.tsx`
- `src/components/forum/Audience.tsx`
- `src/components/forum/Gallery.tsx`
- `src/components/forum/Venue.tsx`
- `src/components/forum/Faq.tsx`
- `src/components/forum/Sponsors.tsx`
- `src/components/forum/Contact.tsx`
- `src/components/forum/Footer.tsx`
- `src/components/forum/AnimatedSection.tsx`
