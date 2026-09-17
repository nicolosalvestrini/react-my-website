import { useState } from 'react';
import Icon from './Icon';
import { submitContactForm } from '../api/client';

const REQUEST_TYPES = [
  { value: '', label: 'Tipo di richiesta' },
  { value: 'preventivo', label: 'Preventivo' },
  { value: 'collaborazione', label: 'Collaborazione' },
  { value: 'lavoro', label: 'Opportunità di lavoro' },
  { value: 'informazioni', label: 'Informazioni' },
  { value: 'altro', label: 'Altro' },
];

const EMPTY_FORM = { name: '', email: '', request_type: '', message: '' };

export default function ContactForm({ settings }) {
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
      const response = await submitContactForm(form);
      setStatus('success');
      setFeedback(response.message || 'Messaggio inviato correttamente.');
      setForm(EMPTY_FORM);
    } catch (error) {
      setStatus('error');
      setErrors(error.errors || {});
      setFeedback(error.message || "Non è stato possibile inviare il messaggio. Riprova più tardi.");
    }
  };

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="eyebrow">Contatti</div>
        <h2 className="section-title mb-4">Hai un progetto o un'opportunità per me?</h2>

        <div className="row g-4">
          <div className="col-lg-7">
            <form className="card p-4" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    className="form-control-brand"
                    placeholder="Nome e cognome"
                    value={form.name}
                    onChange={update('name')}
                    required
                  />
                  {errors.name && <FieldError message={errors.name[0]} />}
                </div>
                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control-brand"
                    placeholder="Email"
                    value={form.email}
                    onChange={update('email')}
                    required
                  />
                  {errors.email && <FieldError message={errors.email[0]} />}
                </div>
                <div className="col-12">
                  <select className="form-select-brand" value={form.request_type} onChange={update('request_type')} required>
                    {REQUEST_TYPES.map((option) => (
                      <option key={option.value} value={option.value} disabled={option.value === ''}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.request_type && <FieldError message={errors.request_type[0]} />}
                </div>
                <div className="col-12">
                  <textarea
                    className="form-control-brand"
                    placeholder="Scrivi il tuo messaggio"
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    required
                  />
                  {errors.message && <FieldError message={errors.message[0]} />}
                </div>
              </div>

              {status === 'success' && (
                <div className="mt-3" style={{ color: 'var(--green)', fontSize: 14.5 }}>{feedback}</div>
              )}
              {status === 'error' && (
                <div className="mt-3" style={{ color: '#ff7a7a', fontSize: 14.5 }}>{feedback}</div>
              )}

              <button type="submit" className="btn-brand btn-primary mt-4" disabled={status === 'sending'}>
                {status === 'sending' ? 'Invio in corso…' : 'Contattami'}
                <Icon name="arrow" size={16} />
              </button>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="card p-4 h-100">
              <p style={{ marginBottom: 16 }}>Oppure contattami su</p>
              <div className="d-flex flex-column gap-3">
                {settings.linkedin_url && (
                  <SocialLink href={settings.linkedin_url} icon="linkedin" label="LinkedIn" />
                )}
                {settings.github_url && (
                  <SocialLink href={settings.github_url} icon="github" label="GitHub" />
                )}
                {settings.contact_email && (
                  <SocialLink href={`mailto:${settings.contact_email}`} icon="mail" label={settings.contact_email} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({ message }) {
  return <div style={{ color: '#ff7a7a', fontSize: 12.5, marginTop: 4 }}>{message}</div>;
}

function SocialLink({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-3" style={{ fontSize: 14.5 }}>
      <span className="icon-box">
        <Icon name={icon} size={18} />
      </span>
      {label}
    </a>
  );
}
