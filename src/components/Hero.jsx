import Icon from './Icon';
import { API_URL } from '../api/client';

export default function Hero({ settings }) {
  const title = settings.hero_title || 'Ciao, sono un Full Stack Web Developer.';
  const subtitle = settings.hero_subtitle || 'Realizzo siti web e applicazioni su misura.';
  const availability = settings.availability_status;
  const githubUrl = settings.github_url;
  const cvPath = settings.cv_file_path;
  const cvUrl = cvPath ? (cvPath.startsWith('http') ? cvPath : `${API_URL}/storage/${cvPath}`) : null;

  return (
    <section id="home" className="section" style={{ paddingTop: 56 }}>
      <div className="container-narrow">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 52px)', color: 'var(--text)' }}>{title}</h1>
            <p style={{ marginTop: 22, fontSize: 18, maxWidth: 520 }}>{subtitle}</p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#progetti" className="btn-brand btn-primary">
                Scopri i miei progetti
                <Icon name="arrow" size={18} />
              </a>
              {cvUrl && (
                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="btn-brand btn-outline">
                  Scarica il CV
                  <Icon name="download" size={18} />
                </a>
              )}
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="btn-brand btn-outline">
                  GitHub
                  <Icon name="github" size={18} />
                </a>
              )}
            </div>

            {availability && (
              <div className="badge-pill mt-4">
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                {availability}
              </div>
            )}
          </div>

          <div className="col-lg-6">
            <div
              className="hover-lift"
              style={{
                position: 'relative',
                borderRadius: 24,
                border: '1px solid var(--border)',
                background: 'linear-gradient(160deg, var(--panel), var(--panel-2))',
                aspectRatio: '4 / 4.2',
                maxWidth: 420,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'radial-gradient(circle at 30% 20%, rgba(40,112,255,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(171,138,255,0.25), transparent 55%)',
                }}
              />
              <span style={{ fontSize: 96, fontWeight: 800, color: 'rgba(242,244,255,0.14)', position: 'relative' }}>NS</span>
              <span
                className="icon-box icon-box--purple"
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                }}
              >
                <Icon name="code" size={26} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
