import { Link } from 'react-router'

export function Breadcrumb({ atual }: { atual: string }) {
  return (
    <nav
      aria-label="Trilha de navegação"
      className="mb-[26px] flex gap-2 text-[12.5px] text-muted"
    >
      <Link to="/" className="text-muted hover:text-forest">
        Início
      </Link>
      <span aria-hidden="true">/</span>
      <span className="text-forest">{atual}</span>
    </nav>
  )
}
