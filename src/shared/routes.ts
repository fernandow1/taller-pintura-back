import { ClientesModule } from '@clientes-module/clientes.module';
import { Routes } from '@nestjs/core';
import { SharedModule } from './shared.module';

export const routes: Routes = [
  {
    path: 'clientes',
    module: ClientesModule,
  },
  {
    path: 'shared',
    module: SharedModule,
  },
];
