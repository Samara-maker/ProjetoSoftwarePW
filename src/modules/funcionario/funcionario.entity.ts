import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FuncionarioEquipe } from '../equipe/funcionario-equipe.entity';
import { Agendamento } from '../agendamento/agendamento.entity';

@Entity('funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 50 })
  cargo: string;

  @OneToMany(() => FuncionarioEquipe, (fe) => fe.funcionario)
  funcionarioEquipes: FuncionarioEquipe[];

  @OneToMany(() => Agendamento, (agendamento) => agendamento.funcionario)
  agendamentos: Agendamento[];
}
