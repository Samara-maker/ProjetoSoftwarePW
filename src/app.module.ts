import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database/database.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { EquipeModule } from './modules/equipe/equipe.module';
import { CategoriaServicoModule } from './modules/categoria-servico/categoria-servico.module';
import { ServicoModule } from './modules/servico/servico.module';
import { AgendamentoModule } from './modules/agendamento/agendamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ClienteModule,
    FuncionarioModule,
    EquipeModule,
    CategoriaServicoModule,
    ServicoModule,
    AgendamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
