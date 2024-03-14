import { Test, TestingModule } from '@nestjs/testing';
import { ClientesComentariosService } from '@clientes-module/services/clientes-comentarios.service';

describe('ClientesComentariosService', () => {
  let service: ClientesComentariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesComentariosService],
    }).compile();

    service = module.get<ClientesComentariosService>(
      ClientesComentariosService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
