import { useEffect } from 'react'

/**
 * Título e descrição por rota. O canvas só tinha um <helmet> porque as três
 * telas viviam no mesmo arquivo; com rotas reais, cada uma precisa da sua.
 */
export function usePageMeta(titulo: string, descricao: string) {
  useEffect(() => {
    document.title = titulo

    const tag = document.querySelector('meta[name="description"]')
    if (tag) tag.setAttribute('content', descricao)
  }, [titulo, descricao])
}
