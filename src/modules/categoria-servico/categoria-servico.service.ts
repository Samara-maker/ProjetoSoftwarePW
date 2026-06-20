import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriaServico } from './categoria-servico.entity';
import { CreateCategoriaServicoDto } from './dtos/create-categoria-servico.dto';
import { UpdateCategoriaServicoDto } from './dtos/update-categoria-servico.dto';
import { Servico } from '../servico/servico.entity';

@Injectable()
export class CategoriaServicoService {
  async findAll(): Promise<CategoriaServico[]> {
    return CategoriaServico.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<CategoriaServico | null> {
    return CategoriaServico.findOne({ where: { id } });
  }

  async create(dados: CreateCategoriaServicoDto): Promise<CategoriaServico> {
    const existente = await CategoriaServico.findOne({
      where: { nome: dados.nome },
    });

    if (existente) {
      throw new BadRequestException(
        `Já existe uma categoria com o nome '${dados.nome}'`,
      );
    }

    const categoria = CategoriaServico.create({ ...dados });
    return categoria.save();
  }

  async update(
    id: number,
    dados: UpdateCategoriaServicoDto,
  ): Promise<CategoriaServico | null> {
    const categoria = await this.findOne(id);

    if (!categoria) {
      return null;
    }

    const existente = await CategoriaServico.findOne({
      where: { nome: dados.nome },
    });

    if (existente && existente.id !== id) {
      throw new BadRequestException(
        `Já existe outra categoria com o nome '${dados.nome}'`,
      );
    }

    Object.assign(categoria, { ...dados });

    return categoria.save();
  }

  async remove(id: number): Promise<CategoriaServico | null> {
    const categoria = await this.findOne(id);

    if (!categoria) {
      return null;
    }

    const possuiServicos = await Servico.count({
      where: { categoria: { id } },
    });

    if (possuiServicos > 0) {
      throw new BadRequestException(
        'Categoria não pode ser excluída pois possui serviços vinculados.',
      );
    }

    return categoria.remove();
  }
}
