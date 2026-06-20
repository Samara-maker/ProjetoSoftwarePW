import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, MinLength } from 'class-validator';

const toDecimalNumber = (value: unknown): unknown => {
  const normalizedValue: unknown = Array.isArray(value)
    ? (value as unknown[])[value.length - 1]
    : value;

  if (typeof normalizedValue === 'string') {
    return Number(normalizedValue.replace(',', '.'));
  }

  return normalizedValue;
};

export class CreateServicoDto {
  @IsNotEmpty({ message: 'O campo descrição é obrigatório' })
  @MinLength(3, { message: 'A descrição deve ter no mínimo 3 caracteres' })
  descricao!: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'O valor deve ter no máximo 2 casas decimais' })
  @Transform(({ value }) => toDecimalNumber(value))
  @Min(0.01, { message: 'O valor deve ser no mínimo R$ 0,01' })
  valor!: number;

  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  categoria!: number;
}
