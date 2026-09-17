import Icon from './Icon';

const REASONS = [
  {
    icon: 'eye',
    title: 'Attenzione ai dettagli',
    description: 'Scrivo codice pulito e curato, con attenzione alla qualità e ai particolari.',
  },
  {
    icon: 'message',
    title: 'Comunicazione chiara',
    description: 'Ascolto le esigenze e mantengo una comunicazione trasparente in ogni fase del progetto.',
  },
  {
    icon: 'monitor',
    title: 'Soluzioni responsive',
    description: 'Creo soluzioni che funzionano perfettamente su ogni dispositivo.',
  },
  {
    icon: 'check',
    title: 'Supporto dopo la consegna',
    description: 'Resto al tuo fianco anche dopo la consegna, per assistenza e miglioramenti.',
  },
];

export default function WhyMe() {
  return (
    <section className="section--tight">
      <div className="container-narrow">
        <div className="eyebrow">Perché lavorare con me</div>
        <h2 className="section-title mb-4">Cosa puoi aspettarti</h2>

        <div className="row g-4">
          {REASONS.map((reason) => (
            <div key={reason.title} className="col-md-6 col-lg-3">
              <div className="card h-100 p-4">
                <div className="icon-box mb-3">
                  <Icon name={reason.icon} size={20} />
                </div>
                <h3 style={{ fontSize: 16, marginBottom: 8 }}>{reason.title}</h3>
                <p style={{ fontSize: 14 }}>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
