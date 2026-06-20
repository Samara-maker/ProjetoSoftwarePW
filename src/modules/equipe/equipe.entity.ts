import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FuncionarioEquipe } from './funcionario-equipe.entity';
import { Agendamento } from '../agendamento/agendamento.entity';

@Entity('equipe')
export class Equipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nome?: string;

  @OneToMany(() => FuncionarioEquipe, (fe) => fe.equipe)
  funcionarioEquipes!: FuncionarioEquipe[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.equipe)
  agendamentos!: Agendamento[];
}
