import { Controller, Get, Post, Render, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { ServicoService } from './servico.service';
import { CategoriaServicoService } from '../categoria-servico/categoria-servico.service';

@Controller('servicos')
export class ServicoController {
  constructor(
    private readonly servicoService: ServicoService,
    private readonly categoriaService: CategoriaServicoService,
  ) {}

  @Get()
  @Render('servico/lista')
  async index() {
    const servicos = await this.servicoService.findAll();
    return { servicos, titulo: 'Serviços' };
  }

  @Get('novo')
  @Render('servico/formulario')
  async novo() {
    const categorias = await this.categoriaService.findAll();
    return { servico: null, categorias, titulo: 'Novo Serviço' };
  }

  @Post('novo')
  async criar(@Body() body, @Res() res: Response) {
    await this.servicoService.create(body);
    return res.redirect('/servicos');
  }

  @Get(':id/editar')
  @Render('servico/formulario')
  async editar(@Param('id') id: string) {
    const servico = await this.servicoService.findOne(+id);
    const categorias = await this.categoriaService.findAll();
    return { servico, categorias, titulo: 'Editar Serviço' };
  }

  @Post(':id/editar')
  async atualizar(@Param('id') id: string, @Body() body, @Res() res: Response) {
    await this.servicoService.update(+id, body);
    return res.redirect('/servicos');
  }

  @Post(':id/excluir')
  async excluir(@Param('id') id: string, @Res() res: Response) {
    await this.servicoService.remove(+id);
    return res.redirect('/servicos');
  }
}
