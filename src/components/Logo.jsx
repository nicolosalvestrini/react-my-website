export default function Logo({ size = 36, showName = true, fontSize = 19 }) {
  return (
    <span className="d-inline-flex align-items-center gap-2" style={{ whiteSpace: 'nowrap' }}>
      <span
        aria-hidden="true"
        style={{
          width: size,
          height: size,
          borderRadius: size * 0.28,
          background: 'linear-gradient(135deg, #2870ff, #ab8aff)',
          color: '#fff',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: size * 0.42,
          letterSpacing: '-0.03em',
          flexShrink: 0,
        }}
      >
        NS
      </span>
      {showName && <span style={{ fontWeight: 800, fontSize }}>Nicolò Salvestrini</span>}
    </span>
  );
}
