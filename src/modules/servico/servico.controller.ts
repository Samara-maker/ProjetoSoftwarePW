import { Body, Controller, Get, Post, Redirect, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ServicoService } from './servico.service';
import { CategoriaServicoService } from '../categoria-servico/categoria-servico.service';
import { ValidationView } from 'nest-validation-view';
import { CreateServicoDto } from './dtos/create-servico.dto';
import { UpdateServicoDto } from './dtos/update-servico.dto';

@Controller('servicos')
export class ServicoController {
  constructor(private servicoService: ServicoService, private categoriaServicoService: CategoriaServicoService) {}

  @Get()
  @Render('servico/inicial')
  async inicial() {
    const servicos = await this.servicoService.findAll();
    return { title: 'Serviços', controller: 'Servicos', servicos };
  }

  @Get('criar')
  @Render('servico/formulario')
  async criar() {
    const categorias = await this.categoriaServicoService.findAll();
    return { title: 'Novo Serviço', controller: 'Servicos', titulo: 'Novo Serviço', categorias };
  }

  @Post('criar')
  @Redirect('/servicos')
  @ValidationView('servico/formulario', ({ request, errors }) => ({
    title: 'Novo Serviço', controller: 'Servicos', titulo: 'Novo Serviço',
    servico: { ...request.body }, categorias: [], errors,
  }))
  async criarSalvar(@Body() dados: CreateServicoDto) {
    await this.servicoService.create(dados);
  }

  @Get(':id/editar')
  @Render('servico/formulario')
  async editar(@Param('id') id: number) {
    const servico = await this.servicoService.findOne(id);
    const categorias = await this.categoriaServicoService.findAll();
    return { title: 'Editar Serviço', controller: 'Servicos', titulo: 'Editar Serviço', servico, categorias };
  }

  @Post(':id/editar')
  @Redirect('/servicos')
  @ValidationView('servico/formulario', ({ request, errors }) => ({
    title: 'Editar Serviço', controller: 'Servicos', titulo: 'Editar Serviço',
    servico: { id: request.params.id, ...request.body }, categorias: [], errors,
  }))
  async editarSalvar(@Param('id') id: number, @Body() dados: UpdateServicoDto) {
    await this.servicoService.update(id, dados);
  }

  @Get(':id/excluir')
  @Render('servico/remover')
  async excluir(@Param('id') id: number) {
    const servico = await this.servicoService.findOne(id);
    return { title: 'Excluir Serviço', controller: 'Servicos', servico };
  }

  @Post(':id/excluir')
  async excluirSalvar(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.servicoService.remove(id);
      res.redirect('/servicos');
    } catch (error) {
      const servico = await this.servicoService.findOne(id);
      res.status(400).render('servico/remover', { title: 'Excluir Serviço', controller: 'Servicos', servico, erro: error.message });
    }
  }
}
