import { describe, expect, it } from 'vitest'
import { validarOrcamento } from './validacao'
import type { DadosOrcamento } from './whatsapp'

const valido: DadosOrcamento = {
  nome: 'Maria Souza',
  telefone: '(66) 99999-8888',
  email: '',
  servico: 'Poda de árvores',
  porte: 'Médio porte',
  cidade: 'Centro',
  mensagem: 'Tenho uma mangueira encostando no telhado dos fundos.',
}

describe('validarOrcamento', () => {
  it('aceita um pedido completo sem e-mail', () => {
    expect(validarOrcamento(valido)).toEqual({})
  })

  it('cobra nome com pelo menos três letras', () => {
    expect(validarOrcamento({ ...valido, nome: 'Jo' }).nome).toBeDefined()
    expect(validarOrcamento({ ...valido, nome: '   Ana' }).nome).toBeUndefined()
  })

  it('conta dígitos do telefone, ignorando a máscara', () => {
    expect(validarOrcamento({ ...valido, telefone: '999998888' }).telefone)
      .toBeDefined()
    expect(
      validarOrcamento({ ...valido, telefone: '66 9999-8888' }).telefone
    ).toBeUndefined()
  })

  it('só valida o e-mail quando ele é preenchido', () => {
    expect(validarOrcamento({ ...valido, email: '   ' }).email).toBeUndefined()
    expect(validarOrcamento({ ...valido, email: 'nao-e-email' }).email)
      .toBeDefined()
    expect(
      validarOrcamento({ ...valido, email: 'contato@exemplo.com.br' }).email
    ).toBeUndefined()
  })

  it('exige um serviço selecionado', () => {
    expect(validarOrcamento({ ...valido, servico: '' }).servico).toBeDefined()
  })

  it('não exige o porte da árvore', () => {
    expect(validarOrcamento({ ...valido, porte: '' })).toEqual({})
  })

  it('pede uma mensagem com alguma descrição', () => {
    expect(validarOrcamento({ ...valido, mensagem: 'poda' }).mensagem)
      .toBeDefined()
  })

  it('acumula todos os erros de uma vez', () => {
    const erros = validarOrcamento({
      nome: '',
      telefone: '',
      email: 'x@y',
      servico: '',
      porte: '',
      cidade: '',
      mensagem: '',
    })
    expect(Object.keys(erros).sort()).toEqual([
      'cidade',
      'email',
      'mensagem',
      'nome',
      'servico',
      'telefone',
    ])
  })
})
