import { usePortfolioData } from '../context/PortfolioDataContext';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const { data } = usePortfolioData();
  return <ContactForm settings={data.settings} />;
}
