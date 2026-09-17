import { createContext, useContext, useEffect, useState } from 'react';
import {
  getProjects,
  getServices,
  getTechnologies,
  getExperiences,
  getTestimonials,
  getSiteSettings,
} from '../api/client';

const PortfolioDataContext = createContext(null);

export function PortfolioDataProvider({ children }) {
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

  return (
    <PortfolioDataContext.Provider value={{ data, error }}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  const context = useContext(PortfolioDataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a PortfolioDataProvider');
  }
  return context;
}
