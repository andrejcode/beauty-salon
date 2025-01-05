import beauty from '@/assets/images/beauty.webp';
import facial from '@/assets/images/facial.webp';
import massage from '@/assets/images/massage.webp';
import nails from '@/assets/images/nails.webp';
import ServiceCard from './ServiceCard';

export interface Service {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const services: Service[] = [
  {
    title: 'Facial',
    description: 'Face care, anti-aging treatments, and more to rejuvenate your skin.',
    image: facial,
    alt: 'Facial service',
  },
  {
    title: 'Beauty',
    description: 'Makeup, eyelash extensions, and more to enhance your natural beauty.',
    image: beauty,
    alt: 'Beauty service',
  },
  {
    title: 'Nails',
    description: 'Manicures, pedicures, and nail art for perfectly polished nails.',
    image: nails,
    alt: 'Nails service',
  },
  {
    title: 'Massage',
    description: 'Relaxing massages to ease tension and revitalize your body.',
    image: massage,
    alt: 'Massage service',
  },
];

export default function ServicesSection() {
  return (
    <section className="px-6 py-12 md:px-16 lg:px-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold">Discover Our Top Beauty Services</h2>
        <p className="mt-2 text-gray-600">Tailored Just for You</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map(service => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </section>
  );
}
