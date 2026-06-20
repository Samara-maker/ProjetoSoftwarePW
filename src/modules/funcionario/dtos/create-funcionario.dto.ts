import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateFuncionarioDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  nome!: string;

  @IsNotEmpty({ message: 'O campo cargo é obrigatório' })
  cargo!: string;
}
