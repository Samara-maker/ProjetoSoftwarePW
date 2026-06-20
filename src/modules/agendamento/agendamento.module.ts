import { Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';
import { ClienteModule } from '../cliente/cliente.module';
import { FuncionarioModule } from '../funcionario/funcionario.module';
import { EquipeModule } from '../equipe/equipe.module';
import { ServicoModule } from '../servico/servico.module';

@Module({
  imports: [ClienteModule, FuncionarioModule, EquipeModule, ServicoModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
  exports: [AgendamentoService],
})
export class AgendamentoModule {}
