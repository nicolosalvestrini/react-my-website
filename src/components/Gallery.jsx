import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Gallery({ images, title }) {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const total = images.length;

  const go = useCallback((step) => setCurrent((i) => (i + step + total) % total), [total]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, go]);

  if (total === 0) return null;
  const image = images[current];

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ingrandisci lo screenshot"
        style={{
          display: 'block',
          width: '100%',
          padding: 0,
          border: '1px solid var(--border)',
          borderRadius: 16,
          overflow: 'hidden',
          background: 'var(--panel)',
          cursor: 'zoom-in',
        }}
      >
        <img
          src={image.image_url}
          alt={image.caption || `${title} – screenshot ${current + 1}`}
          style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'contain', background: '#050b18' }}
        />
      </button>

      {(image.caption || total > 1) && (
        <div className="d-flex justify-content-between gap-3 mt-2" style={{ fontSize: 13.5 }}>
          <span className="muted">{image.caption}</span>
          {total > 1 && <span className="muted">{current + 1} / {total}</span>}
        </div>
      )}

      {total > 1 && (
        <div className="d-flex gap-2 mt-3" style={{ overflowX: 'auto', paddingBottom: 6 }}>
          {images.map((thumb, index) => (
            <button
              key={thumb.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Mostra screenshot ${index + 1}`}
              aria-current={index === current}
              style={{
                flex: '0 0 auto',
                width: 112,
                padding: 0,
                borderRadius: 10,
                overflow: 'hidden',
                border: `2px solid ${index === current ? 'var(--purple)' : 'var(--border)'}`,
                opacity: index === current ? 1 : 0.65,
                background: 'var(--panel)',
                cursor: 'pointer',
              }}
            >
              <img src={thumb.image_url} alt="" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {open && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot ingrandito"
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(2, 8, 20, 0.94)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi" style={overlayButton({ top: 16, right: 16 })}>
            ×
          </button>
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); go(-1); }}
                aria-label="Precedente"
                style={overlayButton({ left: 16, top: '50%' })}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(event) => { event.stopPropagation(); go(1); }}
                aria-label="Successivo"
                style={overlayButton({ right: 16, top: '50%' })}
              >
                ›
              </button>
            </>
          )}
          <figure style={{ margin: 0, maxWidth: '92vw', maxHeight: '90vh', textAlign: 'center' }} onClick={(event) => event.stopPropagation()}>
            <img
              src={image.image_url}
              alt={image.caption || `${title} – screenshot ${current + 1}`}
              style={{ maxWidth: '92vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: 8 }}
            />
            {image.caption && <figcaption style={{ color: '#c8d2e8', marginTop: 12, fontSize: 14.5 }}>{image.caption}</figcaption>}
          </figure>
        </div>,
        document.body,
      )}
    </div>
  );
}

function overlayButton(position) {
  return {
    position: 'absolute',
    ...position,
    width: 46,
    height: 46,
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.25)',
    background: 'rgba(9, 26, 52, 0.9)',
    color: '#fff',
    fontSize: 26,
    lineHeight: 1,
    cursor: 'pointer',
  };
}
