import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortfolioDataProvider } from './context/PortfolioDataContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import SkillsPage from './pages/SkillsPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import TestimonialsPage from './pages/TestimonialsPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <PortfolioDataProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/chi-sono" element={<AboutPage />} />
            <Route path="/progetti" element={<ProjectsPage />} />
            <Route path="/servizi" element={<ServicesPage />} />
            <Route path="/competenze" element={<SkillsPage />} />
            <Route path="/curriculum" element={<ResumePage />} />
            <Route path="/testimonianze" element={<TestimonialsPage />} />
            <Route path="/contatti" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </PortfolioDataProvider>
    </BrowserRouter>
  );
}

export default App;
