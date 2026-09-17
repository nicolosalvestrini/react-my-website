import { useMemo, useState } from 'react';
import Icon from './Icon';

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  database: 'Database',
};

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('tutti');

  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return ['tutti', ...Object.keys(CATEGORY_LABELS).filter((c) => present.has(c))];
  }, [projects]);

  const filtered = filter === 'tutti' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="progetti" className="section">
      <div className="container-narrow">
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-4 mb-4">
          <div>
            <div className="eyebrow">Progetti in evidenza</div>
            <h2 className="section-title">Cosa ho costruito finora</h2>
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className="btn-brand"
                style={{
                  padding: '9px 16px',
                  fontSize: 14,
                  background: filter === cat ? 'var(--blue)' : 'var(--panel)',
                  color: filter === cat ? '#fff' : 'var(--muted)',
                  border: `1px solid ${filter === cat ? 'var(--blue)' : 'var(--border)'}`,
                }}
              >
                {cat === 'tutti' ? 'Tutti' : CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p>Nessun progetto in questa categoria, per ora.</p>
        ) : (
          <div className="row g-4">
            {filtered.map((project) => (
              <div key={project.id} className="col-md-6 col-lg-4">
                <article className="card hover-lift h-100 d-flex flex-column overflow-hidden">
                  <div
                    style={{
                      height: 150,
                      background: project.image_url
                        ? `center/cover no-repeat url(${project.image_url})`
                        : 'linear-gradient(135deg, rgba(40,112,255,0.25), rgba(171,138,255,0.25))',
                      position: 'relative',
                    }}
                  >
                    <span
                      className="tag tag--purple"
                      style={{ position: 'absolute', top: 14, left: 14 }}
                    >
                      {CATEGORY_LABELS[project.category] || project.category}
                    </span>
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <h3 style={{ fontSize: 19, marginBottom: 8 }}>{project.title}</h3>
                    <p style={{ fontSize: 14.5, flexGrow: 1 }}>{project.description}</p>
                    <div className="d-flex flex-wrap gap-2 my-3">
                      {project.technologies.map((tech) => (
                        <span key={tech.id} className="tag">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex gap-3 mt-auto">
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="btn-brand btn-outline" style={{ padding: '8px 14px', fontSize: 13.5 }}>
                          Demo live
                          <Icon name="external" size={15} />
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-brand btn-outline" style={{ padding: '8px 14px', fontSize: 13.5 }}>
                          Codice
                          <Icon name="github" size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
