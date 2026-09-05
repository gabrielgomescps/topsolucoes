import { Link } from 'react-router'
import {
  CONTATO,
  EMPRESA,
  LINKS_RODAPE_SERVICOS,
  PENDENTE,
} from '../content/site'
import { WA_ORCAMENTO } from '../lib/whatsapp'

function Coluna({
  titulo,
  children,
}: {
  titulo: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="font-display m-0 mb-4 text-sm font-bold tracking-[0.1em] text-white uppercase">
        {titulo}
      </p>
      {children}
    </div>
  )
}

const linkRodape = 'text-sm text-sage transition-colors hover:text-lime'

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-deepest text-sage">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[clamp(28px,4vw,52px)] pt-[clamp(44px,6vw,76px)] pb-7">
        <div>
          <div className="flex items-center gap-[11px]">
            <img
              src="/logo-marca.png"
              alt=""
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
              className="size-11 shrink-0 object-contain"
            />
            <strong className="font-display text-[17px] font-extrabold tracking-[0.03em] text-white uppercase">
              {EMPRESA.nome}
            </strong>
          </div>
          <p className="mt-[18px] max-w-[34ch] text-sm leading-[1.65]">
            {EMPRESA.descricao}
          </p>
        </div>

        <Coluna titulo="Navegação">
          <nav className="flex flex-col gap-2.5">
            <Link to="/" className={linkRodape}>
              Início
            </Link>
            <Link to="/servicos" className={linkRodape}>
              Serviços
            </Link>
            <Link to="/contato" className={linkRodape}>
              Contato
            </Link>
          </nav>
        </Coluna>

        <Coluna titulo="Serviços">
          <nav className="flex flex-col gap-2.5">
            {LINKS_RODAPE_SERVICOS.map((servico) => (
              <Link key={servico} to="/servicos" className={linkRodape}>
                {servico}
              </Link>
            ))}
          </nav>
        </Coluna>

        <Coluna titulo="Contato">
          <div className="flex flex-col gap-2.5 text-sm">
            <a href={`tel:${CONTATO.telefoneE164}`} className={linkRodape}>
              {CONTATO.telefoneExibicaoLonga}
            </a>
            <a
              href={WA_ORCAMENTO}
              target="_blank"
              rel="noopener"
              className={linkRodape}
            >
              WhatsApp
            </a>
            <span className="pending-on-dark w-fit">{PENDENTE.email}</span>
            <span className="pending-on-dark w-fit">
              {PENDENTE.cidadeEstado}
            </span>
            <span className="pending-on-dark w-fit">{PENDENTE.horario}</span>
          </div>
        </Coluna>
      </div>

      {/* pb generoso no mobile: o botão fixo do WhatsApp fica sobre esta faixa */}
      <div className="shell flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-line-dark py-[22px] pb-24 text-[12.5px] md:pb-[22px]">
        <span>
          © {new Date().getFullYear()} {EMPRESA.nomeCompleto}. Todos os direitos
          reservados.
        </span>
        {/* Sem link enquanto os textos não existem — melhor marcar como pendente
            do que apontar para uma rota que dá 404. */}
        <span className="flex gap-5">
          <span className="pending-on-dark">Política de Privacidade</span>
          <span className="pending-on-dark">Termos de Uso</span>
        </span>
      </div>
    </footer>
  )
}
