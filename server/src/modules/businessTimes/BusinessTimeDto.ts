export default class BusinessTimeDto {
  id: number;

  startTime: string;

  endTime: string;

  offDays: string[];

  constructor(
    id: number,
    startTime: string,
    endTime: string,
    offDays: string[]
  ) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.offDays = offDays;
  }
}
