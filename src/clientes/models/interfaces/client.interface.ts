import { CATEGORIAS } from '../enums/categorias.enum';

export interface IClient {
  id: number;
  nombre: string;
  apellido: string;
  razonSocial: string;
  dni: string;
  email: string;
  categoria: CATEGORIAS;
}
