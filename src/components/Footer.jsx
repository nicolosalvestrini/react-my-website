import { Link } from 'react-router-dom';
import LegalModals from './LegalModals';
import Logo from './Logo';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/servizi', label: 'Servizi' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/testimonianze', label: 'Testimonianze' },
  { to: '/progetti', label: 'Progetti' },
  { to: '/contatti', label: 'Contatti' },
];

export default function Footer({ settings = {} }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0 28px' }}>
      <div className="container-narrow d-flex flex-column flex-md-row justify-content-between gap-4">
        <div>
          <Logo fontSize={18} />
          <p style={{ fontSize: 13.5, maxWidth: 280, marginTop: 8 }}>
            Sviluppo web moderno e soluzioni digitali su misura per il tuo business.
          </p>
        </div>

        <div className="d-flex gap-5">
          <div>
            <div className="muted" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 10 }}>
              NAVIGAZIONE
            </div>
            <div className="d-flex flex-column gap-2">
              {NAV.map((link) => (
                <Link key={link.to} to={link.to} style={{ fontSize: 14 }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="muted" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 10 }}>
              LEGALE
            </div>
            <div className="d-flex flex-column gap-2">
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#privacy-policy-modal"
                style={{ fontSize: 14, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', color: 'inherit' }}
              >
                Privacy Policy
              </button>
              <button
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#cookie-policy-modal"
                style={{ fontSize: 14, background: 'none', border: 'none', padding: 0, textAlign: 'left', cursor: 'pointer', color: 'inherit' }}
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-narrow d-flex flex-column flex-md-row justify-content-between gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)', fontSize: 13 }}>
        <span className="muted">© {year} Nicolò Salvestrini – Tutti i diritti riservati.</span>
      </div>

      <LegalModals contactEmail={settings.contact_email} />
    </footer>
  );
}
