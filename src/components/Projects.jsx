import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';
import TechIcon, { getTechColor } from './TechIcon';

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  backend: 'Backend',
  fullstack: 'Full Stack',
  database: 'Database',
};

const TECH_PRIORITY = ['Laravel', 'React', 'Node.js', 'PHP', 'Express', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'];

function getPrimaryTech(technologies) {
  for (const name of TECH_PRIORITY) {
    const found = technologies.find((t) => t.name === name);
    if (found) return found;
  }
  return technologies[0] || null;
}

export default function Projects({ projects, teaser = false, limit, viewAllHref }) {
  const [filter, setFilter] = useState('tutti');

  const categories = useMemo(() => {
    const present = new Set(projects.map((p) => p.category));
    return ['tutti', ...Object.keys(CATEGORY_LABELS).filter((c) => present.has(c))];
  }, [projects]);

  let list = teaser ? projects.filter((p) => p.is_featured) : projects;
  if (teaser && list.length === 0) list = projects;
  if (!teaser) list = filter === 'tutti' ? projects : projects.filter((p) => p.category === filter);
  if (limit) list = list.slice(0, limit);

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="d-flex flex-wrap align-items-end justify-content-between gap-4 mb-4">
          <div>
            <div className="eyebrow">Progetti in evidenza</div>
            <h2 className="section-title">Cosa ho costruito finora</h2>
          </div>

          {!teaser && (
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
          )}
        </div>

        {list.length === 0 ? (
          <p>Nessun progetto in questa categoria, per ora.</p>
        ) : (
          <div className="row g-4">
            {list.map((project) => {
              const primaryTech = getPrimaryTech(project.technologies);
              const primaryColor = primaryTech ? getTechColor(primaryTech.name) : 'var(--purple)';

              return (
                <div key={project.id} className="col-md-6 col-lg-4">
                  <article className="card hover-lift h-100 d-flex flex-column overflow-hidden">
                    <div
                      style={{
                        height: 190,
                        position: 'relative',
                        overflow: 'hidden',
                        background: project.image_url
                          ? undefined
                          : `linear-gradient(135deg, ${primaryColor}26, var(--panel-2))`,
                      }}
                    >
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        primaryTech && (
                          <div
                            style={{
                              position: 'absolute',
                              right: -16,
                              bottom: -20,
                              opacity: 0.22,
                            }}
                          >
                            <TechIcon name={primaryTech.name} size={130} />
                          </div>
                        )
                      )}
                      <span className="tag tag--purple" style={{ position: 'absolute', top: 14, left: 14, background: 'rgba(4, 16, 36, 0.88)', backdropFilter: 'blur(4px)' }}>
                        {CATEGORY_LABELS[project.category] || project.category}
                      </span>
                    </div>
                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <h3 style={{ fontSize: 19, marginBottom: 8 }}>{project.title}</h3>
                      <p className="clamp-4" style={{ fontSize: 14.5 }}>{project.description}</p>
                      <div className="d-flex flex-wrap gap-2 mt-auto pt-3 mb-3">
                        {project.technologies.map((tech) => (
                          <span key={tech.id} className="tag d-inline-flex align-items-center gap-1">
                            <TechIcon name={tech.name} size={13} />
                            {tech.name}
                          </span>
                        ))}
                      </div>
                      <div className="d-flex gap-3">
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
              );
            })}
          </div>
        )}

        {teaser && viewAllHref && (
          <div className="text-center mt-5">
            <Link to={viewAllHref} className="btn-brand btn-outline">
              Vedi tutti i progetti
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
