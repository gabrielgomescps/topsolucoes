import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { WA_ORCAMENTO } from '../lib/whatsapp'

/**
 * Botão fixo de WhatsApp, visível em todas as páginas.
 *
 * Fica temporariamente invisível enquanto algum elemento marcado com
 * `data-oculta-whatsapp-fab` estiver na tela — evita cobrir um CTA de
 * WhatsApp que já esteja visível (ex.: o botão de enviar do formulário
 * de contato).
 */
export function WhatsappFab() {
  const { pathname } = useLocation()
  const [oculto, setOculto] = useState(false)

  useEffect(() => {
    const alvos = document.querySelectorAll('[data-oculta-whatsapp-fab]')
    if (alvos.length === 0) {
      setOculto(false)
      return
    }

    const observer = new IntersectionObserver((entradas) => {
      setOculto(entradas.some((entrada) => entrada.isIntersecting))
    })
    alvos.forEach((alvo) => observer.observe(alvo))
    return () => observer.disconnect()
  }, [pathname])

  return (
    <a
      href={WA_ORCAMENTO}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp com a Top Soluções"
      aria-hidden={oculto}
      tabIndex={oculto ? -1 : undefined}
      className={`fixed right-[clamp(14px,3vw,26px)] bottom-[calc(clamp(18px,3vw,28px)+env(safe-area-inset-bottom,0px))] z-[70] rounded-full bg-natural px-[22px] py-3.5 text-[13px] font-semibold tracking-[0.06em] text-white uppercase shadow-card transition-opacity duration-200 hover:bg-forest ${
        oculto ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      WhatsApp
    </a>
  )
}
