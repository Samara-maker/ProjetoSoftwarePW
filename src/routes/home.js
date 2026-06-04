const { Router } = require('express');
const AppDataSource = require('../database');

const router = Router();

router.get('/', async (req, res) => {
  try {
    const db = AppDataSource;
    const totalClientes     = await db.getRepository('Cliente').count();
    const totalFuncionarios = await db.getRepository('Funcionario').count();
    const totalAgendamentos = await db.getRepository('Agendamento').count();
    const totalServicos     = await db.getRepository('Servico').count();
    const agendamentosRecentes = await db.getRepository('Agendamento').find({
      relations: ['cliente'],
      order: { data: 'DESC' },
      take: 5,
    });
    res.render('home/index', {
      title: 'Dashboard',
      totalClientes, totalFuncionarios, totalAgendamentos, totalServicos,
      agendamentosRecentes,
      sucesso: req.flash('sucesso'),
      erro: req.flash('erro'),
      controller: 'Home',
    });
  } catch (e) {
    res.render('home/index', { title: 'Dashboard', totalClientes: 0, totalFuncionarios: 0, totalAgendamentos: 0, totalServicos: 0, agendamentosRecentes: [], sucesso: [], erro: [e.message], controller: 'Home' });
  }
});

module.exports = router;
