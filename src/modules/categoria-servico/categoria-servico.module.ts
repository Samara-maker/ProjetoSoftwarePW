import { Module } from '@nestjs/common';
import { CategoriaServicoController } from './categoria-servico.controller';
import { CategoriaServicoService } from './categoria-servico.service';

@Module({
  imports: [],
  controllers: [CategoriaServicoController],
  providers: [CategoriaServicoService],
  exports: [CategoriaServicoService],
})
export class CategoriaServicoModule {}
