import { Servico } from './servico.entity';
import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
 
@Injectable()
export class ServicoService {
  private servicoRepository: Repository<Servico>;
 
  constructor(@Inject(DATABASE_SOURCE) private dataSource: DataSource) {
    this.servicoRepository = this.dataSource.getRepository(Servico);
  }
 
  async findAll(): Promise<Servico[]> {
    return this.servicoRepository.find({
      relations: ['categoria', 'agendamentoServicos'],
      order: { descricao: 'ASC' },
    });
  }
 
  async findOne(id: number): Promise<Servico> {
    return this.servicoRepository.findOne({
      where: { id },
      relations: ['categoria', 'agendamentoServicos'],
    });
  }
 
  async create(data: any): Promise<Servico> {
    const servico = this.servicoRepository.create({
      descricao: data.descricao,
      valor: data.valor,
      categoria: { id: data.categoria_id },
    });
    return this.servicoRepository.save(servico);
  }
 
  async update(id: number, data: any): Promise<void> {
    await this.servicoRepository.update(id, {
      descricao: data.descricao,
      valor: data.valor,
      categoria: { id: data.categoria_id },
    });
  }
 
  async remove(id: number): Promise<void> {
    await this.servicoRepository.delete(id);
  }
}