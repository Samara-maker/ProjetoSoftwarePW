import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Equipe } from './equipe.entity';
import { DATABASE_SOURCE } from '../../config/constants/database-source';
 
@Injectable()
export class EquipeService {
  private equipeRepository: Repository<Equipe>;
 
  constructor(@Inject(DATABASE_SOURCE) private dataSource: DataSource) {
    this.equipeRepository = this.dataSource.getRepository(Equipe);
  }
 
  async findAll(): Promise<Equipe[]> {
    return this.equipeRepository.find({ order: { nome: 'ASC' } });
  }
 
  async findOne(id: number): Promise<Equipe> {
    return this.equipeRepository.findOne({ where: { id } });
  }
 
  async create(data: Partial<Equipe>): Promise<Equipe> {
    const equipe = this.equipeRepository.create(data);
    return this.equipeRepository.save(equipe);
  }
 
  async update(id: number, data: Partial<Equipe>): Promise<void> {
    await this.equipeRepository.update(id, data);
  }
 
  async remove(id: number): Promise<void> {
    await this.equipeRepository.delete(id);
  }
}
 