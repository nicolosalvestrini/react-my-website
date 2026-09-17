import { usePortfolioData } from '../context/PortfolioDataContext';
import About from '../components/About';

export default function AboutPage() {
  const { data } = usePortfolioData();
  return <About settings={data.settings} />;
}
