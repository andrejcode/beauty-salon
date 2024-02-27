import { BusinessTime } from '../../../entities/BusinessTime';

const businessData: Omit<BusinessTime, 'createdAt' | 'updatedAt'> = {
  id: 1,
  startTime: '09:30:00',
  endTime: '18:00:00',
  offDays: ['Saturday', 'Sunday'],
};

export default businessData;
