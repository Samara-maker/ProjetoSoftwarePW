import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

const toIdArray = (value: unknown): number[] => {
  if (value === undefined || value === null || value === '') return [];
  const list = Array.isArray(value) ? value : [value];
  return list.map((v) => parseInt(v as string, 10)).filter((n) => !isNaN(n));
};

const toOptionalId = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === '') return undefined;
  const parsed = parseInt(value as string, 10);
  return isNaN(parsed) ? undefined : parsed;
};

export class CreateAgendamentoDto {
  @IsNotEmpty({ message: 'O cliente é obrigatório' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  clienteId!: number;

  @IsNotEmpty({ message: 'A data é obrigatória' })
  @IsString()
  data!: string;

  @IsNotEmpty({ message: 'O horário de início é obrigatório' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Informe um horário válido (HH:mm)' })
  horarioInicio!: string;

  @IsNotEmpty({ message: 'O horário de fim é obrigatório' })
  @Matches(/^\d{2}:\d{2}$/, { message: 'Informe um horário válido (HH:mm)' })
  horarioFim!: string;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsNotEmpty({ message: 'O status é obrigatório' })
  @IsIn(['pendente', 'confirmado', 'concluido', 'cancelado'], {
    message: 'Status inválido',
  })
  status!: string;

  @IsOptional()
  @Transform(({ value }) => toOptionalId(value))
  funcionarioId?: number;

  @IsOptional()
  @Transform(({ value }) => toOptionalId(value))
  equipeId?: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'Informe ao menos um serviço' })
  @Transform(({ value }) => toIdArray(value))
  servicosIds: number[] = [];
}
