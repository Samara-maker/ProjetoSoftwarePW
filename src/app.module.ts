import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClienteModule } from './modules/cliente/cliente.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { EquipeModule } from './modules/equipe/equipe.module';
import { CategoriaServicoModule } from './modules/categoria-servico/categoria-servico.module';
import { ServicoModule } from './modules/servico/servico.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';

@Module({
  imports: [
    ClienteModule,
    FuncionarioModule,
    EquipeModule,
    CategoriaServicoModule,
    ServicoModule,
    AgendamentoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
