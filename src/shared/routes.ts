import { ClientesModule } from '@clientes-module/clientes.module';
import { Routes } from '@nestjs/core';
import { SharedModule } from './shared.module';
import { EmpleadosModule } from '@empleados-module/empleados.module';
import { UsuariosModule } from '@usuarios-module/usuarios.module';

export const routes: Routes = [
  {
    path: 'clientes',
    module: ClientesModule,
  },
  {
    path: 'empleados',
    module: EmpleadosModule,
  },
  {
    path: 'shared',
    module: SharedModule,
  },
  {
    path: 'usuarios',
    module: UsuariosModule,
  },
];
