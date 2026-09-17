import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="container-narrow">
        <div className="eyebrow">404</div>
        <h1 className="section-title">Pagina non trovata</h1>
        <p className="section-subtitle" style={{ margin: '0 auto 24px' }}>
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link to="/" className="btn-brand btn-primary">
          Torna alla home
        </Link>
      </div>
    </section>
  );
}
