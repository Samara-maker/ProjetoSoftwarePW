import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { EquipeService } from './equipe.service';
import { EquipeController } from './equipe.controller';

@Module({
  imports: [DatabaseModule],
  providers: [EquipeService],
  controllers: [EquipeController],
  exports: [EquipeService],
})
export class EquipeModule {}
