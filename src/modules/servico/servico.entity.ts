import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CategoriaServico } from '../categoria-servico/categoria-servico.entity';
import { AgendamentoServico } from '../agendamento/agendamento-servico.entity';

@Entity('servico')
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => CategoriaServico, (cat) => cat.servicos)
  @JoinColumn({ name: 'categoria_id' })
  categoria: CategoriaServico;

  @OneToMany(() => AgendamentoServico, (as) => as.servico)
  agendamentoServicos: AgendamentoServico[];
}
