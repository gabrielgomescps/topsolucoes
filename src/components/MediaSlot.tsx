import type { CSSProperties, ReactNode } from 'react'

type Props = {
  /** Texto do marcador — descreve a foto que entra aqui. */
  children: ReactNode
  /** Proporção da caixa, ex.: '4 / 5'. */
  ratio: string
  /** Hachura escura, para usar dentro das faixas Deep Forest. */
  dark?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * Espaço reservado para foto real. Enquanto o cliente não envia as imagens,
 * a área fica hachurada e legendada — nunca preenchida com banco de imagens.
 */
export function MediaSlot({
  children,
  ratio,
  dark = false,
  className = '',
  style,
}: Props) {
  return (
    <div
      className={`media-slot ${dark ? 'media-slot-dark' : ''} ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    >
      <span className="media-slot-caption">{children}</span>
    </div>
  )
}
