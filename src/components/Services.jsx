import Icon from './Icon';

export default function Services({ services }) {
  if (services.length === 0) return null;

  return (
    <section id="servizi" className="section" style={{ background: 'var(--panel)' }}>
      <div className="container-narrow">
        <div className="eyebrow">Servizi</div>
        <h2 className="section-title">Come posso aiutarti</h2>
        <p className="section-subtitle">
          Dalla prima idea al sito online: mi occupo di ogni fase dello sviluppo, con soluzioni su misura per le tue esigenze.
        </p>

        <div className="row g-4">
          {services.map((service) => (
            <div key={service.id} className="col-md-6 col-lg-4">
              <div className="card hover-lift h-100 p-4">
                <div className="icon-box icon-box--purple mb-3">
                  <Icon name={service.icon || 'code'} size={22} />
                </div>
                <h3 style={{ fontSize: 18, marginBottom: 8 }}>{service.title}</h3>
                <p style={{ fontSize: 14.5 }}>{service.description}</p>
                <a href="#contatti" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 16, color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>
                  Richiedi un preventivo
                  <Icon name="arrow" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
