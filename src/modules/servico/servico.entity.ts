import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoriaServico } from '../categoria-servico/categoria-servico.entity';
import { AgendamentoServico } from '../agendamento/agendamento-servico.entity';

@Entity('servico')
export class Servico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descricao?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valor?: number;

  @ManyToOne(() => CategoriaServico, (categoria) => categoria.servicos, {
    nullable: true,
  })
  @JoinColumn({ name: 'categoria_id' })
  categoria?: CategoriaServico;

  @OneToMany(() => AgendamentoServico, (as) => as.servico)
  agendamentoServicos!: AgendamentoServico[];
}
