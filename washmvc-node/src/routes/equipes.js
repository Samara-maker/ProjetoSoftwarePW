const { Router } = require('express');
const service = require('../services/EquipeService');

const router = Router();

router.get('/', async (req, res) => {
  const equipes = await service.findAll();
  res.render('equipes/index', { title: 'Equipes', equipes, sucesso: req.flash('sucesso'), erro: req.flash('erro'), controller: 'Equipes' });
});

router.get('/criar', (req, res) => {
  res.render('equipes/criar', { title: 'Nova Equipe', errors: {}, data: {}, controller: 'Equipes' });
});

router.post('/criar', async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.render('equipes/criar', { title: 'Nova Equipe', errors: { nome: 'O nome é obrigatório' }, data: req.body, controller: 'Equipes' });
  try {
    await service.create({ nome });
    req.flash('sucesso', 'Equipe cadastrada com sucesso!');
    res.redirect('/equipes');
  } catch (e) {
    res.render('equipes/criar', { title: 'Nova Equipe', errors: { geral: e.message }, data: req.body, controller: 'Equipes' });
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const equipe = await service.findById(Number(req.params.id));
    res.render('equipes/editar', { title: 'Editar Equipe', equipe, errors: {}, controller: 'Equipes' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/editar/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nome } = req.body;
  if (!nome) {
    const equipe = { id, ...req.body };
    return res.render('equipes/editar', { title: 'Editar Equipe', equipe, errors: { nome: 'O nome é obrigatório' }, controller: 'Equipes' });
  }
  try {
    await service.update(id, { nome });
    req.flash('sucesso', 'Equipe atualizada com sucesso!');
    res.redirect('/equipes');
  } catch (e) {
    const equipe = { id, ...req.body };
    res.render('equipes/editar', { title: 'Editar Equipe', equipe, errors: { geral: e.message }, controller: 'Equipes' });
  }
});

router.get('/excluir/:id', async (req, res) => {
  try {
    const equipe = await service.findById(Number(req.params.id));
    res.render('equipes/excluir', { title: 'Excluir Equipe', equipe, controller: 'Equipes' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    await service.remove(Number(req.params.id));
    req.flash('sucesso', 'Equipe excluída com sucesso!');
  } catch (e) { req.flash('erro', e.message); }
  res.redirect('/equipes');
});

module.exports = router;
