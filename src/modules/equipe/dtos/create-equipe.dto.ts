import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

const toIdArray = (value: unknown): number[] => {
  if (value === undefined || value === null || value === '') return [];
  const list = Array.isArray(value) ? value : [value];
  return list.map((v) => parseInt(v as string, 10)).filter((n) => !isNaN(n));
};

export class CreateEquipeDto {
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  nome!: string;

  @IsOptional()
  @Transform(({ value }) => toIdArray(value))
  funcionariosIds?: number[];
}
