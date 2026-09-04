import { CONTATO } from '../content/site'

/** Monta um link wa.me com a mensagem já preenchida. */
export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${CONTATO.telefoneDigitos}?text=${encodeURIComponent(mensagem)}`
}

export const WA_ORCAMENTO = linkWhatsapp(
  'Olá! Gostaria de solicitar um orçamento de poda/jardinagem.'
)

export const WA_POR_PORTE: Record<'pequeno' | 'medio' | 'grande', string> = {
  pequeno: linkWhatsapp(
    'Olá! Gostaria de um orçamento para poda de pequeno porte.'
  ),
  medio: linkWhatsapp('Olá! Gostaria de um orçamento para poda de médio porte.'),
  grande: linkWhatsapp(
    'Olá! Gostaria de um orçamento para poda de grande porte.'
  ),
}

export type DadosOrcamento = {
  nome: string
  telefone: string
  email: string
  servico: string
  porte: string
  cidade: string
  mensagem: string
}

/**
 * Transforma o formulário de contato numa mensagem de WhatsApp.
 *
 * O site não tem backend: em vez de fingir um envio, o formulário valida os
 * campos e entrega o pedido montado no canal que a empresa já usa. Campos
 * opcionais em branco simplesmente não entram na mensagem.
 */
export function mensagemOrcamento(dados: DadosOrcamento): string {
  const linhas = [
    'Olá! Gostaria de solicitar um orçamento.',
    '',
    `*Nome:* ${dados.nome.trim()}`,
    `*WhatsApp:* ${dados.telefone.trim()}`,
  ]

  if (dados.email.trim()) linhas.push(`*E-mail:* ${dados.email.trim()}`)

  linhas.push(`*Serviço:* ${dados.servico}`)

  if (dados.porte) linhas.push(`*Porte da árvore:* ${dados.porte}`)

  linhas.push(
    `*Cidade/bairro:* ${dados.cidade.trim()}`,
    '',
    dados.mensagem.trim()
  )

  return linhas.join('\n')
}
