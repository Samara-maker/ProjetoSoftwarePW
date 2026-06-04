const AppDataSource = require('../database');

class AgendamentoService {
  get repo() { return AppDataSource.getRepository('Agendamento'); }

  findAll() {
    return this.repo.find({
      relations: ['cliente', 'funcionario', 'equipe', 'agendamentoServicos', 'agendamentoServicos.servico'],
      order: { data: 'DESC' },
    });
  }

  async findById(id) {
    const a = await this.repo.findOne({
      where: { id },
      relations: ['cliente', 'funcionario', 'equipe', 'agendamentoServicos', 'agendamentoServicos.servico'],
    });
    if (!a) throw new Error(`Agendamento #${id} não encontrado`);
    return a;
  }

  async create(data) {
    const db = AppDataSource;
    const clienteExiste = await db.getRepository('Cliente').findOneBy({ id: Number(data.clienteId) });
    if (!clienteExiste) throw new Error(`Cliente #${data.clienteId} não encontrado`);

    if (data.funcionarioId) {
      const fExiste = await db.getRepository('Funcionario').findOneBy({ id: Number(data.funcionarioId) });
      if (!fExiste) throw new Error(`Funcionário #${data.funcionarioId} não encontrado`);
    }
    if (data.equipeId) {
      const eExiste = await db.getRepository('Equipe').findOneBy({ id: Number(data.equipeId) });
      if (!eExiste) throw new Error(`Equipe #${data.equipeId} não encontrada`);
    }

    const agendamento = this.repo.create({
      clienteId: Number(data.clienteId),
      data: data.data,
      horarioInicio: data.horarioInicio,
      horarioFim: data.horarioFim,
      observacao: data.observacao || null,
      status: data.status,
      funcionarioId: data.funcionarioId ? Number(data.funcionarioId) : null,
      equipeId: data.equipeId ? Number(data.equipeId) : null,
    });
    await this.repo.save(agendamento);

    const ids = Array.isArray(data.servicosIds) ? data.servicosIds : (data.servicosIds ? [data.servicosIds] : []);
    const asRepo = db.getRepository('AgendamentoServico');
    for (const sid of ids) {
      const sExiste = await db.getRepository('Servico').findOneBy({ id: Number(sid) });
      if (!sExiste) throw new Error(`Serviço #${sid} não encontrado`);
      await asRepo.save(asRepo.create({ agendamentoId: agendamento.id, servicoId: Number(sid) }));
    }
    return agendamento;
  }

  async update(id, data) {
    const a = await this.findById(id);
    const db = AppDataSource;

    const clienteExiste = await db.getRepository('Cliente').findOneBy({ id: Number(data.clienteId) });
    if (!clienteExiste) throw new Error(`Cliente #${data.clienteId} não encontrado`);

    Object.assign(a, {
      clienteId: Number(data.clienteId),
      data: data.data,
      horarioInicio: data.horarioInicio,
      horarioFim: data.horarioFim,
      observacao: data.observacao || null,
      status: data.status,
      funcionarioId: data.funcionarioId ? Number(data.funcionarioId) : null,
      equipeId: data.equipeId ? Number(data.equipeId) : null,
    });

    const asRepo = db.getRepository('AgendamentoServico');
    await asRepo.delete({ agendamentoId: id });

    const ids = Array.isArray(data.servicosIds) ? data.servicosIds : (data.servicosIds ? [data.servicosIds] : []);
    for (const sid of ids) {
      const sExiste = await db.getRepository('Servico').findOneBy({ id: Number(sid) });
      if (!sExiste) throw new Error(`Serviço #${sid} não encontrado`);
      await asRepo.save(asRepo.create({ agendamentoId: id, servicoId: Number(sid) }));
    }
    return this.repo.save(a);
  }

  async remove(id) {
    const a = await this.findById(id);
    await AppDataSource.getRepository('AgendamentoServico').delete({ agendamentoId: id });
    return this.repo.remove(a);
  }
}

module.exports = new AgendamentoService();
