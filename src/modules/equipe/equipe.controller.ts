import { Controller, Get, Post, Render, Param, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { EquipeService } from './equipe.service';

@Controller('equipes')
export class EquipeController {
  constructor(private readonly equipeService: EquipeService) {}

  @Get()
  @Render('equipe/lista')
  async index() {
    const equipes = await this.equipeService.findAll();
    return { equipes, titulo: 'Equipes' };
  }

  @Get('nova')
  @Render('equipe/formulario')
  nova() {
    return { equipe: null, titulo: 'Nova Equipe' };
  }

  @Post('nova')
  async criar(@Body() body, @Res() res: Response) {
    await this.equipeService.create(body);
    return res.redirect('/equipes');
  }

  @Get(':id/editar')
  @Render('equipe/formulario')
  async editar(@Param('id') id: string) {
    const equipe = await this.equipeService.findOne(+id);
    return { equipe, titulo: 'Editar Equipe' };
  }

  @Post(':id/editar')
  async atualizar(@Param('id') id: string, @Body() body, @Res() res: Response) {
    await this.equipeService.update(+id, body);
    return res.redirect('/equipes');
  }

  @Post(':id/excluir')
  async excluir(@Param('id') id: string, @Res() res: Response) {
    await this.equipeService.remove(+id);
    return res.redirect('/equipes');
  }
}
