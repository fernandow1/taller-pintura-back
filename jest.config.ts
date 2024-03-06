import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  rootDir: './',
  preset: 'ts-jest',
  moduleNameMapper: {
    "@clientes-module/(.*)": ["<rootDir>/src/clientes/$1"],
    "@shared-module/(.*)": ["<rootDir>/src/shared/$1"],
    "@empleados-module/(.*)": ["<rootDir>/src/empleados/$1"],
    "@main-module/(.*)": ["<rootDir>/src//$1"],
  },
};

export default config;
