import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Employee } from '../../entities';
import { Database } from '../../database';
import { mapEmployeeToDto } from '../../utils/entityMappers';

export default (db: Database) => {
  const employeeRepo: Repository<Employee> = db.getRepository(Employee);

  async function getEmployees(_req: Request, res: Response) {
    try {
      const employees = await employeeRepo.find();
      const employeesDto = employees.map((employee) =>
        mapEmployeeToDto(employee)
      );
      res.json(employeesDto);
    } catch (e) {
      res.status(400).send('Unable to get employees.');
    }
  }

  return { getEmployees };
};
