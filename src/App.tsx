import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { WhatsappFab } from './components/WhatsappFab'
import { Home } from './pages/Home'
import { Servicos } from './pages/Servicos'
import { Contato } from './pages/Contato'
import { NotFound } from './pages/NotFound'

/** Trocar de rota volta ao topo, como o `go()` do design fazia. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function App() {
  return (
    <div className="max-w-[100vw]">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <WhatsappFab />
    </div>
  )
}
