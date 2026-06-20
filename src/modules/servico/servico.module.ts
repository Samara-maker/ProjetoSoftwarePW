import { Module } from '@nestjs/common';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { CategoriaServicoModule } from '../categoria-servico/categoria-servico.module';

@Module({
  imports: [CategoriaServicoModule],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService],
})
export class ServicoModule {}
