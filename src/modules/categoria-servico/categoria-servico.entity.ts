import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servico } from '../servico/servico.entity';

@Entity('categoria_servico')
export class CategoriaServico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @OneToMany(() => Servico, (servico) => servico.categoria)
  servicos: Servico[];
}
