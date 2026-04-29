import { Controller, Get, Post, Render, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { FuncionarioService } from './funcionario.service';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Get()
  @Render('funcionario/lista')
  async index() {
    const funcionarios = await this.funcionarioService.findAll();
    return { funcionarios, titulo: 'Funcionários' };
  }

  @Get('novo')
  @Render('funcionario/formulario')
  novo() {
    return { funcionario: null, titulo: 'Novo Funcionário' };
  }

  @Post('novo')
  async criar(@Body() body, @Res() res: Response) {
    await this.funcionarioService.create(body);
    return res.redirect('/funcionarios');
  }

  @Get(':id/editar')
  @Render('funcionario/formulario')
  async editar(@Param('id') id: string) {
    const funcionario = await this.funcionarioService.findOne(+id);
    return { funcionario, titulo: 'Editar Funcionário' };
  }

  @Post(':id/editar')
  async atualizar(@Param('id') id: string, @Body() body, @Res() res: Response) {
    await this.funcionarioService.update(+id, body);
    return res.redirect('/funcionarios');
  }

  @Post(':id/excluir')
  async excluir(@Param('id') id: string, @Res() res: Response) {
    await this.funcionarioService.remove(+id);
    return res.redirect('/funcionarios');
  }
}
