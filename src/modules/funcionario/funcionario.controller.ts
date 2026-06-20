import { Body, Controller, Get, Post, Redirect, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { FuncionarioService } from './funcionario.service';
import { ValidationView } from 'nest-validation-view';
import { CreateFuncionarioDto } from './dtos/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dtos/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private funcionarioService: FuncionarioService) {}

  @Get()
  @Render('funcionario/inicial')
  async inicial() {
    const funcionarios = await this.funcionarioService.findAll();
    return { title: 'Funcionários', controller: 'Funcionarios', funcionarios };
  }

  @Get('criar')
  @Render('funcionario/formulario')
  criar() {
    return { title: 'Novo Funcionário', controller: 'Funcionarios', titulo: 'Novo Funcionário' };
  }

  @Post('criar')
  @Redirect('/funcionarios')
  @ValidationView('funcionario/formulario', ({ request, errors }) => ({
    title: 'Novo Funcionário', controller: 'Funcionarios', titulo: 'Novo Funcionário',
    funcionario: { ...request.body }, errors,
  }))
  async criarSalvar(@Body() dados: CreateFuncionarioDto) {
    await this.funcionarioService.create(dados);
  }

  @Get(':id/editar')
  @Render('funcionario/formulario')
  async editar(@Param('id') id: number) {
    const funcionario = await this.funcionarioService.findOne(id);
    return { title: 'Editar Funcionário', controller: 'Funcionarios', titulo: 'Editar Funcionário', funcionario };
  }

  @Post(':id/editar')
  @Redirect('/funcionarios')
  @ValidationView('funcionario/formulario', ({ request, errors }) => ({
    title: 'Editar Funcionário', controller: 'Funcionarios', titulo: 'Editar Funcionário',
    funcionario: { id: request.params.id, ...request.body }, errors,
  }))
  async editarSalvar(@Param('id') id: number, @Body() dados: UpdateFuncionarioDto) {
    await this.funcionarioService.update(id, dados);
  }

  @Get(':id/excluir')
  @Render('funcionario/remover')
  async excluir(@Param('id') id: number) {
    const funcionario = await this.funcionarioService.findOne(id);
    return { title: 'Excluir Funcionário', controller: 'Funcionarios', funcionario };
  }

  @Post(':id/excluir')
  async excluirSalvar(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.funcionarioService.remove(id);
      res.redirect('/funcionarios');
    } catch (error) {
      const funcionario = await this.funcionarioService.findOne(id);
      res.status(400).render('funcionario/remover', {
        title: 'Excluir Funcionário', controller: 'Funcionarios', funcionario, erro: error.message,
      });
    }
  }
}
