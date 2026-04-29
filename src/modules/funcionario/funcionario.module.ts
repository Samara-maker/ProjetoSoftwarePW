import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';

@Module({
  imports: [DatabaseModule],
  providers: [FuncionarioService],
  controllers: [FuncionarioController],
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
