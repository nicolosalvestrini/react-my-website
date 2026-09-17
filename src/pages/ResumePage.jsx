import { usePortfolioData } from '../context/PortfolioDataContext';
import Resume from '../components/Resume';

export default function ResumePage() {
  const { data } = usePortfolioData();
  return <Resume experiences={data.experiences} settings={data.settings} />;
}
