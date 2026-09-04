import type { ReactNode } from 'react'

export type ItemFaq = { pergunta: string; resposta: ReactNode }

/**
 * Acordeão em <details>: abre sem JavaScript e o conteúdo das respostas fica
 * no HTML para os buscadores. O "+" gira 45° e vira "×" quando aberto.
 */
export function Faq({ itens }: { itens: readonly ItemFaq[] }) {
  return (
    <div>
      {itens.map((item, i) => (
        <details
          key={item.pergunta}
          className={`group border-t border-line py-5 ${
            i === itens.length - 1 ? 'border-b' : ''
          }`}
        >
          <summary className="font-display flex cursor-pointer justify-between gap-4 text-[clamp(16px,1.8vw,19px)] font-bold tracking-[0.03em] text-forest uppercase">
            {item.pergunta}
            <span
              aria-hidden="true"
              className="text-natural transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3.5 max-w-[66ch] text-[15px] leading-[1.7] text-muted">
            {item.resposta}
          </p>
        </details>
      ))}
    </div>
  )
}
