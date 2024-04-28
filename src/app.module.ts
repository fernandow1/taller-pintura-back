import { Module } from '@nestjs/common';
import { AppController } from '@main-module/app.controller';
import { AppService } from '@main-module/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from '@main-module/clientes/clientes.module';
import { APP_FILTER, RouterModule } from '@nestjs/core';
import { routes } from '@shared-module/routes';
import { EmpleadosModule } from '@main-module/empleados/empleados.module';
import { UsuariosModule } from '@main-module/usuarios/usuarios.module';
import { QueryFailedFilter } from '@shared-module/filters/query-failed.filter';

@Module({
  imports: [
    RouterModule.register(routes),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['dist/**/models/*/*{.entity.ts,.entity.js}'],
    }),
    ClientesModule,
    EmpleadosModule,
    UsuariosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter,
    },
  ],
})
export class AppModule {}
