import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import Stars from './Stars';
import TestimonialForm from './TestimonialForm';

function summarize(testimonials) {
  const rated = testimonials.filter((t) => t.rating > 0);
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  rated.forEach((t) => { counts[t.rating] += 1; });
  const average = rated.length ? rated.reduce((sum, t) => sum + t.rating, 0) / rated.length : 0;
  return { average, counts, total: rated.length };
}

export default function Testimonials({ testimonials, showCta = false, withForm = false }) {
  const [formOpen, setFormOpen] = useState(false);
  const { average, counts, total } = summarize(testimonials);
  const averageLabel = average.toFixed(1).replace('.', ',');

  return (
    <section className="section" style={{ background: 'var(--panel)' }}>
      <div className="container-narrow">
        <div className="eyebrow">Cosa dicono di me</div>
        <h2 className="section-title mb-4">Testimonianze</h2>

        <div className="card p-4 p-md-5 mb-4">
          <div className="row g-4 align-items-center">
            <div className="col-md-4 text-center">
              <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, color: 'var(--text)' }}>
                {total ? averageLabel : '–'}
              </div>
              <div className="mt-2 mb-1">
                <Stars value={average} size={22} />
              </div>
              <div className="muted" style={{ fontSize: 14 }}>
                {total === 0 ? 'Nessuna valutazione' : total === 1 ? '1 valutazione' : `${total} valutazioni`}
              </div>
            </div>

            <div className="col-md-5">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="d-flex align-items-center gap-2 mb-1" style={{ fontSize: 13 }}>
                  <span className="muted" style={{ width: 10, textAlign: 'right' }}>{star}</span>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--border)', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: total ? `${(counts[star] / total) * 100}%` : 0,
                        height: '100%',
                        background: '#f5b301',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-3 text-md-end text-center">
              {withForm ? (
                <button
                  type="button"
                  className="btn-brand btn-primary"
                  onClick={() => setFormOpen((open) => !open)}
                  aria-expanded={formOpen}
                >
                  <Icon name="star" size={16} />
                  {formOpen ? 'Chiudi' : 'Scrivi una testimonianza'}
                </button>
              ) : (
                showCta && (
                  <Link to="/testimonianze" className="btn-brand btn-primary">
                    <Icon name="star" size={16} />
                    Scrivi una testimonianza
                  </Link>
                )
              )}
            </div>
          </div>
        </div>

        {withForm && formOpen && <TestimonialForm />}

        {testimonials.length === 0 ? (
          <div
            className="card d-flex flex-column align-items-center text-center p-5"
            style={{ borderStyle: 'dashed' }}
          >
            <Icon name="message" size={26} className="muted mb-2" />
            <p style={{ maxWidth: 420 }}>
              Non ci sono ancora testimonianze: se hai lavorato con me, sarò felice di leggere la tua!
            </p>
          </div>
        ) : (
          <div className="row g-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="col-md-6 col-lg-4">
                <div className="card h-100 p-4">
                  <div className="d-flex align-items-center gap-3 mb-3">
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
                  {testimonial.rating > 0 && (
                    <div className="mb-2">
                      <Stars value={testimonial.rating} size={16} />
                    </div>
                  )}
                  <p style={{ fontSize: 14.5, marginBottom: 0 }}>{testimonial.message}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
