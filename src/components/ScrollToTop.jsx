import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_TITLE = 'Nicolò Salvestrini | Junior Full Stack Web Developer';

const PAGE_TITLES = {
  '/chi-sono': 'Chi sono',
  '/progetti': 'Progetti',
  '/servizi': 'Servizi',
  '/competenze': 'Competenze',
  '/curriculum': 'Curriculum',
  '/testimonianze': 'Testimonianze',
  '/contatti': 'Contatti',
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    const page = PAGE_TITLES[pathname];
    document.title = page ? `${page} | Nicolò Salvestrini` : BASE_TITLE;
  }, [pathname]);

  return null;
}
