import { Link } from 'react-router'
import { WA_ORCAMENTO } from '../lib/whatsapp'

type Props = {
  titulo: React.ReactNode
  texto?: string
  /** 'split' = título e botões lado a lado; 'stack' = título com texto de apoio. */
  variante?: 'stack' | 'split'
  rotuloWhatsapp?: string
  rotuloFormulario?: string
}

/** Faixa Forest Green de fechamento, repetida no fim da Home e de Serviços. */
export function CtaBand({
  titulo,
  texto,
  variante = 'stack',
  rotuloWhatsapp = 'Falar no WhatsApp',
  rotuloFormulario = 'Formulário de contato',
}: Props) {
  const botoes = (
    <div className="flex flex-wrap gap-3">
      <a
        href={WA_ORCAMENTO}
        target="_blank"
        rel="noopener"
        className="btn btn-light"
      >
        {rotuloWhatsapp}
      </a>
      <Link to="/contato" className="btn btn-ghost-light">
        {rotuloFormulario}
      </Link>
    </div>
  )

  if (variante === 'split') {
    return (
      <section className="bg-forest text-white">
        <div className="shell flex flex-wrap items-center justify-between gap-6 py-[clamp(44px,6vw,84px)]">
          <h2 className="font-display m-0 max-w-[22ch] text-[clamp(24px,3.4vw,38px)] leading-[1.1] font-extrabold uppercase">
            {titulo}
          </h2>
          {botoes}
        </div>
      </section>
    )
  }

  return (
    <section className="bg-forest text-white">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(290px,100%),1fr))] items-center gap-[clamp(28px,4vw,56px)] py-[clamp(52px,7vw,96px)]">
        <div>
          <h2 className="h-section">{titulo}</h2>
          {texto && (
            <p className="mt-[18px] max-w-[44ch] text-base leading-[1.65] text-sage">
              {texto}
            </p>
          )}
        </div>
        {botoes}
      </div>
    </section>
  )
}
