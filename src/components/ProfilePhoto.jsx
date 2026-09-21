import Icon from './Icon';
import { API_URL } from '../api/client';

export default function ProfilePhoto({ settings, size = 120 }) {
  const path = settings.hero_photo;
  const url = path ? (path.startsWith('http') ? path : `${API_URL}/storage/${path}`) : null;

  if (!url) {
    return (
      <div className="icon-box icon-box--purple" style={{ width: 56, height: 56, borderRadius: 16, flexShrink: 0 }}>
        <Icon name="briefcase" size={26} />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt="Nicolò Salvestrini"
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        borderRadius: 24,
        objectFit: 'cover',
        objectPosition: 'center 20%',
        border: '1px solid var(--border)',
        flexShrink: 0,
      }}
    />
  );
}
