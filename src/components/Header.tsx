import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { CONTATO, EMPRESA } from '../content/site'
import { WA_ORCAMENTO } from '../lib/whatsapp'

const NAV = [
  { to: '/', rotulo: 'Início' },
  { to: '/servicos', rotulo: 'Serviços' },
  { to: '/contato', rotulo: 'Contato' },
] as const

function IconeWhatsapp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.246c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.337-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
    </svg>
  )
}

function BotaoWhatsapp({ className = 'inline-flex' }: { className?: string }) {
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

function Marca() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-[11px]">
      <span className="font-display flex size-[38px] items-center justify-center rounded-lg bg-forest text-[17px] font-extrabold tracking-[0.02em] text-ivory">
        {EMPRESA.sigla}
      </span>
      <span className="flex flex-col leading-none">
        <strong className="font-display text-[17px] font-extrabold tracking-[0.03em] text-forest uppercase">
          {EMPRESA.nome}
        </strong>
        <span className="mt-[3px] text-[9.5px] tracking-[0.22em] text-muted uppercase">
          {EMPRESA.tagline}
        </span>
      </span>
    </Link>
  )
}

function linkClasses({ isActive }: { isActive: boolean }) {
  return `py-1.5 text-sm font-medium tracking-[0.02em] transition-colors hover:text-forest ${
    isActive ? 'text-forest' : 'text-ink'
  }`
}

export function Header() {
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()

  // Navegar fecha o menu — sem isso o painel fica aberto sobre a página nova.
  useEffect(() => setAberto(false), [pathname])

  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-ivory-header/95 backdrop-blur-[10px]">
      <div className="shell flex h-[clamp(64px,8vw,82px)] items-center gap-[clamp(16px,3vw,40px)]">
        <Marca />

        {/* Desktop */}
        <nav
          aria-label="Navegação principal"
          className="ml-auto hidden gap-[clamp(14px,2vw,30px)] md:flex"
        >
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses} end>
              {item.rotulo}
            </NavLink>
          ))}
        </nav>

        <a
          href={`tel:${CONTATO.telefoneE164}`}
          className="font-display hidden py-2 text-[15px] font-bold tracking-[0.04em] whitespace-nowrap text-forest md:block"
        >
          {CONTATO.telefoneExibicao}
        </a>

        <BotaoWhatsapp className="hidden md:inline-flex" />

        <a
          href={WA_ORCAMENTO}
          target="_blank"
          rel="noopener"
          className="btn btn-primary btn-sm hidden shrink-0 md:inline-flex"
        >
          Solicitar orçamento
        </a>

        {/* Mobile — o canvas não previu este estado; sem ele o cabeçalho quebra abaixo de 768px */}
        <a
          href={`tel:${CONTATO.telefoneE164}`}
          className="font-display ml-auto py-2 text-[15px] font-bold tracking-[0.04em] whitespace-nowrap text-forest md:hidden"
        >
          {CONTATO.telefoneExibicao}
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-line-strong text-forest md:hidden"
        >
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                aberto ? 'top-1.5 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute top-1.5 left-0 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                aberto ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-transform duration-200 ${
                aberto ? 'top-1.5 -rotate-45' : 'top-3'
              }`}
            />
          </span>
        </button>
      </div>

      {aberto && (
        <div
          id="menu-mobile"
          className="border-t border-line bg-ivory-header md:hidden"
        >
          <nav
            aria-label="Navegação principal"
            className="shell flex flex-col py-2"
          >
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                className={({ isActive }) =>
                  `border-b border-line py-4 text-[15px] font-medium ${
                    isActive ? 'text-forest' : 'text-ink'
                  }`
                }
              >
                {item.rotulo}
              </NavLink>
            ))}
            <div className="my-4 flex items-center gap-3">
              <BotaoWhatsapp />
              <a
                href={WA_ORCAMENTO}
                target="_blank"
                rel="noopener"
                className="btn btn-primary flex-1"
              >
                Solicitar orçamento
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
