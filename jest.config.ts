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
    "@auth-module/(.*)": ["<rootDir>/src/auth/$1"],
    "@clientes-module/(.*)": ["<rootDir>/src/clientes/$1"],
    "@shared-module/(.*)": ["<rootDir>/src/shared/$1"],
    "@empleados-module/(.*)": ["<rootDir>/src/empleados/$1"],
    "@usuarios-module/(.*)": ["<rootDir>/src/usuarios/$1"],
    "@productos-module/(.*)": ["<rootDir>/src/productos/$1"],
    "@main-module/(.*)": ["<rootDir>/src//$1"],
  },
};

export default config;
