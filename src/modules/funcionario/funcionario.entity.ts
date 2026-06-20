import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FuncionarioEquipe } from '../equipe/funcionario-equipe.entity';
import { Agendamento } from '../agendamento/agendamento.entity';

@Entity('funcionario')
export class Funcionario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 100 })
  nome!: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  cargo?: string;

  @OneToMany(() => FuncionarioEquipe, (fe) => fe.funcionario)
  funcionarioEquipes!: FuncionarioEquipe[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario)
  agendamentos!: Agendamento[];
}
