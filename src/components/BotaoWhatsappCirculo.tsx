import { WA_ORCAMENTO } from '../lib/whatsapp'
import { IconeWhatsapp } from './IconeWhatsapp'

/** Botão circular verde com o ícone do WhatsApp, usado no cabeçalho e no botão flutuante. */
export function BotaoWhatsappCirculo({
  className = 'inline-flex',
}: {
  className?: string
}) {
  return (
    <a
      href={WA_ORCAMENTO}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className={`size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#1DA851] ${className}`}
    >
      <IconeWhatsapp className="size-5" />
    </a>
  )
}
