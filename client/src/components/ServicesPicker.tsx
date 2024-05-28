import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { type SalonServiceDto } from '@server/shared/dtos';

interface ServicesPickerProps {
  services: SalonServiceDto[];
  categories: string[];
  checkedServices: SalonServiceDto[];
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>, service: SalonServiceDto) => void;
}

export default function ServicesPicker({
  services,
  categories,
  checkedServices,
  onCheckboxChange,
}: ServicesPickerProps) {
  return (
    <Tabs className="my-4 fade-in" defaultActiveKey={categories[0]} id="services-tabs">
      {categories.map((category) => {
        return (
          <Tab
            key={category}
            eventKey={category}
            title={category.charAt(0).toUpperCase() + category.slice(1)}
            className="fade-in"
          >
            {services
              .filter((service) => service.category === category)
              .map((service) => (
                <Form.Check
                  key={service.id}
                  type="checkbox"
                  id={`checkbox-${service.id}`}
                  className="mb-4"
                >
                  <Form.Check.Input
                    type="checkbox"
                    onChange={(event) => onCheckboxChange(event, service)}
                    checked={checkedServices.includes(service)}
                    className="clickable"
                  />
                  <Form.Check.Label style={{ fontSize: '1.2em' }}>{service.name}</Form.Check.Label>
                  <br />
                  <Form.Check.Label>{service.description}</Form.Check.Label>
                  <br />
                  <Form.Check.Label>{service.durationInMinutes} minutes</Form.Check.Label>
                  <br />
                  <Form.Check.Label>
                    {(service.costInCents / 100).toFixed(2)}&euro;
                  </Form.Check.Label>
                </Form.Check>
              ))}
          </Tab>
        );
      })}
    </Tabs>
  );
}
