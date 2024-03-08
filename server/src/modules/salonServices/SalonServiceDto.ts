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
