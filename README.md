# Top Soluções e Serviços — site

Site institucional (Home, Serviços, Contato) implementado a partir do design
`Top Solucoes - Site.dc.html` do projeto **"Aguardando dados da empresa"** no
Claude Design, seguindo a Prancha visual que está na pasta acima.

## Rodando

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # tsc -b && vite build → dist/
npm test         # vitest
```

## Stack

Vite 7 · React 19 · TypeScript · React Router 7 · Tailwind 4 · Vitest.

Sem `tailwind.config.js`: os tokens da Prancha visual (paleta, tipografia,
sombras) ficam em `src/index.css`, no bloco `@theme`. Os padrões que o design
repete — botões, cartões, campos, escala tipográfica fluida — são classes de
componente no mesmo arquivo (`@layer components`).

## Onde mexer no conteúdo

`src/content/site.ts` concentra **todo** o texto do site, os dados de contato e
as opções dos selects. Nenhuma cópia vive dentro dos componentes.

## Pendências do cliente

O projeto de design se chama "Aguardando dados da empresa" porque esses campos
nunca foram informados. Todos estão em `PENDENTE`, em `src/content/site.ts`, e
aparecem na tela com sublinhado tracejado:

| Campo | Onde aparece |
| --- | --- |
| Cidade / região atendida | hero da Home, FAQ da Home, rodapé, página de contato |
| E-mail | rodapé e página de contato |
| Horário de atendimento | rodapé e página de contato |

Além disso:

- **Confirmar o telefone.** O design trouxe `+55 66 9698-5354` — 8 dígitos
  depois do DDD, formato de fixo. Se for celular/WhatsApp, falta um 9. É o
  destino de **todos** os CTAs do site; conferir antes de publicar.
  Um único lugar para corrigir: `CONTATO`, em `src/content/site.ts`.
- **Fotos.** Todas as áreas de imagem são marcadores hachurados
  (`<MediaSlot>`), com a legenda do que entra em cada uma e a proporção certa.
  Nenhuma foto de banco de imagens foi usada.
- **Depoimentos e "antes e depois".** A seção existe e está reservada, vazia de
  propósito — nada foi inventado.
- **Política de Privacidade e Termos de Uso.** No rodapé, sem link enquanto os
  textos não existirem.
- **Domínio.** `index.html` não tem `og:url` nem `og:image`, e o
  `public/robots.txt` não tem linha `Sitemap`, porque o domínio ainda não foi
  definido.

## Decisões que completam o design

O canvas é um mock; três pontos precisavam de uma decisão para virar site:

1. **Formulário de contato.** No design o envio era um `setTimeout` falso. Aqui
   ele valida os campos, monta a mensagem e abre o WhatsApp já preenchido
   (`src/lib/whatsapp.ts`). Sem backend e sem chave de API. Se o navegador
   bloquear a nova aba, o aviso de sucesso mostra o link para tocar.
2. **Cabeçalho no mobile.** O canvas só previa o cabeçalho desktop, que quebra
   abaixo de 768px. Foi acrescentado um menu com botão hambúrguer; o desktop
   ficou idêntico ao design.
3. **Contraste do aviso de privacidade.** No design o texto era `#DCE7C9` sobre
   card branco (~1,4:1, ilegível). Passou para `#62665D`, 5,87:1.

## Deploy

`vercel.json` já tem o rewrite para `/index.html` — sem ele, abrir
`/servicos` direto dá 404. O repositório previsto é
`gabrielgomescps/topsolucoes` (branch `main`), ainda vazio; o projeto na Vercel
não foi criado. Como o código vive em `site/`, o **Root Directory** da Vercel
precisa ser `site`.

## Nota sobre o caminho do projeto

O caminho tem espaços e acentos. Isso é indiferente para o Vite **desde que o
processo rode com o diretório de trabalho igual ao caminho real** — ou seja,
`npm run dev` de dentro desta pasta. Iniciar por caminho curto 8.3
(`D:\Claude\TOPSOL~1\site`), por junction, ou por `npm --prefix`, faz o Vite
recusar os próprios arquivos (`403 outside of Vite serving allow list`) e
quebrar o otimizador de dependências.
