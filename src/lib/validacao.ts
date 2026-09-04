import type { DadosOrcamento } from './whatsapp'

export type ErrosOrcamento = Partial<Record<keyof DadosOrcamento, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Regras vindas do design. O e-mail é opcional, mas se vier precisa ser válido;
 * o telefone é contado em dígitos para aceitar qualquer máscara que a pessoa use.
 */
export function validarOrcamento(dados: DadosOrcamento): ErrosOrcamento {
  const erros: ErrosOrcamento = {}
  const digitos = dados.telefone.replace(/\D/g, '')

  if (dados.nome.trim().length < 3) erros.nome = 'Informe seu nome.'
  if (digitos.length < 10) erros.telefone = 'Informe um WhatsApp com DDD.'
  if (dados.email.trim() && !EMAIL.test(dados.email.trim()))
    erros.email = 'E-mail inválido.'
  if (!dados.servico) erros.servico = 'Selecione um serviço.'
  if (dados.cidade.trim().length < 2)
    erros.cidade = 'Informe a cidade ou bairro.'
  if (dados.mensagem.trim().length < 15)
    erros.mensagem = 'Descreva o serviço com um pouco mais de detalhe.'

  return erros
}
