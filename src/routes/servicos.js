const { Router } = require('express');
const service = require('../services/ServicoService');
const AppDataSource = require('../database');

const router = Router();

async function getCategorias() {
  return AppDataSource.getRepository('CategoriaServico').find();
}

router.get('/', async (req, res) => {
  const servicos = await service.findAll();
  res.render('servicos/index', { title: 'Serviços', servicos, sucesso: req.flash('sucesso'), erro: req.flash('erro'), controller: 'Servicos' });
});

router.get('/criar', async (req, res) => {
  const categorias = await getCategorias();
  res.render('servicos/criar', { title: 'Novo Serviço', categorias, errors: {}, data: {}, controller: 'Servicos' });
});

router.post('/criar', async (req, res) => {
  const { descricao, valor, categoriaId } = req.body;
  const errors = {};
  if (!descricao) errors.descricao = 'A descrição é obrigatória';
  if (!valor) errors.valor = 'O valor é obrigatório';
  if (!categoriaId) errors.categoriaId = 'A categoria é obrigatória';
  if (Object.keys(errors).length) {
    const categorias = await getCategorias();
    return res.render('servicos/criar', { title: 'Novo Serviço', categorias, errors, data: req.body, controller: 'Servicos' });
  }
  try {
    await service.create({ descricao, valor, categoriaId });
    req.flash('sucesso', 'Serviço cadastrado com sucesso!');
    res.redirect('/servicos');
  } catch (e) {
    const categorias = await getCategorias();
    res.render('servicos/criar', { title: 'Novo Serviço', categorias, errors: { geral: e.message }, data: req.body, controller: 'Servicos' });
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const servico = await service.findById(Number(req.params.id));
    const categorias = await getCategorias();
    res.render('servicos/editar', { title: 'Editar Serviço', servico, categorias, errors: {}, controller: 'Servicos' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/editar/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { descricao, valor, categoriaId } = req.body;
  const errors = {};
  if (!descricao) errors.descricao = 'A descrição é obrigatória';
  if (!valor) errors.valor = 'O valor é obrigatório';
  if (!categoriaId) errors.categoriaId = 'A categoria é obrigatória';
  if (Object.keys(errors).length) {
    const categorias = await getCategorias();
    const servico = { id, ...req.body };
    return res.render('servicos/editar', { title: 'Editar Serviço', servico, categorias, errors, controller: 'Servicos' });
  }
  try {
    await service.update(id, { descricao, valor, categoriaId });
    req.flash('sucesso', 'Serviço atualizado com sucesso!');
    res.redirect('/servicos');
  } catch (e) {
    const categorias = await getCategorias();
    const servico = { id, ...req.body };
    res.render('servicos/editar', { title: 'Editar Serviço', servico, categorias, errors: { geral: e.message }, controller: 'Servicos' });
  }
});

router.get('/excluir/:id', async (req, res) => {
  try {
    const servico = await service.findById(Number(req.params.id));
    res.render('servicos/excluir', { title: 'Excluir Serviço', servico, controller: 'Servicos' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    await service.remove(Number(req.params.id));
    req.flash('sucesso', 'Serviço excluído com sucesso!');
  } catch (e) { req.flash('erro', e.message); }
  res.redirect('/servicos');
});

module.exports = router;
