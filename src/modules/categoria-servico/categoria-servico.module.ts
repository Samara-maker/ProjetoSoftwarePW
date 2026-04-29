import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { CategoriaServicoService } from './categoria-servico.service';
import { CategoriaServicoController } from './categoria-servico.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriaServicoService],
  controllers: [CategoriaServicoController],
  exports: [CategoriaServicoService],
})
export class CategoriaServicoModule {}
