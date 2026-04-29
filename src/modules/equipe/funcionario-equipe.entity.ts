import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Funcionario } from '../funcionario/funcionario.entity';
import { Equipe } from './equipe.entity';

@Entity('funcionario_equipe')
export class FuncionarioEquipe {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Funcionario, (f) => f.funcionarioEquipes)
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @ManyToOne(() => Equipe, (e) => e.funcionarioEquipes)
  @JoinColumn({ name: 'equipe_id' })
  equipe: Equipe;
}
