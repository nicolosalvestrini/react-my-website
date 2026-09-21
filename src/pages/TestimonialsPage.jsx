import { usePortfolioData } from '../context/PortfolioDataContext';
import Testimonials from '../components/Testimonials';

export default function TestimonialsPage() {
  const { data } = usePortfolioData();
  return (
    <Testimonials testimonials={data.testimonials} withForm />
  );
}
