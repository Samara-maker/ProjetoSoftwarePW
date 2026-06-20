import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';
import { Agendamento } from '../agendamento/agendamento.entity';

@Injectable()
export class ClienteService {
  async findAll(): Promise<Cliente[]> {
    return Cliente.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Cliente | null> {
    return Cliente.findOne({ where: { id } });
  }

  async create(dados: CreateClienteDto): Promise<Cliente> {
    const cliente = Cliente.create({ ...dados });
    return cliente.save();
  }

  async update(id: number, dados: UpdateClienteDto): Promise<Cliente | null> {
    const cliente = await this.findOne(id);

    if (!cliente) {
      return null;
    }

    Object.assign(cliente, { ...dados });

    return cliente.save();
  }

  async remove(id: number): Promise<Cliente | null> {
    const cliente = await this.findOne(id);

    if (!cliente) {
      return null;
    }

    const possuiAgendamentos = await Agendamento.count({
      where: { cliente: { id } },
    });

    if (possuiAgendamentos > 0) {
      throw new BadRequestException(
        'Cliente não pode ser excluído pois possui agendamentos vinculados.',
      );
    }

    return cliente.remove();
  }
}
