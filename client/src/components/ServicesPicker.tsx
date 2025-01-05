import { useSearchParams } from 'react-router-dom';
import { type SalonServiceDto } from '@server/shared/dtos';
import { CATEGORY_QUERY_PARAM } from '@/utils/constants';
import { useEffect, useState } from 'react';
import LoadingSpinner from './ui/LoadingSpinner';

interface ServicesPickerProps {
  checkedServices: SalonServiceDto[];
  onCheckboxChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    service: SalonServiceDto,
  ) => void;
  updateErrorMessage: (errorMessage: string) => void;
}

export default function ServicesPicker({
  checkedServices,
  onCheckboxChange,
  updateErrorMessage,
}: ServicesPickerProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [services, setServices] = useState<SalonServiceDto[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const uniqueCategoriesSet = new Set(
      services.map(service => service.category),
    );
    const uniqueCategoriesArray = Array.from(uniqueCategoriesSet);
    setCategories(uniqueCategoriesArray);
  }, [services]);

  useEffect(() => {
    async function fetchServices() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/services');

        if (response.ok) {
          const servicesDto = (await response.json()) as SalonServiceDto[];
          setServices(servicesDto);
        } else {
          updateErrorMessage('Unable to get services.');
        }
      } catch {
        updateErrorMessage('An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    void fetchServices();
  }, [updateErrorMessage]);

  const activeCategory =
    searchParams.get(CATEGORY_QUERY_PARAM) || categories[0];

  const changeParam = (param: string, value: string) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  return isLoading ? (
    <div className="flex px-6 py-12 md:px-16 lg:px-24">
      <LoadingSpinner /> <p className="ml-2">Loading services...</p>
    </div>
  ) : (
    <div className="my-4">
      <div className="mb-4 flex border-b border-gray-200">
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 text-gray-600 focus:outline-none ${
              activeCategory === category
                ? 'border-b-2 border-pink-500 text-pink-500'
                : ''
            }`}
            onClick={() => changeParam(CATEGORY_QUERY_PARAM, category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {services
          .filter(service => service.category === activeCategory)
          .map(service => (
            <div key={service.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                id={`checkbox-${service.id}`}
                className="h-5 w-5 cursor-pointer rounded border-gray-300 text-pink-500 focus:ring-pink-500"
                onChange={event => onCheckboxChange(event, service)}
                checked={checkedServices.includes(service)}
              />
              <label
                htmlFor={`checkbox-${service.id}`}
                className="block flex-1 space-y-1"
              >
                <span className="text-lg font-medium text-pink-500">
                  {service.name}
                </span>
                <p className="text-gray-600">{service.description}</p>
                <p className="text-gray-600">
                  {service.durationInMinutes} minutes
                </p>
                <p className="text-gray-600">
                  {(service.costInCents / 100).toFixed(2)}&euro;
                </p>
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
