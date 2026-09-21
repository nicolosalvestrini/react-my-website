import { useState } from 'react';
import Icon from './Icon';
import { submitTestimonial } from '../api/client';

const EMPTY_FORM = { author_name: '', author_role: '', message: '', rating: 5, website: '' };

export default function TestimonialForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');

  const update = (field) => (event) => setForm((f) => ({ ...f, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setErrors({});
    setFeedback('');

    try {
      const response = await submitTestimonial(form);
      setStatus('success');
      setFeedback(response.message);
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus('error');
      setErrors(error.errors || {});
      setFeedback(error.message);
    }
  };

  return (
    <div className="mb-4">
      <form className="card p-4" onSubmit={handleSubmit}>
        <h3 style={{ fontSize: 20, marginBottom: 4 }}>Racconta la tua esperienza</h3>
        <p className="muted mb-3" style={{ fontSize: 14 }}>
          La testimonianza verrà pubblicata dopo una rapida verifica.
        </p>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control-brand"
                placeholder="Nome e cognome"
                value={form.author_name}
                onChange={update('author_name')}
                maxLength={100}
                required
              />
              {errors.author_name && <FieldError message={errors.author_name[0]} />}
            </div>
            <div className="col-md-6">
              <input
                className="form-control-brand"
                placeholder="Ruolo o azienda (facoltativo)"
                value={form.author_role}
                onChange={update('author_role')}
                maxLength={150}
              />
              {errors.author_role && <FieldError message={errors.author_role[0]} />}
            </div>
            <div className="col-12">
              <textarea
                className="form-control-brand"
                placeholder="La tua testimonianza (almeno 20 caratteri)"
                rows={5}
                value={form.message}
                onChange={update('message')}
                minLength={20}
                maxLength={1000}
                required
              />
              {errors.message && <FieldError message={errors.message[0]} />}
            </div>
            <div className="col-12 d-flex align-items-center gap-3">
              <span className="muted" style={{ fontSize: 14 }}>Valutazione</span>
              <div role="radiogroup" aria-label="Valutazione" className="d-flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={form.rating === value}
                    aria-label={`${value} su 5`}
                    onClick={() => setForm((f) => ({ ...f, rating: value }))}
                    style={{ background: 'none', border: 'none', padding: 2, cursor: 'pointer', color: value <= form.rating ? '#f5b301' : 'var(--border)' }}
                  >
                    <Icon name="star" size={24} style={{ fill: value <= form.rating ? 'currentColor' : 'none' }} />
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              name="website"
              value={form.website}
              onChange={update('website')}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
            />
          </div>

          {status === 'success' && <div className="mt-3" style={{ color: 'var(--green)', fontSize: 14.5 }}>{feedback}</div>}
          {status === 'error' && <div className="mt-3" style={{ color: '#ff7a7a', fontSize: 14.5 }}>{feedback}</div>}

          <button type="submit" className="btn-brand btn-primary mt-4" disabled={status === 'sending'}>
            {status === 'sending' ? 'Invio in corso…' : 'Invia testimonianza'}
            <Icon name="arrow" size={16} />
          </button>
        </form>
    </div>
  );
}

function FieldError({ message }) {
  return <div style={{ color: '#ff7a7a', fontSize: 12.5, marginTop: 4 }}>{message}</div>;
}
