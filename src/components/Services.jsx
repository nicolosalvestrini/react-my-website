import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function Services({ services, limit, viewAllHref }) {
  if (services.length === 0) return null;

  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="section" style={{ background: 'var(--panel)' }}>
      <div className="container-narrow">
        <div className="eyebrow">Servizi</div>
        <h2 className="section-title">Come posso aiutarti</h2>
        <p className="section-subtitle">
          Dalla prima idea al sito online: mi occupo di ogni fase dello sviluppo, con soluzioni su misura per le tue esigenze.
        </p>

        <div className="row g-4">
          {list.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card hover-lift h-100 p-4">
                <div className="icon-box icon-box--purple mb-3">
                  <Icon name={service.icon || 'code'} size={22} />
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{service.title}</h3>
                <p style={{ fontSize: 14.5 }}>{service.description}</p>
                <Link to="/contatti" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>
                  Richiedi un preventivo
                  <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {viewAllHref && (
          <div className="text-center mt-5">
            <Link to={viewAllHref} className="btn-brand btn-outline">
              Vedi tutti i servizi
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
