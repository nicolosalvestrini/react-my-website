import { useMemo } from 'react';
import Icon from './Icon';
import { API_URL } from '../api/client';

function formatPeriod(experience) {
  const startYear = experience.period_start ? new Date(experience.period_start).getFullYear() : null;
  const endYear = experience.period_end ? new Date(experience.period_end).getFullYear() : null;
  if (!startYear) return '';
  if (!endYear) return `${startYear} – oggi`;
  if (startYear === endYear) return `${startYear}`;
  return `${startYear} – ${endYear}`;
}

export default function Resume({ experiences, settings }) {
  const formazione = useMemo(() => experiences.filter((e) => e.type === 'formazione'), [experiences]);
  const esperienza = useMemo(() => experiences.filter((e) => e.type === 'esperienza'), [experiences]);

  const cvPath = settings.cv_file_path;
  const cvUrl = cvPath ? (cvPath.startsWith('http') ? cvPath : `${API_URL}/storage/${cvPath}`) : null;
  const cvUpdatedAt = settings.cv_updated_at;

  return (
    <section className="section" style={{ background: 'var(--panel)' }}>
      <div className="container-narrow">
        <div className="eyebrow">Curriculum</div>
        <h2 className="section-title">Il mio percorso</h2>

        <div className="row g-4 mt-3">
          <div className="col-lg-4">
            <div className="card p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="icon-box icon-box--purple">
                  <Icon name="download" size={20} />
                </span>
                <div>
                  <h3 style={{ fontSize: 16 }}>Curriculum aggiornato</h3>
                  {cvUpdatedAt && <p style={{ fontSize: 13 }}>Ultimo aggiornamento: {cvUpdatedAt}</p>}
                </div>
              </div>
              {cvUrl ? (
                <div className="d-flex flex-column gap-2 mt-3">
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="btn-brand btn-outline justify-content-center">
                    Visualizza CV
                    <Icon name="eye" size={16} />
                  </a>
                  <a href={cvUrl} download className="btn-brand btn-primary justify-content-center">
                    Scarica PDF
                    <Icon name="download" size={16} />
                  </a>
                </div>
              ) : (
                <p style={{ fontSize: 13.5 }}>Il CV sarà disponibile a breve.</p>
              )}
            </div>
          </div>

          <div className="col-lg-8">
            <div className="card p-4">
              {formazione.length > 0 && (
                <TimelineGroup title="Formazione" items={formazione} />
              )}
              {esperienza.length > 0 && (
                <TimelineGroup title="Esperienze precedenti" items={esperienza} spaced={formazione.length > 0} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineGroup({ title, items, spaced }) {
  return (
    <div style={{ marginTop: spaced ? 32 : 0 }}>
      <div className="d-flex align-items-center gap-2 mb-3" style={{ color: 'var(--purple)', fontWeight: 700, fontSize: 14 }}>
        <Icon name="briefcase" size={16} />
        {title}
      </div>
      <div style={{ borderLeft: '2px solid var(--border)', marginLeft: 8 }}>
        {items.map((item) => (
          <div key={item.id} style={{ position: 'relative', paddingLeft: 24, paddingBottom: 24 }}>
            <span
              style={{
                position: 'absolute',
                left: -6,
                top: 4,
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: 'var(--purple)',
              }}
            />
            <div className="muted" style={{ fontSize: 13, marginBottom: 4 }}>
              {formatPeriod(item)}
            </div>
            <h4 style={{ fontSize: 16, marginBottom: 4 }}>{item.title}</h4>
            <p style={{ fontSize: 14 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
