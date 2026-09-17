import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import Resume from './components/Resume';
import WhyMe from './components/WhyMe';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import {
  getProjects,
  getServices,
  getTechnologies,
  getExperiences,
  getTestimonials,
  getSiteSettings,
} from './api/client';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    Promise.all([
      getSiteSettings(),
      getProjects(),
      getServices(),
      getTechnologies({ skills: 1 }),
      getExperiences(),
      getTestimonials(),
    ])
      .then(([settings, projects, services, technologies, experiences, testimonials]) => {
        if (!active) return;
        setData({ settings, projects, services, technologies, experiences, testimonials });
      })
      .catch((err) => {
        if (!active) return;
        setError(err);
      });

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', textAlign: 'center', padding: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, marginBottom: 10 }}>Non riesco a caricare il sito</h1>
          <p>Controlla che il backend Laravel sia in esecuzione e riprova.</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="skeleton" style={{ width: 220, height: 40, borderRadius: 999 }} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Hero settings={data.settings} />
      <About settings={data.settings} />
      <Projects projects={data.projects} />
      <Services services={data.services} />
      <Skills technologies={data.technologies} />
      <Resume experiences={data.experiences} settings={data.settings} />
      <WhyMe />
      <Testimonials testimonials={data.testimonials} />
      <ContactForm settings={data.settings} />
      <Footer settings={data.settings} />
    </>
  );
}

export default App;
