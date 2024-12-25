/* eslint-disable no-console */
import { Employee, Service, User, BusinessTime } from '@/entities';
import config from '@/config';
import { createDatabase } from '..';
import employeeData from './utils/employeeData';
import serviceData from './utils/serviceData';
import adminData from './utils/adminData';
import businessData from './utils/businessData';

const database = createDatabase(config.database);

database.initialize().then(async () => {
  try {
    const employeeRepo = database.getRepository(Employee);
    const serviceRepo = database.getRepository(Service);
    const userRepo = database.getRepository(User);
    const businessTimesRepo = database.getRepository(BusinessTime);

    const admin = await adminData();

    await employeeRepo.save(employeeData);
    await serviceRepo.save(serviceData);
    await userRepo.save(admin);
    await businessTimesRepo.save(businessData);

    console.log('Database seeded successfully.');
  } catch (e) {
    console.error(`Unable to seed the database: ${e}`);
  } finally {
    database.destroy();
  }
});
