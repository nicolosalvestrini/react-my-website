import Icon from './Icon';

export default function Testimonials({ testimonials }) {
  return (
    <section className="section" style={{ background: 'var(--panel)' }}>
      <div className="container-narrow">
        <div className="eyebrow">Cosa dicono di me</div>
        <h2 className="section-title mb-4">Testimonianze</h2>

        {testimonials.length === 0 ? (
          <div
            className="card d-flex flex-column align-items-center text-center p-5"
            style={{ borderStyle: 'dashed' }}
          >
            <Icon name="message" size={26} className="muted mb-2" />
            <p style={{ maxWidth: 420 }}>
              Questa sezione sarà presto arricchita con testimonianze e risultati.
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="col-md-6 col-lg-4">
                <div className="card h-100 p-4">
                  <Icon name="quote" size={22} className="mb-3" style={{ color: 'var(--purple)' }} />
                  <p style={{ fontSize: 14.5, marginBottom: 16 }}>{testimonial.message}</p>
                  <div className="d-flex align-items-center gap-3 mt-auto">
                    {testimonial.avatar_url ? (
                      <img
                        src={testimonial.avatar_url}
                        alt={testimonial.author_name}
                        style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span className="icon-box icon-box--purple" style={{ borderRadius: '50%' }}>
                        {testimonial.author_name.slice(0, 1)}
                      </span>
                    )}
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14.5 }}>{testimonial.author_name}</div>
                      {testimonial.author_role && (
                        <div className="muted" style={{ fontSize: 13 }}>{testimonial.author_role}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
