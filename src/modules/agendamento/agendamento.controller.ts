import { Controller, Get, Post, Render, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { AgendamentoService } from './agendamento.service';
import { ClienteService } from '../cliente/cliente.service';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { EquipeService } from '../equipe/equipe.service';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(
    private readonly agendamentoService: AgendamentoService,
    private readonly clienteService: ClienteService,
    private readonly funcionarioService: FuncionarioService,
    private readonly equipeService: EquipeService,
  ) {}

  @Get()
  @Render('agendamento/lista')
  async index() {
    const agendamentos = await this.agendamentoService.findAll();
    return { agendamentos, titulo: 'Agendamentos' };
  }

  @Get('novo')
  @Render('agendamento/formulario')
  async novo() {
    const clientes = await this.clienteService.findAll();
    const funcionarios = await this.funcionarioService.findAll();
    const equipes = await this.equipeService.findAll();
    return { agendamento: null, clientes, funcionarios, equipes, titulo: 'Novo Agendamento' };
  }

  @Post('novo')
  async criar(@Body() body, @Res() res: Response) {
    await this.agendamentoService.create(body);
    return res.redirect('/agendamentos');
  }

  @Get(':id/editar')
  @Render('agendamento/formulario')
  async editar(@Param('id') id: string) {
    const agendamento = await this.agendamentoService.findOne(+id);
    const clientes = await this.clienteService.findAll();
    const funcionarios = await this.funcionarioService.findAll();
    const equipes = await this.equipeService.findAll();
    return { agendamento, clientes, funcionarios, equipes, titulo: 'Editar Agendamento' };
  }

  @Post(':id/editar')
  async atualizar(@Param('id') id: string, @Body() body, @Res() res: Response) {
    await this.agendamentoService.update(+id, body);
    return res.redirect('/agendamentos');
  }

  @Post(':id/excluir')
  async excluir(@Param('id') id: string, @Res() res: Response) {
    await this.agendamentoService.remove(+id);
    return res.redirect('/agendamentos');
  }
}
