import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import LoadingSpinner from './LoadingSpinner';
import { type EmployeeDto } from '@server/shared/dtos';

interface EmployeePickerProps {
  chosenEmployeeId: number | null;
  onCardClick: (id: number) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export default function EmployeePicker({
  chosenEmployeeId,
  onCardClick,
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
        } else {
          updateErrorMessage('Unable to get employees.');
        }
      } catch (e) {
        updateErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoadingEmployees(false);
      }
    }

    void fetchEmployees();
  }, [updateErrorMessage]);

  return isLoadingEmployees ? (
    <LoadingSpinner />
  ) : (
    <>
      <Form.Label className="mt-3 fade-in">Select employee:</Form.Label>
      <Row xs={1} md={2} lg={4} className="g-4 fade-in">
        {employees.map((employee) => (
          <Col key={employee.id}>
            <Card
              onClick={() => onCardClick(employee.id)}
              className="clickable"
              style={{
                width: '100%',
                backgroundColor: chosenEmployeeId === employee.id ? 'var(--main-color)' : 'white',
              }}
            >
              <Card.Body>
                <Card.Title>{employee.fullName}</Card.Title>
                <Card.Text>{employee.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
