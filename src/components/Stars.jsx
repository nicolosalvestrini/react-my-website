import Icon from './Icon';

const GOLD = '#f5b301';

function Row({ filled, size }) {
  return (
    <span className="d-inline-flex" style={{ gap: 2, flexShrink: 0 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon key={n} name="star" size={size} style={{ fill: filled ? 'currentColor' : 'none', flexShrink: 0 }} />
      ))}
    </span>
  );
}

/** Stelle con riempimento anche parziale (es. 4,6 → quinta stella piena al 60%). */
export default function Stars({ value, size = 16 }) {
  const percent = Math.max(0, Math.min(5, value)) * 20;

  return (
    <span
      role="img"
      aria-label={`${value.toString().replace('.', ',')} su 5`}
      style={{ position: 'relative', display: 'inline-flex', color: GOLD }}
    >
      <span style={{ opacity: 0.3 }}>
        <Row filled={false} size={size} />
      </span>
      <span style={{ position: 'absolute', inset: 0, width: `${percent}%`, overflow: 'hidden' }}>
        <Row filled size={size} />
      </span>
    </span>
  );
}
