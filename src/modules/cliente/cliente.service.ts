import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Cliente } from './cliente.entity';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
 
@Injectable()
export class ClienteService {
  private clienteRepository: Repository<Cliente>;
 
  constructor(@Inject(DATABASE_SOURCE) private dataSource: DataSource) {
    this.clienteRepository = this.dataSource.getRepository(Cliente);
  }
 
  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({ order: { nome: 'ASC' } });
  }
 
  async findOne(id: number): Promise<Cliente> {
    return this.clienteRepository.findOne({ where: { id } });
  }
 
  async create(data: Partial<Cliente>): Promise<Cliente> {
    const cliente = this.clienteRepository.create(data);
    return this.clienteRepository.save(cliente);
  }
 
  async update(id: number, data: Partial<Cliente>): Promise<void> {
    await this.clienteRepository.update(id, data);
  }
 
  async remove(id: number): Promise<void> {
    await this.clienteRepository.delete(id);
  }
}
 