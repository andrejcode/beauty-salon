import { BusinessTime } from '../../entities';

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

export function mapBusinessTimeToDto(
  businessTime: BusinessTime
): BusinessTimeDto {
  return new BusinessTimeDto(
    businessTime.id,
    businessTime.startTime,
    businessTime.endTime,
    businessTime.offDays
  );
}
