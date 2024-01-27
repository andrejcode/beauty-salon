/* eslint-disable no-console */
import { Employee, Service } from '../../entities';
import config from '../../config';
import { createDatabase } from '..';
import employeeData from './utils/employeeData';
import serviceData from './utils/serviceData';

const database = createDatabase(config.database);

database.initialize().then(async () => {
  try {
    const employeeRepo = database.getRepository(Employee);
    const serviceRepo = database.getRepository(Service);

    await employeeRepo.save(employeeData);
    await serviceRepo.save(serviceData);

    console.log('Database seeded successfully.');
  } catch (e) {
    console.error(`Unable to seed the database: ${e}`);
  } finally {
    database.destroy();
  }
});
