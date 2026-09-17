import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#chi-sono', label: 'Chi sono' },
  { href: '#progetti', label: 'Progetti' },
  { href: '#servizi', label: 'Servizi' },
  { href: '#competenze', label: 'Competenze' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#contatti', label: 'Contatti' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setOpen(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <div className="container-narrow d-flex align-items-center justify-content-between" style={{ height: 76 }}>
        <a href="#home" className="d-flex align-items-center gap-2" style={{ fontWeight: 800, fontSize: 20 }}>
          <span style={{ color: 'var(--blue)' }}>NS</span>
          <span>Web Craft</span>
        </a>

        <nav className="d-none d-lg-flex align-items-center gap-4">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ fontSize: 15, color: 'var(--muted)', fontWeight: 500 }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contatti" className="btn-brand btn-primary d-none d-lg-inline-flex">
          Parliamo del tuo progetto
        </a>

        <button
          type="button"
          className="btn-brand btn-outline d-lg-none"
          style={{ padding: '8px 12px' }}
          aria-label="Apri il menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="d-lg-none" style={{ borderTop: '1px solid var(--border)', background: 'var(--panel)' }}>
          <div className="container-narrow d-flex flex-column py-3 gap-3">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick} style={{ fontSize: 16, padding: '4px 0' }}>
                {link.label}
              </a>
            ))}
            <a href="#contatti" onClick={handleNavClick} className="btn-brand btn-primary justify-content-center">
              Parliamo del tuo progetto
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
