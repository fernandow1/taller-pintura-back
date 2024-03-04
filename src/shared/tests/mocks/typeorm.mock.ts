import { QueryBuilder } from 'typeorm';

export interface QueryBuilderResponses {
  getManyAndCountResponse?: [unknown[], number];
}

export function mockQueryBuilder(
  responses?: QueryBuilderResponses,
): Partial<QueryBuilder<unknown>> {
  const queryBuilder = {
    take: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    getManyAndCount: jest
      .fn()
      .mockResolvedValue(responses?.getManyAndCountResponse),
  };
  return queryBuilder;
}
