import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { CONTATO, EMPRESA } from '../content/site'
import { WA_ORCAMENTO } from '../lib/whatsapp'
import { BotaoWhatsappCirculo } from './BotaoWhatsappCirculo'

const NAV = [
  { to: '/', rotulo: 'Início' },
  { to: '/servicos', rotulo: 'Serviços' },
  { to: '/contato', rotulo: 'Contato' },
] as const

/**
 * Marca do cabeçalho: emblema + nome tipografado.
 *
 * A ilustração é muito detalhada para ser lida em tamanho pequeno, então quem
 * carrega a legibilidade é o nome ao lado — o emblema entra como reconhecimento
 * visual. Abaixo de 768px o nome usa a versão curta para não espremer a barra.
 */
function Marca() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-[11px]">
      <img
        src="/logo-marca.png"
        alt=""
        width="160"
        height="160"
        decoding="async"
        className="size-[42px] shrink-0 object-contain md:size-[50px]"
      />
      <span className="flex flex-col leading-none">
        <strong className="font-display text-[15px] font-extrabold tracking-[0.03em] text-forest uppercase md:text-[17px]">
          <span className="md:hidden">{EMPRESA.nomeCurto}</span>
          <span className="hidden md:inline">{EMPRESA.nome}</span>
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
  const [rotaAnterior, setRotaAnterior] = useState('')
  const { pathname } = useLocation()

  // Navegar fecha o menu — sem isso o painel fica aberto sobre a página nova.
  // Ajustar durante o render (e não num efeito) evita o render extra em que o
  // painel apareceria aberto sobre a página nova antes de fechar.
  if (rotaAnterior !== pathname) {
    setRotaAnterior(pathname)
    setAberto(false)
  }

  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-ivory-header/95 backdrop-blur-[10px]">
      <div className="shell flex h-[clamp(64px,8vw,82px)] items-center gap-[clamp(16px,3vw,40px)]">
        <Marca />

        {/* Desktop */}
        <nav
          aria-label="Navegação principal"
          className="ml-auto hidden gap-[clamp(14px,2vw,30px)] lg:flex"
        >
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClasses} end>
              {item.rotulo}
            </NavLink>
          ))}
        </nav>

        <BotaoWhatsappCirculo className="hidden lg:inline-flex" />

        <a
          href={WA_ORCAMENTO}
          target="_blank"
          rel="noopener"
          className="btn btn-primary btn-sm hidden shrink-0 lg:inline-flex"
        >
          Solicitar orçamento
        </a>

        {/* Mobile/tablet — abaixo de 1024px o conjunto nav + telefone + CTA não
            cabe na barra, então vale o menu recolhido. */}
        <a
          href={`tel:${CONTATO.telefoneE164}`}
          className="font-display ml-auto hidden py-2 text-[15px] font-bold tracking-[0.04em] whitespace-nowrap text-forest min-[400px]:block lg:hidden"
        >
          {CONTATO.telefoneExibicao}
        </a>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          className="ml-auto flex size-11 shrink-0 items-center justify-center rounded-lg border border-line-strong text-forest lg:hidden"
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
          className="border-t border-line bg-ivory-header lg:hidden"
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
            {/* Abaixo de 400px o telefone sai da barra; aqui ele continua a um toque. */}
            <a
              href={`tel:${CONTATO.telefoneE164}`}
              className="font-display border-b border-line py-4 text-[15px] font-bold tracking-[0.04em] text-forest"
            >
              {CONTATO.telefoneExibicao}
            </a>
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
