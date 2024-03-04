import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from '@clientes-module/controllers/clientes.controller';
import { ClientesService } from '@clientes-module/services/clientes.service';

describe('ClientesController', () => {
  let controller: ClientesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [ClientesService],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
