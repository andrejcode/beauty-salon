interface Service {
  name: string;
  duration: number;
  description: string;
  cost: number;
  category: string;
}

const serviceData: Service[] = [
  {
    name: 'Classic Facial',
    duration: 60,
    description:
      'A refreshing facial that includes cleansing, exfoliation, extraction, and a relaxing mask to rejuvenate your skin.',
    cost: 50,
    category: 'facial',
  },
  {
    name: 'Anti-Aging Facial',
    duration: 75,
    description:
      'Targeting fine lines and wrinkles, this facial incorporates specialized serums and techniques to promote youthful skin.',
    cost: 60,
    category: 'facial',
  },
  {
    name: 'Hydrating Facial',
    duration: 45,
    description:
      'Deeply moisturizing treatment for dry or dehydrated skin, leaving it supple and radiant.',
    cost: 45,
    category: 'facial',
  },
  {
    name: 'Makeup Application',
    duration: 45,
    description:
      'Professional makeup application for special events, weddings, or a glamorous night out.',
    cost: 50,
    category: 'beauty',
  },
  {
    name: 'Eyelash Extensions',
    duration: 90,
    description:
      'Enhance your natural lashes with individual extensions for a fuller and longer look.',
    cost: 70,
    category: 'beauty',
  },
  {
    name: 'Brow Shaping and Tinting',
    duration: 30,
    description:
      'Sculpt and define your brows with professional shaping and tinting services.',
    cost: 30,
    category: 'beauty',
  },
  {
    name: 'Manicure',
    duration: 45,
    description:
      'Nail shaping, cuticle care, massage, and polish application for well-groomed hands.',
    cost: 25,
    category: 'nails',
  },
  {
    name: 'Pedicure',
    duration: 60,
    description:
      'Relaxing foot soak, nail care, exfoliation, massage, and polished toes for happy feet.',
    cost: 35,
    category: 'nails',
  },
  {
    name: 'Gel Nail Extensions',
    duration: 90,
    description:
      'Durable and natural-looking nail extensions with a gel finish for added strength.',
    cost: 45,
    category: 'nails',
  },
  {
    name: 'Swedish Massage',
    duration: 60,
    description:
      'A classic full-body massage to relax muscles and improve circulation.',
    cost: 60,
    category: 'massage',
  },
  {
    name: 'Deep Tissue Massage',
    duration: 75,
    description:
      'Intense pressure targets knots and tension in deeper muscle layers, providing relief.',
    cost: 70,
    category: 'massage',
  },
  {
    name: 'Aromatherapy Massage',
    duration: 90,
    description:
      'Relaxing massage using essential oils to enhance both physical and mental well-being.',
    cost: 85,
    category: 'massage',
  },
];

export default serviceData;
