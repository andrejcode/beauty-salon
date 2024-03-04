import { Service } from '../../entities';

export default class SalonServiceDto {
  id: number;

  name: string;

  durationInMinutes: number;

  description: string;

  costInCents: number;

  category: string;

  constructor(
    id: number,
    name: string,
    durationInMinutes: number,
    description: string,
    costInCents: number,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.durationInMinutes = durationInMinutes;
    this.description = description;
    this.costInCents = costInCents;
    this.category = category;
  }
}

export function mapServiceToDto(service: Service): SalonServiceDto {
  return new SalonServiceDto(
    service.id,
    service.name,
    service.durationInMinutes,
    service.description,
    service.costInCents,
    service.category
  );
}
