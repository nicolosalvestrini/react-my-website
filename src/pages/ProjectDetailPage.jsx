import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import TechIcon from '../components/TechIcon';
import Gallery from '../components/Gallery';
import { getProject } from '../api/client';
import { usePortfolioData } from '../context/PortfolioDataContext';

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  database: 'Database',
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { data } = usePortfolioData();
  const [state, setState] = useState({ slug: null, project: null, status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    getProject(slug)
      .then((project) => {
        if (cancelled) return;
        document.title = `${project.title} | Nicolò Salvestrini`;
        setState({ slug, project, status: 'ready' });
      })
      .catch((error) => {
        if (!cancelled) setState({ slug, project: null, status: error.status === 404 ? 'missing' : 'error' });
      });
    return () => { cancelled = true; };
  }, [slug]);

  const status = state.slug === slug ? state.status : 'loading';
  const project = state.slug === slug ? state.project : null;

  if (status === 'loading') {
    return (
      <section className="section">
        <div className="container-narrow"><p>Caricamento del progetto…</p></div>
      </section>
    );
  }

  if (status !== 'ready') {
    return (
      <section className="section">
        <div className="container-narrow text-center" style={{ maxWidth: 560 }}>
          <h1 className="section-title">{status === 'missing' ? 'Progetto non trovato' : 'Qualcosa è andato storto'}</h1>
          <p className="mb-4">
            {status === 'missing'
              ? 'Il progetto che cerchi non esiste o è stato rimosso.'
              : 'Non riesco a caricare il progetto in questo momento. Riprova tra poco.'}
          </p>
          <Link to="/progetti" className="btn-brand btn-primary">Tutti i progetti</Link>
        </div>
      </section>
    );
  }

  const images = project.images.length > 0
    ? project.images
    : (project.image_url ? [{ id: 'cover', image_url: project.image_url, caption: null }] : []);
  const paragraphs = (project.details || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const all = data.projects;
  const index = all.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index > -1 && index < all.length - 1 ? all[index + 1] : null;

  return (
    <>
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="container-narrow">
          <Link to="/progetti" className="muted d-inline-flex align-items-center gap-2 mb-4" style={{ fontSize: 14.5 }}>
            <Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} />
            Tutti i progetti
          </Link>

          <div className="row gx-lg-5 gy-5 align-items-start">
            <div className="col-lg-5 fade-up">
              <span className="tag tag--purple mb-3">{CATEGORY_LABELS[project.category] || project.category}</span>
              <h1 style={{ fontSize: 'clamp(30px, 4.4vw, 44px)', marginBottom: 16 }}>{project.title}</h1>
              <p style={{ fontSize: 17 }}>{project.description}</p>

              <div className="d-flex flex-wrap gap-2 my-4">
                {project.technologies.map((tech) => (
                  <span key={tech.id} className="tag d-inline-flex align-items-center gap-1">
                    <TechIcon name={tech.name} size={13} />
                    {tech.name}
                  </span>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-3">
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-brand btn-primary">
                    Demo live
                    <Icon name="external" size={16} />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-brand btn-outline">
                    Codice su GitHub
                    <Icon name="github" size={16} />
                  </a>
                )}
              </div>
            </div>

            <div className="col-lg-7 fade-up fade-up--2">
              <Gallery key={project.slug} images={images} title={project.title} />
            </div>
          </div>
        </div>
      </section>

      {(paragraphs.length > 0 || project.features.length > 0) && (
        <section className="section--tight">
          <div className="container-narrow">
            <div className="row g-4">
              {paragraphs.length > 0 && (
                <div className="col-lg-7">
                  <div className="card p-4 p-md-5 h-100">
                    <h2 style={{ fontSize: 24, marginBottom: 16 }}>Sul progetto</h2>
                    {paragraphs.map((text, i) => (
                      <p key={i} style={{ marginBottom: 14, fontSize: 16 }}>{text}</p>
                    ))}
                  </div>
                </div>
              )}
              {project.features.length > 0 && (
                <div className={paragraphs.length > 0 ? 'col-lg-5' : 'col-12'}>
                  <div className="card p-4 p-md-5 h-100">
                    <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funzionalità</h2>
                    <ul className="list-unstyled mb-0 d-grid gap-3">
                      {project.features.map((feature) => (
                        <li key={feature} className="d-flex gap-3" style={{ color: 'var(--muted)', fontSize: 15.5 }}>
                          <span style={{ color: 'var(--green)', flexShrink: 0 }} aria-hidden="true">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {(prev || next) && (
        <section className="section--tight">
          <div className="container-narrow">
            <div className="row g-4">
              {[prev && { p: prev, label: 'Progetto precedente' }, next && { p: next, label: 'Progetto successivo' }]
                .filter(Boolean)
                .map(({ p, label }) => (
                  <div key={p.id} className={prev && next ? 'col-md-6' : 'col-12'}>
                    <Link to={`/progetti/${p.slug}`} className="card hover-lift d-block p-4 h-100">
                      <div className="muted" style={{ fontSize: 13 }}>{label}</div>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 19, marginTop: 4 }}>{p.title}</div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      <div style={{ height: 40 }} />
    </>
  );
}
