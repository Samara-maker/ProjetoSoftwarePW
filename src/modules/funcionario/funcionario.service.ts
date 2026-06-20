import { BadRequestException, Injectable } from '@nestjs/common';
import { Funcionario } from './funcionario.entity';
import { CreateFuncionarioDto } from './dtos/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dtos/update-funcionario.dto';
import { Agendamento } from '../agendamento/agendamento.entity';
import { FuncionarioEquipe } from '../equipe/funcionario-equipe.entity';

@Injectable()
export class FuncionarioService {
  async findAll(): Promise<Funcionario[]> {
    return Funcionario.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Funcionario | null> {
    return Funcionario.findOne({ where: { id } });
  }

  async create(dados: CreateFuncionarioDto): Promise<Funcionario> {
    const funcionario = Funcionario.create({ ...dados });
    return funcionario.save();
  }

  async update(
    id: number,
    dados: UpdateFuncionarioDto,
  ): Promise<Funcionario | null> {
    const funcionario = await this.findOne(id);

    if (!funcionario) {
      return null;
    }

    Object.assign(funcionario, { ...dados });

    return funcionario.save();
  }

  async remove(id: number): Promise<Funcionario | null> {
    const funcionario = await this.findOne(id);

    if (!funcionario) {
      return null;
    }

    const possuiAgendamentos = await Agendamento.count({
      where: { funcionario: { id } },
    });
    const possuiEquipes = await FuncionarioEquipe.count({
      where: { funcionario: { id } },
    });

    if (possuiAgendamentos > 0 || possuiEquipes > 0) {
      throw new BadRequestException(
        'Funcionário não pode ser excluído pois possui agendamentos ou equipes vinculadas.',
      );
    }

    return funcionario.remove();
  }
}
