import { Body, Controller, Get, Post, Redirect, Render, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { CategoriaServicoService } from './categoria-servico.service';
import { ValidationView } from 'nest-validation-view';
import { CreateCategoriaServicoDto } from './dtos/create-categoria-servico.dto';
import { UpdateCategoriaServicoDto } from './dtos/update-categoria-servico.dto';

@Controller('categorias')
export class CategoriaServicoController {
  constructor(private categoriaServicoService: CategoriaServicoService) {}

  @Get()
  @Render('categoria-servico/inicial')
  async inicial() {
    const categorias = await this.categoriaServicoService.findAll();
    return { title: 'Categorias', controller: 'Categorias', categorias };
  }

  @Get('criar')
  @Render('categoria-servico/formulario')
  criar() {
    return { title: 'Nova Categoria', controller: 'Categorias', titulo: 'Nova Categoria' };
  }

  @Post('criar')
  @Redirect('/categorias')
  @ValidationView('categoria-servico/formulario', ({ request, errors }) => ({
    title: 'Nova Categoria', controller: 'Categorias', titulo: 'Nova Categoria',
    categoria: { ...request.body }, errors,
  }))
  async criarSalvar(@Body() dados: CreateCategoriaServicoDto) {
    await this.categoriaServicoService.create(dados);
  }

  @Get(':id/editar')
  @Render('categoria-servico/formulario')
  async editar(@Param('id') id: number) {
    const categoria = await this.categoriaServicoService.findOne(id);
    return { title: 'Editar Categoria', controller: 'Categorias', titulo: 'Editar Categoria', categoria };
  }

  @Post(':id/editar')
  @Redirect('/categorias')
  @ValidationView('categoria-servico/formulario', ({ request, errors }) => ({
    title: 'Editar Categoria', controller: 'Categorias', titulo: 'Editar Categoria',
    categoria: { id: request.params.id, ...request.body }, errors,
  }))
  async editarSalvar(@Param('id') id: number, @Body() dados: UpdateCategoriaServicoDto) {
    await this.categoriaServicoService.update(id, dados);
  }

  @Get(':id/excluir')
  @Render('categoria-servico/remover')
  async excluir(@Param('id') id: number) {
    const categoria = await this.categoriaServicoService.findOne(id);
    return { title: 'Excluir Categoria', controller: 'Categorias', categoria };
  }

  @Post(':id/excluir')
  async excluirSalvar(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.categoriaServicoService.remove(id);
      res.redirect('/categorias');
    } catch (error) {
      const categoria = await this.categoriaServicoService.findOne(id);
      res.status(400).render('categoria-servico/remover', { title: 'Excluir Categoria', controller: 'Categorias', categoria, erro: error.message });
    }
  }
}
