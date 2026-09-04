import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { CONTATO, EMPRESA } from '../content/site'
import { WA_ORCAMENTO } from '../lib/whatsapp'
import { BotaoWhatsappCirculo } from './BotaoWhatsappCirculo'

const NAV = [
  { to: '/', rotulo: 'Início' },
  { to: '/servicos', rotulo: 'Serviços' },
  { to: '/contato', rotulo: 'Contato' },
] as const

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

        <BotaoWhatsappCirculo className="hidden md:inline-flex" />

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
              <BotaoWhatsappCirculo />
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
