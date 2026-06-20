import { BadRequestException, Injectable } from '@nestjs/common';
import { Servico } from './servico.entity';
import { CreateServicoDto } from './dtos/create-servico.dto';
import { UpdateServicoDto } from './dtos/update-servico.dto';
import { AgendamentoServico } from '../agendamento/agendamento-servico.entity';

@Injectable()
export class ServicoService {
  async findAll(): Promise<Servico[]> {
    return Servico.find({ relations: ['categoria'], order: { descricao: 'ASC' } });
  }

  async findOne(id: number): Promise<Servico | null> {
    return Servico.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async create(dados: CreateServicoDto): Promise<Servico> {
    const servico = Servico.create({
      ...dados,
      categoria: { id: dados.categoria },
    });

    return servico.save();
  }

  async update(id: number, dados: UpdateServicoDto): Promise<Servico | null> {
    const servico = await this.findOne(id);

    if (!servico) {
      return null;
    }

    Object.assign(servico, {
      ...dados,
      categoria: { id: dados.categoria },
    });

    return servico.save();
  }

  async remove(id: number): Promise<Servico | null> {
    const servico = await this.findOne(id);

    if (!servico) {
      return null;
    }

    const possuiAgendamentos = await AgendamentoServico.count({
      where: { servico: { id } },
    });

    if (possuiAgendamentos > 0) {
      throw new BadRequestException(
        'Serviço não pode ser excluído pois está vinculado a agendamentos.',
      );
    }

    return servico.remove();
  }
}
