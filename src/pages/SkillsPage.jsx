import { usePortfolioData } from '../context/PortfolioDataContext';
import Skills from '../components/Skills';

export default function SkillsPage() {
  const { data } = usePortfolioData();
  return <Skills technologies={data.technologies} />;
}
