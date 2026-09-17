import { usePortfolioData } from '../context/PortfolioDataContext';
import Projects from '../components/Projects';

export default function ProjectsPage() {
  const { data } = usePortfolioData();
  return <Projects projects={data.projects} />;
}
