import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Servico } from '../servico/servico.entity';

@Entity('categoria_servico')
export class CategoriaServico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nome?: string;

  @OneToMany(() => Servico, (servico) => servico.categoria)
  servicos!: Servico[];
}
