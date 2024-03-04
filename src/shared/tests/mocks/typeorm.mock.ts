import { QueryBuilder } from 'typeorm';

export interface QueryBuilderResponses {
  getManyAndCountResponse?: [unknown[], number];
}

export function mockQueryBuilder(
  responses?: QueryBuilderResponses,
): Partial<QueryBuilder<unknown>> {
  const queryBuilder = {
    select: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    getManyAndCount: jest
      .fn()
      .mockResolvedValue(responses?.getManyAndCountResponse),
  };
  return queryBuilder;
}
