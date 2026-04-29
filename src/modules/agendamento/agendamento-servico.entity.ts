import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Agendamento } from './agendamento.entity';
import { Servico } from '../servico/servico.entity';

@Entity('agendamento_servico')
export class AgendamentoServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Agendamento, (a) => a.agendamentoServicos)
  @JoinColumn({ name: 'agendamento_id' })
  agendamento: Agendamento;

  @ManyToOne(() => Servico, (s) => s.agendamentoServicos)
  @JoinColumn({ name: 'servico_id' })
  servico: Servico;
}
