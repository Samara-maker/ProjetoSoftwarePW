const { Router } = require('express');
const service = require('../services/FuncionarioService');

const router = Router();

router.get('/', async (req, res) => {
  const funcionarios = await service.findAll();
  res.render('funcionarios/index', { title: 'Funcionários', funcionarios, sucesso: req.flash('sucesso'), erro: req.flash('erro'), controller: 'Funcionarios' });
});

router.get('/criar', (req, res) => {
  res.render('funcionarios/criar', { title: 'Novo Funcionário', errors: {}, data: {}, controller: 'Funcionarios' });
});

router.post('/criar', async (req, res) => {
  const { nome, cargo } = req.body;
  const errors = {};
  if (!nome) errors.nome = 'O nome é obrigatório';
  if (!cargo) errors.cargo = 'O cargo é obrigatório';
  if (Object.keys(errors).length) {
    return res.render('funcionarios/criar', { title: 'Novo Funcionário', errors, data: req.body, controller: 'Funcionarios' });
  }
  try {
    await service.create({ nome, cargo });
    req.flash('sucesso', 'Funcionário cadastrado com sucesso!');
    res.redirect('/funcionarios');
  } catch (e) {
    res.render('funcionarios/criar', { title: 'Novo Funcionário', errors: { geral: e.message }, data: req.body, controller: 'Funcionarios' });
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const funcionario = await service.findById(Number(req.params.id));
    res.render('funcionarios/editar', { title: 'Editar Funcionário', funcionario, errors: {}, controller: 'Funcionarios' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/editar/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nome, cargo } = req.body;
  const errors = {};
  if (!nome) errors.nome = 'O nome é obrigatório';
  if (!cargo) errors.cargo = 'O cargo é obrigatório';
  if (Object.keys(errors).length) {
    const funcionario = { id, ...req.body };
    return res.render('funcionarios/editar', { title: 'Editar Funcionário', funcionario, errors, controller: 'Funcionarios' });
  }
  try {
    await service.update(id, { nome, cargo });
    req.flash('sucesso', 'Funcionário atualizado com sucesso!');
    res.redirect('/funcionarios');
  } catch (e) {
    const funcionario = { id, ...req.body };
    res.render('funcionarios/editar', { title: 'Editar Funcionário', funcionario, errors: { geral: e.message }, controller: 'Funcionarios' });
  }
});

router.get('/excluir/:id', async (req, res) => {
  try {
    const funcionario = await service.findById(Number(req.params.id));
    res.render('funcionarios/excluir', { title: 'Excluir Funcionário', funcionario, controller: 'Funcionarios' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    await service.remove(Number(req.params.id));
    req.flash('sucesso', 'Funcionário excluído com sucesso!');
  } catch (e) {
    req.flash('erro', e.message);
  }
  res.redirect('/funcionarios');
});

module.exports = router;
