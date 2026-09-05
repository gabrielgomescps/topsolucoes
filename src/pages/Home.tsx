import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { CtaBand } from '../components/CtaBand'
import { Faq, type ItemFaq } from '../components/Faq'
import { MediaSlot } from '../components/MediaSlot'
import {
  COMO_FUNCIONA,
  DIFERENCIAIS_HERO,
  FAIXA_GARANTIAS,
  FAQ_HOME,
  METODO,
  PENDENTE,
  SERVICOS,
} from '../content/site'
import { usePageMeta } from '../lib/usePageMeta'
import { WA_ORCAMENTO } from '../lib/whatsapp'

/**
 * A pergunta sobre região carrega dois campos pendentes, por isso vive aqui
 * como JSX em vez de string no módulo de conteúdo. Entra na penúltima posição,
 * como no design.
 */
const faqComRegioes: readonly ItemFaq[] = [
  ...FAQ_HOME.slice(0, -1),
  {
    pergunta: 'Quais regiões vocês atendem?',
    resposta: (
      <>
        Atendemos <span className="pending">{PENDENTE.cidade}</span> e região de{' '}
        <span className="pending">{PENDENTE.areaAtendimento}</span>. Se tiver
        dúvida se o seu endereço está na área, chame no WhatsApp.
      </>
    ),
  },
  ...FAQ_HOME.slice(-1),
]

export function Home() {
  usePageMeta(
    'Top Soluções e Serviços — Poda de árvores, jardinagem e áreas verdes',
    'Poda de árvores de pequeno, médio e grande porte, remoção, jardinagem, paisagismo e manutenção de áreas verdes. Orçamento sem compromisso pelo WhatsApp.'
  )

  const videoRef = useRef<HTMLVideoElement>(null)

  /**
   * O vídeo do hero roda sozinho, mas quem pediu menos movimento no sistema
   * fica só com o quadro parado. O `autoPlay` no elemento garante que ele
   * funcione mesmo sem JS; aqui só desligamos quando é o caso.
   */
  useEffect(() => {
    const consulta = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!consulta) return

    const aplicar = () => {
      const video = videoRef.current
      if (!video) return
      if (consulta.matches) video.pause()
      else video.play().catch(() => {})
    }

    aplicar()
    consulta.addEventListener('change', aplicar)
    return () => consulta.removeEventListener('change', aplicar)
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="shell grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-[clamp(28px,4vw,56px)] pt-[clamp(36px,6vw,72px)] pb-[clamp(20px,4vw,40px)]">
        <div>
          <p className="eyebrow mb-5">Poda · Jardinagem · Áreas verdes</p>
          <h1 className="h-hero">
            Poda com segurança,
            <br />
            <span className="text-natural">
              áreas verdes
              <br />
              bem cuidadas
            </span>
          </h1>
          <p className="lead mt-6 max-w-[47ch]">
            Executamos poda de árvores de pequeno, médio e grande porte,
            remoção, jardinagem e manutenção de áreas verdes para residências,
            condomínios e empresas. Equipe com equipamento próprio e trabalho
            limpo do começo ao fim.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3">
            <a
              href={WA_ORCAMENTO}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
            >
              Solicitar orçamento
            </a>
            <Link to="/servicos" className="btn btn-outline">
              Ver nossos serviços
            </Link>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-2.5 border-t border-line pt-7">
            {DIFERENCIAIS_HERO.map((item) => (
              <span
                key={item}
                className="flex items-center gap-[9px] text-[13.5px] text-muted"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-natural"
                />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <video
            ref={videoRef}
            className="aspect-[4/5] w-full rounded-xl bg-sage-tint object-cover"
            poster="/hero-podador.jpg"
            src="/hero-podador.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Podador da equipe em ação: capacete, cinto de segurança e motosserra durante a poda de uma árvore de grande porte."
          />

          {/* Selo da marca: presença de identidade na área visual, em escala que
              não disputa atenção com o título. Contraparte do card de
              atendimento na diagonal oposta. */}
          <img
            src="/logo.png"
            alt="Logotipo Top Soluções e Serviços"
            width="352"
            height="352"
            decoding="async"
            className="absolute top-[clamp(-20px,-2vw,-8px)] right-[clamp(-14px,-1.4vw,-4px)] size-[clamp(88px,13vw,132px)] rounded-full border border-line bg-ivory object-contain p-2.5 shadow-card"
          />
          <div className="absolute bottom-[clamp(20px,4vw,44px)] left-[clamp(-16px,-2vw,0px)] max-w-[220px] rounded-xl border border-line bg-ivory px-5 py-4 shadow-card">
            <p className="font-display m-0 text-sm font-bold tracking-[0.06em] text-forest uppercase">
              Atendimento
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.5] text-muted">
              Residências, condomínios e empresas em{' '}
              <span className="pending">{PENDENTE.cidadeRegiao}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Faixa de garantias */}
      <section className="bg-deep text-white">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] py-[clamp(30px,4vw,44px)]">
          {FAIXA_GARANTIAS.map((item, i) => (
            <div
              key={item.titulo}
              className={`px-[clamp(14px,2vw,28px)] ${
                i > 0 ? 'border-l border-white/12' : ''
              }`}
            >
              <p className="font-display m-0 text-[clamp(17px,2vw,21px)] font-bold tracking-[0.03em] uppercase">
                {item.titulo}
              </p>
              <p className="mt-[7px] text-[13.5px] leading-[1.55] text-sage">
                {item.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Serviços */}
      <section className="shell section-y">
        <div className="mb-[clamp(32px,4vw,52px)] grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-end gap-[clamp(20px,4vw,56px)]">
          <div>
            <p className="eyebrow mb-4">Nossos serviços</p>
            <h2 className="h-section">
              Do galho ao jardim
              <br />
              inteiro
            </h2>
          </div>
          <div>
            <p className="m-0 max-w-[46ch] text-base leading-[1.65] text-muted">
              Cada serviço é avaliado antes da execução: porte da árvore, acesso
              ao local, risco à rede elétrica e ao imóvel. O orçamento sai
              depois dessa análise.
            </p>
            <Link to="/servicos" className="link-rule mt-[18px]">
              Ver todos os serviços →
            </Link>
          </div>
        </div>

        <div className="grid-fluid">
          {SERVICOS.map((servico) => (
            <article
              key={servico.titulo}
              className="card card-hover p-[clamp(22px,2.5vw,30px)]"
            >
              <h3 className="h-card">{servico.titulo}</h3>
              <p className="body-sm mt-3">{servico.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Método */}
      <section className="bg-deep text-white [border-radius:0_clamp(40px,10vw,140px)_0_0]">
        <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(310px,100%),1fr))] items-center gap-[clamp(32px,5vw,72px)] py-[clamp(56px,8vw,104px)]">
          <div>
            <p className="eyebrow eyebrow-on-dark mb-4">
              Por que a Top Soluções
            </p>
            <h2 className="h-section text-white">
              Serviço técnico,
              <br />
              não improviso
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-[1.68] text-sage">
              Poda mal feita enfraquece a árvore e cria risco. Antes de subir,
              avaliamos estrutura, inclinação, proximidade de fiação e o melhor
              ponto de corte.
            </p>

            <div className="mt-9 flex flex-col gap-[22px]">
              {METODO.map((item, i) => (
                <div key={item.titulo} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-forest text-[15px] text-sage"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-display m-0 text-[16.5px] font-bold tracking-[0.05em] text-white uppercase">
                      {item.titulo}
                    </p>
                    <p className="mt-1.5 text-sm leading-[1.6] text-sage">
                      {item.texto}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid min-w-0 grid-cols-2 gap-3">
            <MediaSlot ratio="16 / 10" dark className="col-span-2">
              Equipe em serviço · 16:10
            </MediaSlot>
            <MediaSlot ratio="1 / 1" dark className="!p-3">
              Escalada
            </MediaSlot>
            <MediaSlot ratio="1 / 1" dark className="!p-3">
              Jardim pronto
            </MediaSlot>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="shell section-y">
        <p className="eyebrow mb-4">Como funciona</p>
        <h2 className="h-section mb-[clamp(32px,4vw,52px)]">
          Do primeiro contato ao serviço entregue
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[clamp(20px,3vw,32px)]">
          {COMO_FUNCIONA.map((etapa, i) => (
            <div key={etapa.titulo} className="border-t-2 border-forest pt-5">
              <span
                aria-hidden="true"
                className="font-display block text-[34px] leading-none font-extrabold text-line-strong"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display mt-3 text-lg font-bold tracking-[0.04em] text-forest uppercase">
                {etapa.titulo}
              </h3>
              <p className="body-sm mt-[9px]">{etapa.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Antes e depois — reservado para material real do cliente */}
      <section className="border-y border-line bg-sage-light">
        <div className="shell py-[clamp(56px,8vw,100px)]">
          <div className="mb-[clamp(28px,4vw,44px)] grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] items-end gap-[clamp(20px,4vw,52px)]">
            <div>
              <p className="eyebrow mb-4">Trabalhos realizados</p>
              <h2 className="h-block">Antes e depois</h2>
            </div>
            <p className="m-0 max-w-[44ch] text-[15.5px] leading-[1.65] text-muted">
              Espaço reservado para fotos reais dos serviços e depoimentos de
              clientes. Nada aqui é preenchido com conteúdo fictício.
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
            {['Antes · árvore', 'Depois · árvore', 'Antes · jardim', 'Depois · jardim'].map(
              (legenda) => (
                <MediaSlot key={legenda} ratio="3 / 4" className="!p-3.5">
                  {legenda}
                </MediaSlot>
              )
            )}
          </div>

          <div className="mt-4 rounded-lg border border-dashed border-line-strong px-5 py-4">
            <p className="m-0 font-mono text-[11px] leading-[1.6] font-medium tracking-[0.06em] text-muted uppercase">
              Depoimentos: aguardando conteúdo real do cliente
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell-narrow section-y">
        <p className="eyebrow mb-4">Dúvidas frequentes</p>
        <h2 className="h-block mb-[clamp(26px,3vw,40px)]">
          Perguntas que mais recebemos
        </h2>
        <Faq itens={faqComRegioes} />
      </section>

      <CtaBand
        titulo={
          <>
            Precisa podar
            <br />
            ou cuidar da área?
          </>
        }
        texto="Mande uma foto pelo WhatsApp e receba a avaliação. Sem custo e sem compromisso."
      />
    </main>
  )
}
