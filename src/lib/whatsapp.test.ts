import { describe, expect, it } from 'vitest'
import { CONTATO } from '../content/site'
import {
  linkWhatsapp,
  mensagemOrcamento,
  WA_ORCAMENTO,
  WA_POR_PORTE,
  type DadosOrcamento,
} from './whatsapp'

const pedido: DadosOrcamento = {
  nome: '  Maria Souza  ',
  telefone: '(66) 99999-8888',
  email: '',
  servico: 'Poda de árvores',
  porte: '',
  cidade: 'Centro',
  mensagem: 'Mangueira encostando no telhado dos fundos.',
}

describe('linkWhatsapp', () => {
  it('usa o número do módulo de conteúdo e escapa a mensagem', () => {
    const url = new URL(linkWhatsapp('Olá, tudo bem?'))
    expect(url.origin + url.pathname).toBe(
      `https://wa.me/${CONTATO.telefoneDigitos}`
    )
    expect(url.searchParams.get('text')).toBe('Olá, tudo bem?')
  })

  it('tem um link pronto por porte de árvore', () => {
    for (const link of Object.values(WA_POR_PORTE)) {
      expect(link).toContain(`wa.me/${CONTATO.telefoneDigitos}`)
    }
    expect(
      new URL(WA_POR_PORTE.grande).searchParams.get('text')
    ).toContain('grande porte')
    expect(WA_ORCAMENTO).toContain('wa.me/')
  })
})

function texto(dados: DadosOrcamento) {
  return mensagemOrcamento(dados)
}

describe('mensagemOrcamento', () => {
  it('inclui os campos obrigatórios, sem espaços sobrando', () => {
    const msg = texto(pedido)
    expect(msg).toContain('*Nome:* Maria Souza')
    expect(msg).toContain('*WhatsApp:* (66) 99999-8888')
    expect(msg).toContain('*Serviço:* Poda de árvores')
    expect(msg).toContain('*Cidade/bairro:* Centro')
    expect(msg.trimEnd().endsWith('Mangueira encostando no telhado dos fundos.'))
      .toBe(true)
  })

  it('omite os campos opcionais em branco', () => {
    const msg = texto(pedido)
    expect(msg).not.toContain('E-mail')
    expect(msg).not.toContain('Porte')
  })

  it('inclui os opcionais quando preenchidos', () => {
    const msg = texto({
      ...pedido,
      email: 'maria@exemplo.com',
      porte: 'Grande porte',
    })
    expect(msg).toContain('*E-mail:* maria@exemplo.com')
    expect(msg).toContain('*Porte da árvore:* Grande porte')
  })

  it('sobrevive à codificação de URL', () => {
    const url = new URL(linkWhatsapp(texto(pedido)))
    expect(url.searchParams.get('text')).toBe(texto(pedido))
  })
})
