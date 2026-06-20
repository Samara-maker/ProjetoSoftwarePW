import { Body, Controller, Get, Post, Redirect, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteService } from './cliente.service';
import { ValidationView } from 'nest-validation-view';
import { CreateClienteDto } from './dtos/create-cliente.dto';
import { UpdateClienteDto } from './dtos/update-cliente.dto';

@Controller('clientes')
export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  @Get()
  @Render('cliente/inicial')
  async inicial() {
    const clientes = await this.clienteService.findAll();
    return { title: 'Clientes', controller: 'Clientes', clientes };
  }

  @Get('criar')
  @Render('cliente/formulario')
  criar() {
    return { title: 'Novo Cliente', controller: 'Clientes', titulo: 'Novo Cliente' };
  }

  @Post('criar')
  @Redirect('/clientes')
  @ValidationView('cliente/formulario', ({ request, errors }) => ({
    title: 'Novo Cliente', controller: 'Clientes', titulo: 'Novo Cliente',
    cliente: { ...request.body }, errors,
  }))
  async criarSalvar(@Body() dados: CreateClienteDto) {
    await this.clienteService.create(dados);
  }

  @Get(':id/editar')
  @Render('cliente/formulario')
  async editar(@Param('id') id: number) {
    const cliente = await this.clienteService.findOne(id);
    return { title: 'Editar Cliente', controller: 'Clientes', titulo: 'Editar Cliente', cliente };
  }

  @Post(':id/editar')
  @Redirect('/clientes')
  @ValidationView('cliente/formulario', ({ request, errors }) => ({
    title: 'Editar Cliente', controller: 'Clientes', titulo: 'Editar Cliente',
    cliente: { id: request.params.id, ...request.body }, errors,
  }))
  async editarSalvar(@Param('id') id: number, @Body() dados: UpdateClienteDto) {
    await this.clienteService.update(id, dados);
  }

  @Get(':id/excluir')
  @Render('cliente/remover')
  async excluir(@Param('id') id: number) {
    const cliente = await this.clienteService.findOne(id);
    return { title: 'Excluir Cliente', controller: 'Clientes', cliente };
  }

  @Post(':id/excluir')
  async excluirSalvar(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.clienteService.remove(id);
      res.redirect('/clientes');
    } catch (error) {
      const cliente = await this.clienteService.findOne(id);
      res.status(400).render('cliente/remover', {
        title: 'Excluir Cliente', controller: 'Clientes', cliente, erro: error.message,
      });
    }
  }
}
