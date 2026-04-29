import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { Cliente } from '../cliente/cliente.entity';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Equipe } from '../equipe/equipe.entity';
import { AgendamentoServico } from './agendamento-servico.entity';

@Entity('agendamento')
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (c) => c.agendamentos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  @Column({ type: 'date' })
  data: string;

  @Column({ name: 'horario_inicio', type: 'time' })
  horarioInicio: string;

  @Column({ name: 'horario_fim', type: 'time' })
  horarioFim: string;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @Column({ type: 'varchar', length: 50, default: 'pendente' })
  status: string;

  @ManyToOne(() => Funcionario, (f) => f.agendamentos, { nullable: true })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @ManyToOne(() => Equipe, (e) => e.agendamentos, { nullable: true })
  @JoinColumn({ name: 'equipe_id' })
  equipe: Equipe;

  @OneToMany(() => AgendamentoServico, (as) => as.agendamento)
  agendamentoServicos: AgendamentoServico[];
}
