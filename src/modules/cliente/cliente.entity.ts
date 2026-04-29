import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Agendamento } from '../agendamento/agendamento.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  telefone: string;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente)
  agendamentos: Agendamento[];
}
