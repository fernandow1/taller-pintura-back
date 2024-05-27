import { faker } from '@faker-js/faker';

export const mockJWTService = {
  sign: jest.fn().mockReturnValue(faker.string.sample(100)),
};
