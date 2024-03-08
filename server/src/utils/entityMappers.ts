import {
  Appointment,
  BusinessTime,
  Employee,
  Review,
  Service,
  User,
} from '../entities';
import {
  AppointmentDto,
  BusinessTimeDto,
  EmployeeDto,
  ReviewDto,
  SalonServiceDto,
  UserDto,
} from '../shared/dtos';

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

export function mapUserToDto(user: User): UserDto {
  return new UserDto(
    user.id,
    user.firstName,
    user.lastName,
    user.email,
    user.createdAt
  );
}

export function mapEmployeeToDto(employee: Employee): EmployeeDto {
  const {
    id,
    firstName,
    lastName,
    email,
    description,
    breakStartTime,
    breakEndTime,
  } = employee;
  return new EmployeeDto(
    id,
    firstName,
    lastName,
    email,
    description,
    breakStartTime,
    breakEndTime
  );
}

export function mapAppointmentToDto(appointment: Appointment): AppointmentDto {
  const {
    id,
    date,
    time,
    durationInMinutes,
    priceInCents,
    services,
    userId,
    employeeId,
    user,
    employee,
  } = appointment;
  return new AppointmentDto(
    id,
    date,
    time,
    durationInMinutes,
    priceInCents,
    services,
    userId,
    employeeId,
    user && mapUserToDto(user),
    employee && mapEmployeeToDto(employee)
  );
}

export function mapReviewToDto(review: Review): ReviewDto {
  return new ReviewDto(
    review.id,
    review.reviewText,
    review.stars,
    review.updatedAt,
    review.user && mapUserToDto(review.user)
  );
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
