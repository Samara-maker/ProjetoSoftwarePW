import { Controller, Get, Post, Render, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoriaServicoService } from './categoria-servico.service';

@Controller('categorias')
export class CategoriaServicoController {
  constructor(private readonly categoriaService: CategoriaServicoService) {}

  @Get()
  @Render('categoria-servico/lista')
  async index() {
    const categorias = await this.categoriaService.findAll();
    return { categorias, titulo: 'Categorias de Serviço' };
  }

  @Get('nova')
  @Render('categoria-servico/formulario')
  nova() {
    return { categoria: null, titulo: 'Nova Categoria' };
  }

  @Post('nova')
  async criar(@Body() body, @Res() res: Response) {
    await this.categoriaService.create(body);
    return res.redirect('/categorias');
  }

  @Get(':id/editar')
  @Render('categoria-servico/formulario')
  async editar(@Param('id') id: string) {
    const categoria = await this.categoriaService.findOne(+id);
    return { categoria, titulo: 'Editar Categoria' };
  }

  @Post(':id/editar')
  async atualizar(@Param('id') id: string, @Body() body, @Res() res: Response) {
    await this.categoriaService.update(+id, body);
    return res.redirect('/categorias');
  }

  @Post(':id/excluir')
  async excluir(@Param('id') id: string, @Res() res: Response) {
    await this.categoriaService.remove(+id);
    return res.redirect('/categorias');
  }
}
