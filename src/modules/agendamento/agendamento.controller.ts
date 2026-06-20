import { Body, Controller, Get, Post, Redirect, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AgendamentoService } from './agendamento.service';
import { ClienteService } from '../cliente/cliente.service';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { EquipeService } from '../equipe/equipe.service';
import { ServicoService } from '../servico/servico.service';
import { ValidationView } from 'nest-validation-view';
import { CreateAgendamentoDto } from './dtos/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dtos/update-agendamento.dto';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(
    private agendamentoService: AgendamentoService,
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private equipeService: EquipeService,
    private servicoService: ServicoService,
  ) {}

  @Get()
  @Render('agendamento/inicial')
  async inicial() {
    const agendamentos = await this.agendamentoService.findAll();
    return { title: 'Agendamentos', controller: 'Agendamentos', agendamentos };
  }

  private async dadosFormulario() {
    const [clientes, funcionarios, equipes, servicos] = await Promise.all([
      this.clienteService.findAll(),
      this.funcionarioService.findAll(),
      this.equipeService.findAll(),
      this.servicoService.findAll(),
    ]);
    return { clientes, funcionarios, equipes, servicos };
  }

  @Get('criar')
  @Render('agendamento/formulario')
  async criar() {
    const dados = await this.dadosFormulario();
    return { title: 'Novo Agendamento', controller: 'Agendamentos', titulo: 'Novo Agendamento', servicosSelecionados: [], ...dados };
  }

  @Post('criar')
  @Redirect('/agendamentos')
  @ValidationView('agendamento/formulario', ({ request, errors }) => {
    const ids = request.body.servicosIds;
    return {
      title: 'Novo Agendamento', controller: 'Agendamentos', titulo: 'Novo Agendamento',
      agendamento: { ...request.body }, clientes: [], funcionarios: [], equipes: [], servicos: [],
      servicosSelecionados: Array.isArray(ids) ? ids : ids ? [ids] : [],
      errors,
    };
  })
  async criarSalvar(@Body() dados: CreateAgendamentoDto) {
    await this.agendamentoService.create(dados);
  }

  @Get(':id/editar')
  @Render('agendamento/formulario')
  async editar(@Param('id') id: number) {
    const agendamento = await this.agendamentoService.findOne(id);
    const dados = await this.dadosFormulario();
    const servicosSelecionados = await this.agendamentoService.findServicosIds(id);
    return { title: 'Editar Agendamento', controller: 'Agendamentos', titulo: 'Editar Agendamento', agendamento, servicosSelecionados, ...dados };
  }

  @Post(':id/editar')
  @Redirect('/agendamentos')
  @ValidationView('agendamento/formulario', ({ request, errors }) => {
    const ids = request.body.servicosIds;
    return {
      title: 'Editar Agendamento', controller: 'Agendamentos', titulo: 'Editar Agendamento',
      agendamento: { id: request.params.id, ...request.body }, clientes: [], funcionarios: [], equipes: [], servicos: [],
      servicosSelecionados: Array.isArray(ids) ? ids : ids ? [ids] : [],
      errors,
    };
  })
  async editarSalvar(@Param('id') id: number, @Body() dados: UpdateAgendamentoDto) {
    await this.agendamentoService.update(id, dados);
  }

  @Get(':id/excluir')
  @Render('agendamento/remover')
  async excluir(@Param('id') id: number) {
    const agendamento = await this.agendamentoService.findOne(id);
    return { title: 'Excluir Agendamento', controller: 'Agendamentos', agendamento };
  }

  @Post(':id/excluir')
  @Redirect('/agendamentos')
  async excluirSalvar(@Param('id') id: number) {
    await this.agendamentoService.remove(id);
  }
}
