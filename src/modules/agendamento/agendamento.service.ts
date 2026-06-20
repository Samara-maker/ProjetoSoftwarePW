import { Injectable } from '@nestjs/common';
import { Agendamento } from './agendamento.entity';
import { AgendamentoServico } from './agendamento-servico.entity';
import { CreateAgendamentoDto } from './dtos/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dtos/update-agendamento.dto';

@Injectable()
export class AgendamentoService {
  async findAll(): Promise<Agendamento[]> {
    return Agendamento.find({
      relations: [
        'cliente',
        'funcionario',
        'equipe',
        'agendamentoServicos',
        'agendamentoServicos.servico',
      ],
      order: { data: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Agendamento | null> {
    return Agendamento.findOne({
      where: { id },
      relations: [
        'cliente',
        'funcionario',
        'equipe',
        'agendamentoServicos',
        'agendamentoServicos.servico',
      ],
    });
  }

  private async sincronizarServicos(
    agendamentoId: number,
    servicosIds: number[] = [],
  ): Promise<void> {
    await AgendamentoServico.delete({ agendamentoId });

    for (const servicoId of servicosIds) {
      const vinculo = AgendamentoServico.create({ agendamentoId, servicoId });
      await vinculo.save();
    }
  }

  async create(dados: CreateAgendamentoDto): Promise<Agendamento> {
    const agendamento = Agendamento.create({
      data: dados.data,
      horarioInicio: dados.horarioInicio,
      horarioFim: dados.horarioFim,
      observacao: dados.observacao,
      status: dados.status,
      cliente: { id: dados.clienteId },
      funcionario: dados.funcionarioId ? { id: dados.funcionarioId } : undefined,
      equipe: dados.equipeId ? { id: dados.equipeId } : undefined,
    });

    await agendamento.save();

    await this.sincronizarServicos(agendamento.id, dados.servicosIds);

    return agendamento;
  }

  async update(
    id: number,
    dados: UpdateAgendamentoDto,
  ): Promise<Agendamento | null> {
    const agendamento = await this.findOne(id);

    if (!agendamento) {
      return null;
    }

    Object.assign(agendamento, {
      data: dados.data,
      horarioInicio: dados.horarioInicio,
      horarioFim: dados.horarioFim,
      observacao: dados.observacao,
      status: dados.status,
      cliente: { id: dados.clienteId },
      funcionario: dados.funcionarioId ? { id: dados.funcionarioId } : undefined,
      equipe: dados.equipeId ? { id: dados.equipeId } : undefined,
    });

    await agendamento.save();

    await this.sincronizarServicos(id, dados.servicosIds);

    return agendamento;
  }

  async remove(id: number): Promise<Agendamento | null> {
    const agendamento = await this.findOne(id);

    if (!agendamento) {
      return null;
    }

    await AgendamentoServico.delete({ agendamentoId: id });

    return agendamento.remove();
  }

  async findServicosIds(agendamentoId: number): Promise<number[]> {
    const vinculos = await AgendamentoServico.find({
      where: { agendamento: { id: agendamentoId } },
    });
    return vinculos.map((v) => v.servicoId);
  }

  async calcularValorTotal(agendamento: Agendamento): Promise<number> {
    if (!agendamento.agendamentoServicos) return 0;

    return agendamento.agendamentoServicos.reduce((total, vinculo) => {
      const valor = vinculo.servico ? Number(vinculo.servico.valor) : 0;
      return total + valor;
    }, 0);
  }
}
