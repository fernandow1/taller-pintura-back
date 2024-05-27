import { faker } from '@faker-js/faker';

export function mockEnvironmentVariables(): void {
  process.env.JWT_SECRET_KEY = faker.string.sample(20);
  process.env.ORIGIN_CRM = faker.string.sample(10);
}
