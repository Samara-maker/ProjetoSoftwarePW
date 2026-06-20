import { BadRequestException, Injectable } from '@nestjs/common';
import { Equipe } from './equipe.entity';
import { FuncionarioEquipe } from './funcionario-equipe.entity';
import { CreateEquipeDto } from './dtos/create-equipe.dto';
import { UpdateEquipeDto } from './dtos/update-equipe.dto';
import { Agendamento } from '../agendamento/agendamento.entity';

@Injectable()
export class EquipeService {
  async findAll(): Promise<Equipe[]> {
    return Equipe.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Equipe | null> {
    return Equipe.findOne({ where: { id } });
  }

  async findFuncionariosIds(equipeId: number): Promise<number[]> {
    const vinculos = await FuncionarioEquipe.find({
      where: { equipe: { id: equipeId } },
    });
    return vinculos.map((v) => v.funcionarioId);
  }

  private async sincronizarFuncionarios(
    equipeId: number,
    funcionariosIds: number[] = [],
  ): Promise<void> {
    await FuncionarioEquipe.delete({ equipeId });

    for (const funcionarioId of funcionariosIds) {
      const vinculo = FuncionarioEquipe.create({ equipeId, funcionarioId });
      await vinculo.save();
    }
  }

  async create(dados: CreateEquipeDto): Promise<Equipe> {
    const equipe = Equipe.create({ nome: dados.nome });
    await equipe.save();

    await this.sincronizarFuncionarios(equipe.id, dados.funcionariosIds);

    return equipe;
  }

  async update(id: number, dados: UpdateEquipeDto): Promise<Equipe | null> {
    const equipe = await this.findOne(id);

    if (!equipe) {
      return null;
    }

    equipe.nome = dados.nome;
    await equipe.save();

    await this.sincronizarFuncionarios(id, dados.funcionariosIds);

    return equipe;
  }

  async remove(id: number): Promise<Equipe | null> {
    const equipe = await this.findOne(id);

    if (!equipe) {
      return null;
    }

    const possuiAgendamentos = await Agendamento.count({
      where: { equipe: { id } },
    });

    if (possuiAgendamentos > 0) {
      throw new BadRequestException(
        'Equipe não pode ser excluída pois possui agendamentos vinculados.',
      );
    }

    await FuncionarioEquipe.delete({ equipeId: id });

    return equipe.remove();
  }
}
