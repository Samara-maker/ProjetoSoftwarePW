import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [DatabaseModule],
  providers: [ClienteService],
  controllers: [ClienteController],
})
export class ClienteModule {}
