import { useMemo } from 'react';
import Icon from './Icon';

const GROUPS = [
  { key: 'frontend', label: 'Frontend', icon: 'monitor' },
  { key: 'backend', label: 'Backend', icon: 'database' },
  { key: 'database', label: 'Database', icon: 'database' },
  { key: 'tools', label: 'Strumenti', icon: 'settings' },
];

export default function Skills({ technologies }) {
  const grouped = useMemo(() => {
    const map = { frontend: [], backend: [], database: [], tools: [] };
    technologies.forEach((tech) => {
      const bucket = tech.type === 'devops' || tech.type === 'other' ? 'tools' : tech.type;
      if (map[bucket]) map[bucket].push(tech);
    });
    return map;
  }, [technologies]);

  const visibleGroups = GROUPS.filter((group) => grouped[group.key].length > 0);
  if (visibleGroups.length === 0) return null;

  return (
    <section className="section">
      <div className="container-narrow">
        <div className="eyebrow">Competenze</div>
        <h2 className="section-title">Gli strumenti che uso ogni giorno</h2>

        <div className="row g-4 mt-3">
          {visibleGroups.map((group) => (
            <div key={group.key} className="col-md-6 col-lg-3">
              <div className="card h-100 p-4">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <span className="icon-box">
                    <Icon name={group.icon} size={20} />
                  </span>
                  <h3 style={{ fontSize: 16 }}>{group.label}</h3>
                </div>
                <div className="d-flex flex-column gap-2">
                  {grouped[group.key].map((tech) => (
                    <div key={tech.id} className="d-flex align-items-center gap-2" style={{ fontSize: 14.5 }}>
                      <Icon name={tech.icon || 'code'} size={16} className="muted" />
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
