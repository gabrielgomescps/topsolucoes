import { useLocation } from 'react-router'
import { WA_ORCAMENTO } from '../lib/whatsapp'

/**
 * Botão fixo de WhatsApp. Some na página de contato — lá o formulário e os
 * cartões de contato já cumprem o papel, e o botão só cobriria conteúdo.
 */
export function WhatsappFab() {
  const { pathname } = useLocation()
  if (pathname === '/contato') return null

  return (
    <a
      href={WA_ORCAMENTO}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp com a Top Soluções"
      className="fixed right-[clamp(14px,3vw,26px)] bottom-[calc(clamp(18px,3vw,28px)+env(safe-area-inset-bottom,0px))] z-[70] rounded-full bg-natural px-[22px] py-3.5 text-[13px] font-semibold tracking-[0.06em] text-white uppercase shadow-card transition-colors hover:bg-forest"
    >
      WhatsApp
    </a>
  )
}
