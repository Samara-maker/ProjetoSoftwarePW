const { Router } = require('express');
const service = require('../services/CategoriaServicoService');

const router = Router();

router.get('/', async (req, res) => {
  const categorias = await service.findAll();
  res.render('categorias/index', { title: 'Categorias', categorias, sucesso: req.flash('sucesso'), erro: req.flash('erro'), controller: 'Categorias' });
});

router.get('/criar', (req, res) => {
  res.render('categorias/criar', { title: 'Nova Categoria', errors: {}, data: {}, controller: 'Categorias' });
});

router.post('/criar', async (req, res) => {
  const { nome } = req.body;
  if (!nome) return res.render('categorias/criar', { title: 'Nova Categoria', errors: { nome: 'O nome é obrigatório' }, data: req.body, controller: 'Categorias' });
  try {
    await service.create({ nome });
    req.flash('sucesso', 'Categoria cadastrada com sucesso!');
    res.redirect('/categorias');
  } catch (e) {
    res.render('categorias/criar', { title: 'Nova Categoria', errors: { geral: e.message }, data: req.body, controller: 'Categorias' });
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const categoria = await service.findById(Number(req.params.id));
    res.render('categorias/editar', { title: 'Editar Categoria', categoria, errors: {}, controller: 'Categorias' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/editar/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nome } = req.body;
  if (!nome) {
    const categoria = { id, ...req.body };
    return res.render('categorias/editar', { title: 'Editar Categoria', categoria, errors: { nome: 'O nome é obrigatório' }, controller: 'Categorias' });
  }
  try {
    await service.update(id, { nome });
    req.flash('sucesso', 'Categoria atualizada com sucesso!');
    res.redirect('/categorias');
  } catch (e) {
    const categoria = { id, ...req.body };
    res.render('categorias/editar', { title: 'Editar Categoria', categoria, errors: { geral: e.message }, controller: 'Categorias' });
  }
});

router.get('/excluir/:id', async (req, res) => {
  try {
    const categoria = await service.findById(Number(req.params.id));
    res.render('categorias/excluir', { title: 'Excluir Categoria', categoria, controller: 'Categorias' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    await service.remove(Number(req.params.id));
    req.flash('sucesso', 'Categoria excluída com sucesso!');
  } catch (e) { req.flash('erro', e.message); }
  res.redirect('/categorias');
});

module.exports = router;
