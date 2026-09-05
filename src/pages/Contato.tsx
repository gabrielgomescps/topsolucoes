import { useRef, useState } from 'react'
import { Breadcrumb } from '../components/Breadcrumb'
import { MediaSlot } from '../components/MediaSlot'
import {
  CONTATO,
  OPCOES_PORTE,
  OPCOES_SERVICO,
  PENDENTE,
} from '../content/site'
import { usePageMeta } from '../lib/usePageMeta'
import { validarOrcamento, type ErrosOrcamento } from '../lib/validacao'
import {
  linkWhatsapp,
  mensagemOrcamento,
  WA_ORCAMENTO,
  type DadosOrcamento,
} from '../lib/whatsapp'

const VAZIO: DadosOrcamento = {
  nome: '',
  telefone: '',
  email: '',
  servico: '',
  porte: '',
  cidade: '',
  mensagem: '',
}

/** Ordem dos campos no formulário — define qual erro recebe o foco. */
const ORDEM: (keyof DadosOrcamento)[] = [
  'nome',
  'telefone',
  'email',
  'servico',
  'cidade',
  'mensagem',
]

/**
 * Mensagem de erro de um campo.
 *
 * Precisa viver fora do componente da página: declarada dentro do render, o
 * React trataria cada render como um tipo novo e remontaria o <span> a cada
 * tecla — o nó apontado por `aria-describedby` mudaria embaixo do leitor de
 * tela, que pode deixar de anunciar o erro.
 */
function Erro({
  campo,
  erros,
}: {
  campo: keyof DadosOrcamento
  erros: ErrosOrcamento
}) {
  const texto = erros[campo]
  if (!texto) return null
  return (
    <span id={`erro-${campo}`} className="text-[13px] text-danger">
      {texto}
    </span>
  )
}

function CartaoContato({
  rotulo,
  valor,
  acao,
  href,
  externo = false,
}: {
  rotulo: string
  valor: string
  acao?: string
  href?: string
  externo?: boolean
}) {
  const conteudo = (
    <>
      <span>
        <span className="micro-label block">{rotulo}</span>
        <span className="font-display mt-1 block text-xl font-bold tracking-[0.03em] text-forest">
          {valor}
        </span>
      </span>
      {acao && (
        <span className="text-[12.5px] font-semibold tracking-[0.07em] text-natural uppercase">
          {acao}
        </span>
      )}
    </>
  )

  if (!href) {
    return (
      <div className="border-b border-sage-light px-[22px] py-5">
        <span className="micro-label block">{rotulo}</span>
        <span className="pending mt-1.5 block w-fit text-base text-ink">
          {valor}
        </span>
      </div>
    )
  }

  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener' } : {})}
      className="flex items-center justify-between gap-4 border-b border-sage-light px-[22px] py-5 transition-colors hover:bg-sage-light"
    >
      {conteudo}
    </a>
  )
}

export function Contato() {
  usePageMeta(
    'Contato — Peça seu orçamento | Top Soluções e Serviços',
    'Fale com a Top Soluções por WhatsApp, telefone ou pelo formulário. Descreva o serviço, envie fotos e receba a avaliação sem custo de visita.'
  )

  const [dados, setDados] = useState<DadosOrcamento>(VAZIO)
  const [erros, setErros] = useState<ErrosOrcamento>({})
  const [linkEnviado, setLinkEnviado] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  function alterar(campo: keyof DadosOrcamento) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setDados((atual) => ({ ...atual, [campo]: e.target.value }))
      // O erro some assim que a pessoa mexe no campo, não só no próximo envio.
      setErros((atual) =>
        atual[campo] ? { ...atual, [campo]: undefined } : atual
      )
    }
  }

  function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const encontrados = validarOrcamento(dados)
    setErros(encontrados)

    const primeiro = ORDEM.find((campo) => encontrados[campo])
    if (primeiro) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${primeiro}"]`)
        ?.focus()
      return
    }

    const link = linkWhatsapp(mensagemOrcamento(dados))
    setLinkEnviado(link)
    // Se o navegador bloquear a nova aba, o link continua visível no aviso abaixo.
    window.open(link, '_blank', 'noopener')
  }

  const erro = (campo: keyof DadosOrcamento) => erros[campo]
  const props = (campo: keyof DadosOrcamento) => ({
    name: campo,
    value: dados[campo],
    onChange: alterar(campo),
    'aria-invalid': erro(campo) ? (true as const) : undefined,
    'aria-describedby': erro(campo) ? `erro-${campo}` : undefined,
    className: 'field',
  })

  return (
    <main tabIndex={-1}>
      <section className="shell pt-[clamp(28px,4vw,44px)] pb-[clamp(48px,7vw,90px)]">
        <Breadcrumb atual="Contato" />

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-start gap-[clamp(28px,4vw,64px)]">
          {/* Coluna de contato */}
          <div>
            <h1 className="h-page">
              Fale com
              <br />a gente
            </h1>
            <p className="mt-5 max-w-[44ch] text-[16.5px] leading-[1.65] text-muted">
              Descreva o serviço e, se possível, envie fotos. Respondemos com a
              avaliação e o valor. Atendimento sem custo de visita para
              orçamento.
            </p>

            <div className="mt-[34px] flex flex-col overflow-hidden rounded-xl border border-line bg-white">
              <CartaoContato
                rotulo="WhatsApp"
                valor={CONTATO.telefoneExibicao}
                acao="Abrir →"
                href={WA_ORCAMENTO}
                externo
              />
              <CartaoContato
                rotulo="Telefone"
                valor={CONTATO.telefoneExibicaoLonga}
                acao="Ligar →"
                href={`tel:${CONTATO.telefoneE164}`}
              />
              <CartaoContato rotulo="E-mail" valor={PENDENTE.email} />
              <CartaoContato
                rotulo="Horário de atendimento"
                valor={PENDENTE.horarioCompleto}
              />
              <div className="px-[22px] py-5">
                <span className="micro-label block">Área de atendimento</span>
                <span className="pending mt-1.5 block w-fit text-base text-ink">
                  {PENDENTE.areaAtendimentoCompleta}
                </span>
              </div>
            </div>

            <MediaSlot ratio="16 / 9" className="mt-4">
              Mapa da região atendida
              <br />
              inserir quando o endereço for definido
            </MediaSlot>
          </div>

          {/* Formulário */}
          <form
            ref={formRef}
            onSubmit={enviar}
            noValidate
            className="card flex flex-col gap-[18px] p-[clamp(22px,3vw,38px)]"
          >
            <div>
              <h2 className="font-display m-0 text-[22px] font-bold tracking-[0.03em] text-forest uppercase">
                Pedir orçamento
              </h2>
              <p className="mt-2 text-sm leading-[1.6] text-muted">
                Campos com <span aria-hidden="true">*</span> são obrigatórios. O
                pedido é enviado pelo WhatsApp já preenchido.
              </p>
            </div>

            <label className="flex flex-col gap-[7px]">
              <span className="field-label">Nome *</span>
              <input
                type="text"
                autoComplete="name"
                placeholder="Seu nome completo"
                {...props('nome')}
              />
              <Erro campo="nome" erros={erros} />
            </label>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
              <label className="flex flex-col gap-[7px]">
                <span className="field-label">WhatsApp *</span>
                <input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(00) 00000-0000"
                  {...props('telefone')}
                />
                <Erro campo="telefone" erros={erros} />
              </label>
              <label className="flex flex-col gap-[7px]">
                <span className="field-label">E-mail</span>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  {...props('email')}
                />
                <Erro campo="email" erros={erros} />
              </label>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
              <label className="flex flex-col gap-[7px]">
                <span className="field-label">Serviço *</span>
                <select {...props('servico')}>
                  <option value="">Selecione</option>
                  {OPCOES_SERVICO.map((opcao) => (
                    <option key={opcao}>{opcao}</option>
                  ))}
                </select>
                <Erro campo="servico" erros={erros} />
              </label>
              <label className="flex flex-col gap-[7px]">
                <span className="field-label">Porte da árvore</span>
                <select {...props('porte')}>
                  <option value="">Não se aplica</option>
                  {OPCOES_PORTE.map((opcao) => (
                    <option key={opcao}>{opcao}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-[7px]">
              <span className="field-label">Cidade / bairro *</span>
              <input
                type="text"
                placeholder="Onde é o serviço"
                {...props('cidade')}
              />
              <Erro campo="cidade" erros={erros} />
            </label>

            <label className="flex flex-col gap-[7px]">
              <span className="field-label">Mensagem *</span>
              <textarea
                rows={4}
                placeholder="Descreva o serviço: tipo de árvore, altura aproximada, acesso ao local."
                {...props('mensagem')}
                className="field resize-y leading-[1.55]"
              />
              <Erro campo="mensagem" erros={erros} />
            </label>

            <button
              type="submit"
              data-oculta-whatsapp-fab
              className="btn btn-primary w-full"
            >
              Enviar pelo WhatsApp
            </button>

            {linkEnviado && (
              <p
                role="status"
                className="m-0 rounded-lg border border-sage bg-sage-light px-4 py-3.5 text-[14.5px] leading-[1.6] text-forest"
              >
                Pedido montado e aberto no WhatsApp. Se a janela não abriu,{' '}
                <a
                  href={linkEnviado}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold underline"
                >
                  toque aqui para enviar
                </a>
                . Aproveite e mande as fotos por lá.
              </p>
            )}

            <p className="m-0 text-[12.5px] leading-[1.6] text-muted">
              Ao enviar, você concorda em ser contatado sobre este orçamento.
              Não usamos seus dados para outra finalidade.
            </p>
          </form>
        </div>
      </section>
    </main>
  )
}
