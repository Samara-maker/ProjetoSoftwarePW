const { Router } = require('express');
const service = require('../services/ClienteService');

const router = Router();

router.get('/', async (req, res) => {
  const clientes = await service.findAll();
  res.render('clientes/index', { title: 'Clientes', clientes, sucesso: req.flash('sucesso'), erro: req.flash('erro'), controller: 'Clientes' });
});

router.get('/criar', (req, res) => {
  res.render('clientes/criar', { title: 'Novo Cliente', errors: {}, data: {}, controller: 'Clientes' });
});

router.post('/criar', async (req, res) => {
  const { nome, email, telefone } = req.body;
  const errors = {};
  if (!nome)     errors.nome     = 'O nome é obrigatório';
  if (!email)    errors.email    = 'O e-mail é obrigatório';
  if (!telefone) errors.telefone = 'O telefone é obrigatório';
  if (Object.keys(errors).length) {
    return res.render('clientes/criar', { title: 'Novo Cliente', errors, data: req.body, controller: 'Clientes' });
  }
  try {
    await service.create({ nome, email, telefone });
    req.flash('sucesso', 'Cliente cadastrado com sucesso!');
    res.redirect('/clientes');
  } catch (e) {
    res.render('clientes/criar', { title: 'Novo Cliente', errors: { geral: e.message }, data: req.body, controller: 'Clientes' });
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const cliente = await service.findById(Number(req.params.id));
    res.render('clientes/editar', { title: 'Editar Cliente', cliente, errors: {}, controller: 'Clientes' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/editar/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nome, email, telefone } = req.body;
  const errors = {};
  if (!nome)     errors.nome     = 'O nome é obrigatório';
  if (!email)    errors.email    = 'O e-mail é obrigatório';
  if (!telefone) errors.telefone = 'O telefone é obrigatório';
  if (Object.keys(errors).length) {
    const cliente = { id, ...req.body };
    return res.render('clientes/editar', { title: 'Editar Cliente', cliente, errors, controller: 'Clientes' });
  }
  try {
    await service.update(id, { nome, email, telefone });
    req.flash('sucesso', 'Cliente atualizado com sucesso!');
    res.redirect('/clientes');
  } catch (e) {
    const cliente = { id, ...req.body };
    res.render('clientes/editar', { title: 'Editar Cliente', cliente, errors: { geral: e.message }, controller: 'Clientes' });
  }
});

router.get('/excluir/:id', async (req, res) => {
  try {
    const cliente = await service.findById(Number(req.params.id));
    res.render('clientes/excluir', { title: 'Excluir Cliente', cliente, controller: 'Clientes' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    await service.remove(Number(req.params.id));
    req.flash('sucesso', 'Cliente excluído com sucesso!');
  } catch (e) {
    req.flash('erro', e.message);
  }
  res.redirect('/clientes');
});

module.exports = router;
