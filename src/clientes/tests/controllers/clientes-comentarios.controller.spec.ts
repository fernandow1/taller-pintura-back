import { Test, TestingModule } from '@nestjs/testing';
import { ClientesComentariosController } from '@clientes-module/controllers/clientes-comentarios.controller';

describe('ClientesComentariosController', () => {
  let controller: ClientesComentariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesComentariosController],
    }).compile();

    controller = module.get<ClientesComentariosController>(
      ClientesComentariosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
