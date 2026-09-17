import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { usePortfolioData } from '../context/PortfolioDataContext';

export default function Layout() {
  const { data, error } = usePortfolioData();

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
      <main>
        <Outlet />
      </main>
      <Footer settings={data.settings} />
    </>
  );
}
