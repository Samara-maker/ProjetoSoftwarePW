import { Body, Controller, Get, Post, Redirect, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquipeService } from './equipe.service';
import { FuncionarioService } from '../funcionario/funcionario.service';
import { ValidationView } from 'nest-validation-view';
import { CreateEquipeDto } from './dtos/create-equipe.dto';
import { UpdateEquipeDto } from './dtos/update-equipe.dto';

@Controller('equipes')
export class EquipeController {
  constructor(private equipeService: EquipeService, private funcionarioService: FuncionarioService) {}

  @Get()
  @Render('equipe/inicial')
  async inicial() {
    const equipes = await this.equipeService.findAll();
    return { title: 'Equipes', controller: 'Equipes', equipes };
  }

  @Get('criar')
  @Render('equipe/formulario')
  async criar() {
    const funcionarios = await this.funcionarioService.findAll();
    return { title: 'Nova Equipe', controller: 'Equipes', titulo: 'Nova Equipe', funcionarios, funcionariosSelecionados: [] };
  }

  @Post('criar')
  @Redirect('/equipes')
  @ValidationView('equipe/formulario', ({ request, errors }) => ({
    title: 'Nova Equipe', controller: 'Equipes', titulo: 'Nova Equipe',
    equipe: { ...request.body }, funcionarios: [], funcionariosSelecionados: [], errors,
  }))
  async criarSalvar(@Body() dados: CreateEquipeDto) {
    await this.equipeService.create(dados);
  }

  @Get(':id/editar')
  @Render('equipe/formulario')
  async editar(@Param('id') id: number) {
    const equipe = await this.equipeService.findOne(id);
    const funcionarios = await this.funcionarioService.findAll();
    const funcionariosSelecionados = await this.equipeService.findFuncionariosIds(id);
    return { title: 'Editar Equipe', controller: 'Equipes', titulo: 'Editar Equipe', equipe, funcionarios, funcionariosSelecionados };
  }

  @Post(':id/editar')
  @Redirect('/equipes')
  @ValidationView('equipe/formulario', ({ request, errors }) => ({
    title: 'Editar Equipe', controller: 'Equipes', titulo: 'Editar Equipe',
    equipe: { id: request.params.id, ...request.body }, funcionarios: [], funcionariosSelecionados: [], errors,
  }))
  async editarSalvar(@Param('id') id: number, @Body() dados: UpdateEquipeDto) {
    await this.equipeService.update(id, dados);
  }

  @Get(':id/excluir')
  @Render('equipe/remover')
  async excluir(@Param('id') id: number) {
    const equipe = await this.equipeService.findOne(id);
    return { title: 'Excluir Equipe', controller: 'Equipes', equipe };
  }

  @Post(':id/excluir')
  async excluirSalvar(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.equipeService.remove(id);
      res.redirect('/equipes');
    } catch (error) {
      const equipe = await this.equipeService.findOne(id);
      res.status(400).render('equipe/remover', { title: 'Excluir Equipe', controller: 'Equipes', equipe, erro: error.message });
    }
  }
}
