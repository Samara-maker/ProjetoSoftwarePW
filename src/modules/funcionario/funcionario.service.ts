import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Funcionario } from './funcionario.entity';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
 
@Injectable()
export class FuncionarioService {
  private funcionarioRepository: Repository<Funcionario>;
 
  constructor(@Inject(DATABASE_SOURCE) private dataSource: DataSource) {
    this.funcionarioRepository = this.dataSource.getRepository(Funcionario);
  }
 
  async findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ order: { nome: 'ASC' } });
  }
 
  async findOne(id: number): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { id } });
  }
 
  async create(data: Partial<Funcionario>): Promise<Funcionario> {
    const funcionario = this.funcionarioRepository.create(data);
    return this.funcionarioRepository.save(funcionario);
  }
 
  async update(id: number, data: Partial<Funcionario>): Promise<void> {
    await this.funcionarioRepository.update(id, data);
  }
 
  async remove(id: number): Promise<void> {
    await this.funcionarioRepository.delete(id);
  }
}
 