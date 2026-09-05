import { Breadcrumb } from '../components/Breadcrumb'
import { CtaBand } from '../components/CtaBand'
import { Faq } from '../components/Faq'
import { MediaSlot } from '../components/MediaSlot'
import {
  ESPECIES_ALTAS,
  FAQ_SERVICOS,
  JARDINAGEM,
  PORTES,
} from '../content/site'
import { usePageMeta } from '../lib/usePageMeta'
import { WA_ORCAMENTO, WA_POR_PORTE } from '../lib/whatsapp'

export function Servicos() {
  usePageMeta(
    'Serviços — Poda, remoção, coqueiros e jardinagem | Top Soluções',
    'Poda de pequeno, médio e grande porte, remoção de árvores, limpeza de coqueiros e palmeiras, jardinagem, paisagismo e limpeza de terreno.'
  )

  return (
    <main tabIndex={-1}>
      {/* Cabeçalho da página */}
      <section className="border-b border-line bg-sage-light">
        <div className="shell pt-[clamp(28px,4vw,44px)] pb-[clamp(46px,6vw,80px)]">
          <Breadcrumb atual="Serviços" />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] items-end gap-[clamp(24px,4vw,56px)]">
            <h1 className="h-page">
              Serviços de poda,
              <br />
              jardinagem e
              <br />
              áreas verdes
            </h1>
            <div>
              <p className="m-0 max-w-[46ch] text-[16.5px] leading-[1.65] text-muted">
                Trabalhamos com árvores de todos os portes e com a manutenção
                contínua de jardins e áreas comuns. Abaixo, o que cada serviço
                envolve e quando ele é indicado.
              </p>
              <a
                href={WA_ORCAMENTO}
                target="_blank"
                rel="noopener"
                className="btn btn-primary btn-sm mt-[22px]"
              >
                Solicitar orçamento
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Três portes */}
      <section className="shell section-y-sm">
        <p className="eyebrow mb-3.5">Poda de árvores</p>
        <h2 className="h-block mb-[clamp(26px,3vw,40px)]">
          Três portes, três abordagens
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4">
          {PORTES.map((porte) => (
            <article
              key={porte.slug}
              className="card flex flex-col overflow-hidden"
            >
              <MediaSlot ratio="16 / 10" className="!rounded-none">
                {porte.etiqueta}
              </MediaSlot>
              <div className="flex flex-1 flex-col gap-3.5 p-[clamp(20px,2.4vw,28px)]">
                <h3 className="h-card !text-xl">{porte.titulo}</h3>
                <p className="body-sm">{porte.resumo}</p>
                {porte.blocos.map((bloco) => (
                  <div key={bloco.rotulo}>
                    <p className="micro-label mb-2">{bloco.rotulo}</p>
                    <p className="m-0 text-sm leading-[1.6] text-muted">
                      {bloco.texto}
                    </p>
                  </div>
                ))}
                <a
                  href={WA_POR_PORTE[porte.slug]}
                  target="_blank"
                  rel="noopener"
                  className="link-rule mt-auto self-start"
                >
                  Pedir orçamento →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Coqueiros e palmeiras */}
      <section className="bg-deep text-white">
        <div className="shell section-y-sm grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[clamp(28px,4vw,56px)]">
          <div>
            <p className="eyebrow eyebrow-on-dark mb-3.5">
              Coqueiros e palmeiras
            </p>
            <h2 className="h-block text-white">
              Limpeza de coqueiro,
              <br />
              palmeira e afins
            </h2>
            <p className="mt-[18px] max-w-[46ch] text-[15.5px] leading-[1.68] text-sage">
              Coqueiros e palmeiras acumulam folhas secas e cachos que se soltam
              sem aviso. A limpeza periódica evita acidente e mantém a planta
              com boa aparência. Atendemos também outras espécies de tronco
              alto.
            </p>
            <ul className="mt-6 flex list-none flex-wrap gap-2.5 p-0">
              {ESPECIES_ALTAS.map((especie) => (
                <li
                  key={especie}
                  className="rounded-[3px] border border-natural px-3.5 py-2 text-[12.5px] tracking-[0.06em] text-sage uppercase"
                >
                  {especie}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <MediaSlot ratio="4 / 3" dark>
              Escalada em coqueiro · 4:3
            </MediaSlot>
          </div>
        </div>
      </section>

      {/* Jardinagem */}
      <section className="shell section-y-sm">
        <p className="eyebrow mb-3.5">Jardinagem e áreas verdes</p>
        <h2 className="h-block mb-[clamp(26px,3vw,40px)]">
          Implantar, manter e recuperar
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
          {JARDINAGEM.map((item) => (
            <article
              key={item.titulo}
              className="card p-[clamp(22px,2.5vw,30px)]"
            >
              <h3 className="h-card !text-[18.5px]">{item.titulo}</h3>
              <p className="body-sm mt-3">{item.texto}</p>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-sage-light">
        <div className="shell-narrow section-y-sm">
          <h2 className="h-block mb-[clamp(22px,3vw,34px)]">
            Dúvidas sobre os serviços
          </h2>
          <Faq itens={FAQ_SERVICOS} />
        </div>
      </section>

      <CtaBand
        variante="split"
        titulo="Conte o que precisa e receba um orçamento"
        rotuloWhatsapp="WhatsApp"
        rotuloFormulario="Formulário"
      />
    </main>
  )
}
