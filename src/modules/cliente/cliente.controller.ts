import { Controller, Get, Post, Render, Redirect, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @Render('cliente/lista')
  async index() {
    const clientes = await this.clienteService.findAll();
    return { clientes, titulo: 'Clientes' };
  }

  @Get('novo')
  @Render('cliente/formulario')
  novo() {
    return { cliente: null, titulo: 'Novo Cliente' };
  }

  @Post('novo')
  async criar(@Body() body, @Res() res: Response) {
    await this.clienteService.create(body);
    return res.redirect('/clientes');
  }

  @Get(':id/editar')
  @Render('cliente/formulario')
  async editar(@Param('id') id: string) {
    const cliente = await this.clienteService.findOne(+id);
    return { cliente, titulo: 'Editar Cliente' };
  }

  @Post(':id/editar')
  async atualizar(@Param('id') id: string, @Body() body, @Res() res: Response) {
    await this.clienteService.update(+id, body);
    return res.redirect('/clientes');
  }

  @Post(':id/excluir')
  async excluir(@Param('id') id: string, @Res() res: Response) {
    await this.clienteService.remove(+id);
    return res.redirect('/clientes');
  }
}
