import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WhatsappFab } from './components/WhatsappFab'
import { Home } from './pages/Home'
import { Servicos } from './pages/Servicos'
import { Contato } from './pages/Contato'
import { NotFound } from './pages/NotFound'

/**
 * Trocar de rota volta ao topo, como o `go()` do design fazia.
 *
 * O `behavior: 'instant'` é necessário: o CSS tem `scroll-behavior: smooth`
 * para os links âncora, e sem isso cada navegação vira uma rolagem animada da
 * página nova a partir da altura em que a anterior estava.
 *
 * O foco também precisa voltar para o conteúdo — o link clicado sai da árvore
 * junto com a página antiga, e quem navega por teclado ou leitor de tela
 * ficaria sem posição.
 */
function AoTrocarDeRota() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })

    const conteudo = document.querySelector('main')
    conteudo?.focus({ preventScroll: true })
  }, [pathname])

  return null
}

export function App() {
  return (
    <div className="max-w-[100vw]">
      <AoTrocarDeRota />
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <div id="conteudo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <WhatsappFab />
    </div>
  )
}
