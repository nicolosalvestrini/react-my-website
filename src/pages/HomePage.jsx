import { Link } from 'react-router-dom';
import { usePortfolioData } from '../context/PortfolioDataContext';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Services from '../components/Services';
import WhyMe from '../components/WhyMe';
import Testimonials from '../components/Testimonials';
import Icon from '../components/Icon';
import ProfilePhoto from '../components/ProfilePhoto';

const HERO_TECH_PRIORITY = ['React', 'Laravel', 'Node.js', 'MySQL', 'JavaScript', 'PHP'];

export default function HomePage() {
  const { data } = usePortfolioData();
  const { settings, projects, services, technologies, testimonials } = data;
  const aboutPreview = settings.about_text ? settings.about_text.split('\n').filter(Boolean)[0] : null;
  const heroTechs = HERO_TECH_PRIORITY.map((name) => technologies.find((t) => t.name === name)).filter(Boolean);

  return (
    <>
      <Hero settings={settings} technologies={heroTechs} />

      {aboutPreview && (
        <section className="section--tight">
          <div className="container-narrow">
            <div className="card d-flex flex-column flex-md-row gap-4 p-4 p-md-5">
              <ProfilePhoto settings={settings} size={120} />
              <div>
                <h2 className="section-title" style={{ fontSize: 24, marginBottom: 14 }}>
                  Chi sono
                </h2>
                <p style={{ marginBottom: 16 }}>{aboutPreview}</p>
                <Link to="/chi-sono" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>
                  Scopri di più
                  <Icon name="arrow" size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <Projects projects={projects} teaser limit={3} viewAllHref="/progetti" />
      <Services services={services} limit={3} viewAllHref="/servizi" />
      <WhyMe />
      <Testimonials testimonials={testimonials} showCta />

      <section className="section--tight">
        <div className="container-narrow">
          <div
            className="card d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 p-4 p-md-5"
            style={{ background: 'linear-gradient(135deg, rgba(40,112,255,0.14), rgba(171,138,255,0.14))' }}
          >
            <div>
              <h2 className="section-title" style={{ fontSize: 26 }}>
                Hai un progetto in mente?
              </h2>
              <p className="mb-0" style={{ maxWidth: 460 }}>
                Raccontami la tua idea: troviamo insieme la soluzione migliore.
              </p>
            </div>
            <Link to="/contatti" className="btn-brand btn-primary">
              Contattami
              <Icon name="arrow" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
