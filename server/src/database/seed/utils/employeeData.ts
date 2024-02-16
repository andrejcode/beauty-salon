import { Employee } from '../../../entities/Employee';

const employeeData: Pick<
  Employee,
  'firstName' | 'lastName' | 'email' | 'description'
>[] = [
  {
    firstName: 'Mikey',
    lastName: 'Mike',
    email: 'mikey.mike@gmail.com',
    description:
      'Meet Mikey Mike, our cosmic beauty expert! Specializing in avant-garde makeup and cutting-edge nail art, Mikey brings a touch of celestial elegance to every beauty session. Step into a world of beauty wonders with Mikey, where every appointment is a journey into unique and captivating styles!',
  },
  {
    firstName: 'Luna',
    lastName: 'Star',
    email: 'luna.star@gmail.com',
    description:
      'Meet Luna Star, our stellar beauty virtuoso! Specializing in avant-garde makeup and cosmic nail art, Luna brings a touch of celestial elegance to every beauty session. Step into a world of beauty wonders with Luna, where every appointment is a journey into unique and captivating styles!',
  },
  {
    firstName: 'Nova',
    lastName: 'Blaze',
    email: 'nova.blaze@gmail.com',
    description:
      'Introducing Nova Blaze, our cosmic beauty maestro! With a passion for cutting-edge makeup and futuristic nail art, Nova adds a spark of celestial flair to every beauty session. Step into a world of avant-garde wonders with Nova, where every appointment is a journey into unique and captivating styles!',
  },
  {
    firstName: 'Orion',
    lastName: 'Frost',
    email: 'orion.frost@gmail.com',
    description:
      'Say hello to Orion Frost, our celestial beauty expert! Orion specializes in avant-garde makeup and otherworldly nail art, bringing a touch of cosmic elegance to every beauty session. Step into a world of beauty wonders with Orion, where every appointment is a journey into unique and captivating styles!',
  },
];

export default employeeData;
