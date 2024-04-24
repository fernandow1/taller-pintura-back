import { faker } from '@faker-js/faker';

export const mockPaginationDTO = {
  pageNumber: faker.number.int(),
};

export const mockResultsDTO = {
  results: faker.number.int({ min: 1, max: 50 }),
};
