import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/progetti', label: 'Progetti' },
  { to: '/servizi', label: 'Servizi' },
  { to: '/competenze', label: 'Competenze' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/testimonianze', label: 'Testimonianze' },
  { to: '/contatti', label: 'Contatti' },
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

  const linkStyle = ({ isActive }) => ({
    fontSize: 15,
    color: isActive ? 'var(--text)' : 'var(--muted)',
    fontWeight: isActive ? 700 : 500,
  });

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
        <Link to="/" className="d-flex align-items-center gap-2" style={{ fontWeight: 800, fontSize: 20, whiteSpace: "nowrap" }}>
          <span style={{ color: 'var(--blue)' }}>NS</span>
          <span>Web Craft</span>
        </Link>

        <nav className="d-none d-xl-flex align-items-center gap-4">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} style={linkStyle}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contatti" className="btn-brand btn-primary d-none d-xl-inline-flex">
          Parliamo del tuo progetto
        </Link>

        <button
          type="button"
          className="btn-brand btn-outline d-xl-none"
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
        <nav className="d-xl-none" style={{ borderTop: '1px solid var(--border)', background: 'var(--panel)' }}>
          <div className="container-narrow d-flex flex-column py-3 gap-3">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={handleNavClick} style={linkStyle}>
                {link.label}
              </NavLink>
            ))}
            <Link to="/contatti" onClick={handleNavClick} className="btn-brand btn-primary justify-content-center">
              Parliamo del tuo progetto
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
