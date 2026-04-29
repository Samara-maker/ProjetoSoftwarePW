import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { CategoriaServicoModule } from '../categoria-servico/categoria-servico.module';

@Module({
  imports: [DatabaseModule, CategoriaServicoModule],
  providers: [ServicoService],
  controllers: [ServicoController],
  exports: [ServicoService],
})
export class ServicoModule {}
