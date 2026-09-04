import { Link } from 'react-router'
import { usePageMeta } from '../lib/usePageMeta'
import { WA_ORCAMENTO } from '../lib/whatsapp'

export function NotFound() {
  usePageMeta(
    'Página não encontrada | Top Soluções e Serviços',
    'A página que você procurou não existe. Volte ao início ou fale com a gente pelo WhatsApp.'
  )

  return (
    <main className="shell flex min-h-[52vh] flex-col justify-center py-[clamp(56px,8vw,104px)]">
      <p className="eyebrow mb-4">Erro 404</p>
      <h1 className="h-section max-w-[18ch]">
        Esta página não existe
      </h1>
      <p className="lead mt-5 max-w-[46ch]">
        O endereço pode ter mudado ou o link estar incompleto. Volte para o
        início ou chame no WhatsApp que a gente responde.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="btn btn-primary">
          Voltar ao início
        </Link>
        <a
          href={WA_ORCAMENTO}
          target="_blank"
          rel="noopener"
          className="btn btn-outline"
        >
          Falar no WhatsApp
        </a>
      </div>
    </main>
  )
}
