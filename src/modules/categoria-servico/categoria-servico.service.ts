import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CategoriaServico } from './categoria-servico.entity';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
 
@Injectable()
export class CategoriaServicoService {
  private categoriaRepository: Repository<CategoriaServico>;
 
  constructor(@Inject(DATABASE_SOURCE) private dataSource: DataSource) {
    this.categoriaRepository = this.dataSource.getRepository(CategoriaServico);
  }
 
  async findAll(): Promise<CategoriaServico[]> {
    return this.categoriaRepository.find({ order: { nome: 'ASC' } });
  }
 
  async findOne(id: number): Promise<CategoriaServico> {
    return this.categoriaRepository.findOne({ where: { id } });
  }
 
  async create(data: Partial<CategoriaServico>): Promise<CategoriaServico> {
    const categoria = this.categoriaRepository.create(data);
    return this.categoriaRepository.save(categoria);
  }
 
  async update(id: number, data: Partial<CategoriaServico>): Promise<void> {
    await this.categoriaRepository.update(id, data);
  }
 
  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }
}
 