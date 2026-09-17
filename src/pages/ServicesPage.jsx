import { usePortfolioData } from '../context/PortfolioDataContext';
import Services from '../components/Services';

export default function ServicesPage() {
  const { data } = usePortfolioData();
  return <Services services={data.services} />;
}
