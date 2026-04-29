import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Agendamento } from './agendamento.entity';

@Injectable()
export class AgendamentoService {
  private agendamentoRepository: Repository<Agendamento>;

  constructor(@Inject('DATA_SOURCE') private dataSource: DataSource) {
    this.agendamentoRepository = this.dataSource.getRepository(Agendamento);
  }

  async findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: ['cliente', 'funcionario', 'equipe'],
      order: { data: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Agendamento> {
    return this.agendamentoRepository.findOne({
      where: { id },
      relations: ['cliente', 'funcionario', 'equipe'],
    });
  }

  async create(data: any): Promise<Agendamento> {
    const agendamento = this.agendamentoRepository.create({
      data: data.data,
      horarioInicio: data.horarioInicio,
      horarioFim: data.horarioFim,
      observacoes: data.observacoes,
      status: data.status || 'pendente',
      cliente: { id: data.cliente_id },
      funcionario: data.funcionario_id ? { id: data.funcionario_id } : null,
      equipe: data.equipe_id ? { id: data.equipe_id } : null,
    });
    return this.agendamentoRepository.save(agendamento);
  }

  async update(id: number, data: any): Promise<void> {
    await this.agendamentoRepository.update(id, {
      data: data.data,
      horarioInicio: data.horarioInicio,
      horarioFim: data.horarioFim,
      observacoes: data.observacoes,
      status: data.status,
      cliente: { id: data.cliente_id },
      funcionario: data.funcionario_id ? { id: data.funcionario_id } : null,
      equipe: data.equipe_id ? { id: data.equipe_id } : null,
    });
  }

  async remove(id: number): Promise<void> {
    await this.agendamentoRepository.delete(id);
  }
}
