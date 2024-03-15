import { faker } from '@faker-js/faker';
import { CreateEmpleadoDto } from '@main-module/empleados/dto/create-empleado.dto';
import { Empleado } from '@main-module/empleados/models/entities/empleado.entity';

export function mockEmpleado(): Empleado {
  const empleado = new Empleado(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.string.alpha(255),
    faker.internet.email(),
    faker.date.past().toDateString(),
    faker.date.recent().toDateString(),
  );
  empleado.id = faker.number.int();
  return empleado;
}

export function mockCreateEmpleadoDTO(): CreateEmpleadoDto {
  return new CreateEmpleadoDto(
    faker.person.firstName(),
    faker.person.lastName(),
    faker.string.alpha(255),
    faker.internet.email(),
    faker.date.past().toDateString(),
    faker.date.recent().toDateString(),
  );
}

export const mockEmpleadoInternalRepository = {
  save: jest.fn().mockReturnValueOnce(mockEmpleado()),
};

export const mockEmpleadoRepository = {
  save: jest.fn().mockReturnValueOnce(mockEmpleado()),
};

export const mockEmpleadoService = {
  create: jest.fn().mockReturnValueOnce(mockEmpleado()),
};
