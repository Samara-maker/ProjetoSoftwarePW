const { Router } = require('express');
const service = require('../services/AgendamentoService');
const AppDataSource = require('../database');

const router = Router();

async function getFormData() {
  const db = AppDataSource;
  return {
    clientes: await db.getRepository('Cliente').find(),
    funcionarios: await db.getRepository('Funcionario').find(),
    equipes: await db.getRepository('Equipe').find(),
    servicos: await db.getRepository('Servico').find({ relations: ['categoria'] }),
  };
}

router.get('/', async (req, res) => {
  const agendamentos = await service.findAll();
  res.render('agendamentos/index', { title: 'Agendamentos', agendamentos, sucesso: req.flash('sucesso'), erro: req.flash('erro'), controller: 'Agendamentos' });
});

router.get('/criar', async (req, res) => {
  const form = await getFormData();
  res.render('agendamentos/criar', { title: 'Novo Agendamento', ...form, errors: {}, data: {}, servicosSelecionados: [], controller: 'Agendamentos' });
});

router.post('/criar', async (req, res) => {
  const { clienteId, status, data, horarioInicio, horarioFim, observacao, funcionarioId, equipeId } = req.body;
  let servicosIds = req.body.servicosIds || [];
  if (!Array.isArray(servicosIds)) servicosIds = [servicosIds];

  const errors = {};
  if (!clienteId) errors.clienteId = 'O cliente é obrigatório';
  if (!data) errors.data = 'A data é obrigatória';
  if (!horarioInicio) errors.horarioInicio = 'O horário de início é obrigatório';
  if (!horarioFim) errors.horarioFim = 'O horário de fim é obrigatório';
  if (!status) errors.status = 'O status é obrigatório';
  if (!servicosIds.length) errors.servicos = 'Informe ao menos um serviço';

  if (Object.keys(errors).length) {
    const form = await getFormData();
    return res.render('agendamentos/criar', { title: 'Novo Agendamento', ...form, errors, data: req.body, servicosSelecionados: servicosIds, controller: 'Agendamentos' });
  }
  try {
    await service.create({ clienteId, status, data, horarioInicio, horarioFim, observacao, funcionarioId, equipeId, servicosIds });
    req.flash('sucesso', 'Agendamento criado com sucesso!');
    res.redirect('/agendamentos');
  } catch (e) {
    const form = await getFormData();
    res.render('agendamentos/criar', { title: 'Novo Agendamento', ...form, errors: { geral: e.message }, data: req.body, servicosSelecionados: servicosIds, controller: 'Agendamentos' });
  }
});

router.get('/editar/:id', async (req, res) => {
  try {
    const agendamento = await service.findById(Number(req.params.id));
    const form = await getFormData();
    const servicosSelecionados = (agendamento.agendamentoServicos || []).map(s => String(s.servicoId));
    res.render('agendamentos/editar', { title: 'Editar Agendamento', agendamento, ...form, errors: {}, servicosSelecionados, controller: 'Agendamentos' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/editar/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { clienteId, status, data, horarioInicio, horarioFim, observacao, funcionarioId, equipeId } = req.body;
  let servicosIds = req.body.servicosIds || [];
  if (!Array.isArray(servicosIds)) servicosIds = [servicosIds];

  const errors = {};
  if (!clienteId) errors.clienteId = 'O cliente é obrigatório';
  if (!data) errors.data = 'A data é obrigatória';
  if (!horarioInicio) errors.horarioInicio = 'Informe o horário de início';
  if (!horarioFim) errors.horarioFim = 'Informe o horário de fim';
  if (!status) errors.status = 'O status é obrigatório';

  if (Object.keys(errors).length) {
    const form = await getFormData();
    const agendamento = { id, ...req.body };
    return res.render('agendamentos/editar', { title: 'Editar Agendamento', agendamento, ...form, errors, servicosSelecionados: servicosIds, controller: 'Agendamentos' });
  }
  try {
    await service.update(id, { clienteId, status, data, horarioInicio, horarioFim, observacao, funcionarioId, equipeId, servicosIds });
    req.flash('sucesso', 'Agendamento atualizado com sucesso!');
    res.redirect('/agendamentos');
  } catch (e) {
    const form = await getFormData();
    const agendamento = { id, ...req.body };
    res.render('agendamentos/editar', { title: 'Editar Agendamento', agendamento, ...form, errors: { geral: e.message }, servicosSelecionados: servicosIds, controller: 'Agendamentos' });
  }
});

router.get('/excluir/:id', async (req, res) => {
  try {
    const agendamento = await service.findById(Number(req.params.id));
    res.render('agendamentos/excluir', { title: 'Excluir Agendamento', agendamento, controller: 'Agendamentos' });
  } catch { res.status(404).send('Não encontrado'); }
});

router.post('/excluir/:id', async (req, res) => {
  try {
    await service.remove(Number(req.params.id));
    req.flash('sucesso', 'Agendamento excluído com sucesso!');
  } catch (e) { req.flash('erro', e.message); }
  res.redirect('/agendamentos');
});

module.exports = router;
