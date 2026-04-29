import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { AgendamentoService } from './agendamento.service';
import { AgendamentoController } from './agendamento.controller';
import { ClienteModule } from '../cliente/cliente.module';
import { FuncionarioModule } from '../funcionario/funcionario.module';
import { EquipeModule } from '../equipe/equipe.module';

@Module({
  imports: [DatabaseModule, ClienteModule, FuncionarioModule, EquipeModule],
  providers: [AgendamentoService],
  controllers: [AgendamentoController],
})
export class AgendamentoModule {}
