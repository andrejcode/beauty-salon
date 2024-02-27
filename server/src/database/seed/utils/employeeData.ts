import { Employee } from '../../../entities/Employee';

const employeeData: Pick<
  Employee,
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'description'
  | 'breakStartTime'
  | 'breakEndTime'
>[] = [
  {
    firstName: 'Mikey',
    lastName: 'Mike',
    email: 'mikey.mike@gmail.com',
    description:
      'Meet Mikey Mike, our cosmic beauty expert! Specializing in avant-garde makeup and cutting-edge nail art, Mikey brings a touch of celestial elegance to every beauty session. Step into a world of beauty wonders with Mikey, where every appointment is a journey into unique and captivating styles!',
    breakStartTime: '14:00:00',
    breakEndTime: '14:30:00',
  },
  {
    firstName: 'Luna',
    lastName: 'Star',
    email: 'luna.star@gmail.com',
    description:
      'Meet Luna Star, our stellar beauty virtuoso! Specializing in avant-garde makeup and cosmic nail art, Luna brings a touch of celestial elegance to every beauty session. Step into a world of beauty wonders with Luna, where every appointment is a journey into unique and captivating styles!',
    breakStartTime: '14:30:00',
    breakEndTime: '15:00:00',
  },
  {
    firstName: 'Nova',
    lastName: 'Blaze',
    email: 'nova.blaze@gmail.com',
    description:
      'Introducing Nova Blaze, our cosmic beauty maestro! With a passion for cutting-edge makeup and futuristic nail art, Nova adds a spark of celestial flair to every beauty session. Step into a world of avant-garde wonders with Nova, where every appointment is a journey into unique and captivating styles!',
    breakStartTime: '15:00:00',
    breakEndTime: '15:30:00',
  },
  {
    firstName: 'Orion',
    lastName: 'Frost',
    email: 'orion.frost@gmail.com',
    description:
      'Say hello to Orion Frost, our celestial beauty expert! Orion specializes in avant-garde makeup and otherworldly nail art, bringing a touch of cosmic elegance to every beauty session. Step into a world of beauty wonders with Orion, where every appointment is a journey into unique and captivating styles!',
    breakStartTime: '15:30:00',
    breakEndTime: '16:00:00',
  },
];

export default employeeData;
