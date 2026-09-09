import type { CSSProperties } from 'react'

type Props = {
  /** Caminho sem a largura nem a extensão, ex.: '/equipe-em-servico'. */
  base: string
  /** Larguras reais disponíveis, da menor para a maior. */
  larguras: readonly number[]
  alt: string
  /** Proporção da caixa, ex.: '16 / 10' — mesma API do MediaSlot. */
  ratio: string
  /** Largura renderizada por faixa, para o navegador escolher a variante. */
  sizes: string
  className?: string
  style?: CSSProperties
}

/**
 * Foto real, no lugar de um MediaSlot.
 *
 * Entrega a mesma imagem em várias larguras e deixa o navegador escolher pela
 * largura renderizada e pela densidade da tela — sem isso, o celular baixaria
 * o arquivo pensado para o desktop.
 *
 * A proporção fica na caixa (não no arquivo) e o recorte é por `object-cover`:
 * a foto nunca distorce, e um ajuste de layout não exige reexportar o asset.
 */
export function Foto({
  base,
  larguras,
  alt,
  ratio,
  sizes,
  className = '',
  style,
}: Props) {
  const maior = larguras[larguras.length - 1]
  const [largura, altura] = ratio.split('/').map((n) => Number(n.trim()))

  return (
    <img
      src={`${base}-${maior}.jpg`}
      srcSet={larguras.map((w) => `${base}-${w}.jpg ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={maior}
      height={Math.round((maior * altura) / largura)}
      loading="lazy"
      decoding="async"
      className={`w-full rounded-xl object-cover ${className}`}
      style={{ aspectRatio: ratio, ...style }}
    />
  )
}
