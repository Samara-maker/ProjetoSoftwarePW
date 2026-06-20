import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Equipe } from './equipe.entity';

@Entity('funcionario_equipe')
export class FuncionarioEquipe extends BaseEntity {
  @PrimaryColumn({ name: 'funcionario_id' })
  funcionarioId!: number;

  @PrimaryColumn({ name: 'equipe_id' })
  equipeId!: number;

  @ManyToOne(() => Funcionario, (f) => f.funcionarioEquipes)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario!: Funcionario;

  @ManyToOne(() => Equipe, (e) => e.funcionarioEquipes)
  @JoinColumn({ name: 'equipe_id' })
  equipe!: Equipe;
}
