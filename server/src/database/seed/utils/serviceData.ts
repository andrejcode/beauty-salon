import { Service } from '../../../entities/Service';

const serviceData: Pick<
  Service,
  'name' | 'durationInMinutes' | 'description' | 'costInCents' | 'category'
>[] = [
  {
    name: 'Classic Facial',
    durationInMinutes: 60,
    description:
      'A refreshing facial that includes cleansing, exfoliation, extraction, and a relaxing mask to rejuvenate your skin.',
    costInCents: 5000,
    category: 'facial',
  },
  {
    name: 'Anti-Aging Facial',
    durationInMinutes: 75,
    description:
      'Targeting fine lines and wrinkles, this facial incorporates specialized serums and techniques to promote youthful skin.',
    costInCents: 6000,
    category: 'facial',
  },
  {
    name: 'Hydrating Facial',
    durationInMinutes: 45,
    description:
      'Deeply moisturizing treatment for dry or dehydrated skin, leaving it supple and radiant.',
    costInCents: 4500,
    category: 'facial',
  },
  {
    name: 'Makeup Application',
    durationInMinutes: 45,
    description:
      'Professional makeup application for special events, weddings, or a glamorous night out.',
    costInCents: 5000,
    category: 'beauty',
  },
  {
    name: 'Eyelash Extensions',
    durationInMinutes: 90,
    description:
      'Enhance your natural lashes with individual extensions for a fuller and longer look.',
    costInCents: 7000,
    category: 'beauty',
  },
  {
    name: 'Brow Shaping and Tinting',
    durationInMinutes: 30,
    description:
      'Sculpt and define your brows with professional shaping and tinting services.',
    costInCents: 3000,
    category: 'beauty',
  },
  {
    name: 'Manicure',
    durationInMinutes: 45,
    description:
      'Nail shaping, cuticle care, massage, and polish application for well-groomed hands.',
    costInCents: 2500,
    category: 'nails',
  },
  {
    name: 'Pedicure',
    durationInMinutes: 60,
    description:
      'Relaxing foot soak, nail care, exfoliation, massage, and polished toes for happy feet.',
    costInCents: 3500,
    category: 'nails',
  },
  {
    name: 'Gel Nail Extensions',
    durationInMinutes: 90,
    description:
      'Durable and natural-looking nail extensions with a gel finish for added strength.',
    costInCents: 4500,
    category: 'nails',
  },
  {
    name: 'Swedish Massage',
    durationInMinutes: 60,
    description:
      'A classic full-body massage to relax muscles and improve circulation.',
    costInCents: 6000,
    category: 'massage',
  },
  {
    name: 'Deep Tissue Massage',
    durationInMinutes: 75,
    description:
      'Intense pressure targets knots and tension in deeper muscle layers, providing relief.',
    costInCents: 7000,
    category: 'massage',
  },
  {
    name: 'Aromatherapy Massage',
    durationInMinutes: 90,
    description:
      'Relaxing massage using essential oils to enhance both physical and mental well-being.',
    costInCents: 8500,
    category: 'massage',
  },
];

export default serviceData;
