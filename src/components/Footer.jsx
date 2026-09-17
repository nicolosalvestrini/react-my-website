const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#chi-sono', label: 'Chi sono' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#progetti', label: 'Progetti' },
  { href: '#contatti', label: 'Contatti' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '48px 0 28px' }}>
      <div className="container-narrow d-flex flex-column flex-md-row justify-content-between gap-4">
        <div>
          <div style={{ fontWeight: 800, fontSize: 18 }}>
            <span style={{ color: 'var(--blue)' }}>NS</span> Web Craft
          </div>
          <p style={{ fontSize: 13.5, maxWidth: 280, marginTop: 8 }}>
            Sviluppo web moderno e soluzioni digitali su misura per il tuo business.
          </p>
        </div>

        <div>
          <div className="muted" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 10 }}>
            NAVIGAZIONE
          </div>
          <div className="d-flex flex-column gap-2">
            {NAV.map((link) => (
              <a key={link.href} href={link.href} style={{ fontSize: 14 }}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container-narrow d-flex flex-column flex-md-row justify-content-between gap-2 mt-4 pt-4" style={{ borderTop: '1px solid var(--border)', fontSize: 13 }}>
        <span className="muted">© {year} NS Web Craft – Tutti i diritti riservati.</span>
      </div>
    </footer>
  );
}
