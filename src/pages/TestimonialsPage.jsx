import { usePortfolioData } from '../context/PortfolioDataContext';
import Testimonials from '../components/Testimonials';
import TestimonialForm from '../components/TestimonialForm';

export default function TestimonialsPage() {
  const { data } = usePortfolioData();
  return (
    <>
      <Testimonials testimonials={data.testimonials} />
      <TestimonialForm />
    </>
  );
}
