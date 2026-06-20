import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Equipe } from '../equipe/equipe.entity';
import { AgendamentoServico } from './agendamento-servico.entity';

@Entity('agendamento')
export class Agendamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date', nullable: true })
  data?: string;

  @Column({ name: 'horario_inicio', type: 'time', nullable: true })
  horarioInicio?: string;

  @Column({ name: 'horario_fim', type: 'time', nullable: true })
  horarioFim?: string;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status?: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos, {
    nullable: true,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente?: Cliente;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.agendamentos, {
    nullable: true,
  })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario?: Funcionario;

  @ManyToOne(() => Equipe, (equipe) => equipe.agendamentos, {
    nullable: true,
  })
  @JoinColumn({ name: 'equipe_id' })
  equipe?: Equipe;

  @OneToMany(() => AgendamentoServico, (as) => as.agendamento)
  agendamentoServicos!: AgendamentoServico[];
}
