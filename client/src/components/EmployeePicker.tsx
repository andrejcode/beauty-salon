import { useEffect, useState } from 'react';
import { type EmployeeDto } from '@server/shared/dtos';
import LoadingSpinner from './ui/LoadingSpinner';
import Card from './ui/Card';
import { FacebookIcon, InstagramIcon } from './SocialIcons';

interface EmployeePickerProps {
  selectedEmployeeId: number | null;
  updateEmployeeId: (id: number) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export default function EmployeePicker({
  selectedEmployeeId,
  updateEmployeeId,
  updateErrorMessage,
}: EmployeePickerProps) {
  const [isLoadingEmployees, setIsLoadingEmployees] = useState<boolean>(false);
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        setIsLoadingEmployees(true);

        const response = await fetch('/api/employees');

        if (response.ok) {
          const employeesDto = (await response.json()) as EmployeeDto[];
          setEmployees(employeesDto);

          if (employeesDto.length > 0) {
            updateEmployeeId(employeesDto[0].id);
          }
        } else {
          updateErrorMessage('Unable to get employees.');
        }
      } catch {
        updateErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingEmployees(false);
      }
    }

    void fetchEmployees();
  }, [updateEmployeeId, updateErrorMessage]);

  return isLoadingEmployees ? (
    <div className="flex px-6 py-12 md:px-16 lg:px-24">
      <LoadingSpinner /> <p className="ml-2">Loading employees...</p>
    </div>
  ) : (
    employees.length > 0 && (
      <div className="my-4">
        <label id="employee-picker-label" className="block text-gray-700">
          Select employee:
        </label>
        <div
          role="group"
          aria-labelledby="employee-picker-label"
          className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {employees.map(employee => (
            <Card
              key={employee.id}
              onClick={() => updateEmployeeId(employee.id)}
              className={`flex cursor-pointer flex-col justify-between ${
                selectedEmployeeId === employee.id ? 'bg-pink-100' : 'bg-white'
              }`}
            >
              <h2 className="text-xl font-semibold">{employee.fullName}</h2>
              <p className="mb-2 text-gray-600">{employee.description}</p>
              <div className="flex gap-3">
                <FacebookIcon />
                <InstagramIcon />
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  );
}
