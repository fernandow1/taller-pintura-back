import { LoginDTO } from '@auth-module/models/dtos/login.dto';
import { IAccessToken } from '@auth-module/models/interfaces/access-token.interface';
import { faker } from '@faker-js/faker';

export function mockLoginDTO(): LoginDTO {
  const dto = new LoginDTO();
  dto.usuario = faker.internet.userName();
  dto.password = faker.internet.password();
  return dto;
}

export const mockAuthService = {
  login: jest.fn().mockImplementation(async (): Promise<IAccessToken> => {
    return {
      token: faker.string.sample(20),
    };
  }),
};
