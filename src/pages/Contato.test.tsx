import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Contato } from './Contato'

function montar() {
  return render(
    <MemoryRouter>
      <Contato />
    </MemoryRouter>
  )
}

const abrir = vi.fn()

beforeEach(() => {
  abrir.mockReset()
  vi.stubGlobal('open', abrir)
})

describe('formulário de contato', () => {
  it('bloqueia o envio e mostra os erros quando está vazio', async () => {
    const user = userEvent.setup()
    montar()

    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))

    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()
    expect(screen.getByText('Informe um WhatsApp com DDD.')).toBeInTheDocument()
    expect(screen.getByText('Selecione um serviço.')).toBeInTheDocument()
    expect(abrir).not.toHaveBeenCalled()
  })

  it('leva o foco para o primeiro campo com erro', async () => {
    const user = userEvent.setup()
    montar()

    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))

    expect(screen.getByRole('textbox', { name: /nome/i })).toHaveFocus()
  })

  it('limpa o erro do campo assim que a pessoa digita nele', async () => {
    const user = userEvent.setup()
    montar()

    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))
    expect(screen.getByText('Informe seu nome.')).toBeInTheDocument()

    await user.type(screen.getByRole('textbox', { name: /nome/i }), 'Maria')
    expect(screen.queryByText('Informe seu nome.')).not.toBeInTheDocument()
  })

  it('abre o WhatsApp com o pedido montado quando tudo é válido', async () => {
    const user = userEvent.setup()
    montar()

    await user.type(screen.getByRole('textbox', { name: /nome/i }), 'Maria Souza')
    await user.type(
      screen.getByRole('textbox', { name: /whatsapp/i }),
      '66999998888'
    )
    await user.selectOptions(
      screen.getByRole('combobox', { name: /serviço/i }),
      'Poda de árvores'
    )
    await user.type(
      screen.getByRole('textbox', { name: /cidade/i }),
      'Centro'
    )
    await user.type(
      screen.getByRole('textbox', { name: /mensagem/i }),
      'Mangueira encostando no telhado dos fundos.'
    )

    await user.click(screen.getByRole('button', { name: /enviar pelo whatsapp/i }))

    expect(abrir).toHaveBeenCalledTimes(1)
    const url = new URL(abrir.mock.calls[0][0] as string)
    const texto = url.searchParams.get('text') ?? ''
    expect(texto).toContain('*Nome:* Maria Souza')
    expect(texto).toContain('*Serviço:* Poda de árvores')
    expect(texto).toContain('Mangueira encostando no telhado dos fundos.')

    // Fallback visível caso o navegador bloqueie a nova aba
    expect(
      screen.getByRole('link', { name: /toque aqui para enviar/i })
    ).toHaveAttribute('href', abrir.mock.calls[0][0])
  })
})
