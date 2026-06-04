const AppDataSource = require('../database');

class FuncionarioService {
  get repo() { return AppDataSource.getRepository('Funcionario'); }

  findAll() { return this.repo.find(); }

  async findById(id) {
    const f = await this.repo.findOneBy({ id });
    if (!f) throw new Error(`Funcionário #${id} não encontrado`);
    return f;
  }

  async create(data) {
    return this.repo.save(this.repo.create(data));
  }

  async update(id, data) {
    const f = await this.findById(id);
    Object.assign(f, data);
    return this.repo.save(f);
  }

  async remove(id) {
    const f = await this.findById(id);
    const agRepo = AppDataSource.getRepository('Agendamento');
    const feRepo = AppDataSource.getRepository('FuncionarioEquipe');
    const possuiAg = await agRepo.findOneBy({ funcionarioId: id });
    const possuiFe = await feRepo.findOneBy({ funcionarioId: id });
    if (possuiAg || possuiFe) throw new Error('Funcionário não pode ser excluído pois possui agendamentos ou equipes vinculadas.');
    return this.repo.remove(f);
  }
}

module.exports = new FuncionarioService();
