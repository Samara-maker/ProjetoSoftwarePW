const AppDataSource = require('../database');

class EquipeService {
  get repo() { return AppDataSource.getRepository('Equipe'); }

  findAll() { return this.repo.find(); }

  async findById(id) {
    const e = await this.repo.findOneBy({ id });
    if (!e) throw new Error(`Equipe #${id} não encontrada`);
    return e;
  }

  async create(data) {
    const existe = await this.repo.findOneBy({ nome: data.nome });
    if (existe) throw new Error(`Já existe uma equipe com o nome '${data.nome}'`);
    return this.repo.save(this.repo.create(data));
  }

  async update(id, data) {
    const e = await this.findById(id);
    const existe = await this.repo.findOneBy({ nome: data.nome });
    if (existe && existe.id !== id) throw new Error(`Já existe outra equipe com o nome '${data.nome}'`);
    Object.assign(e, data);
    return this.repo.save(e);
  }

  async remove(id) {
    const e = await this.findById(id);
    const agRepo = AppDataSource.getRepository('Agendamento');
    const feRepo = AppDataSource.getRepository('FuncionarioEquipe');
    const possuiAg = await agRepo.findOneBy({ equipeId: id });
    const possuiFe = await feRepo.findOneBy({ equipeId: id });
    if (possuiAg || possuiFe) throw new Error('Equipe não pode ser excluída pois possui agendamentos ou funcionários vinculados.');
    return this.repo.remove(e);
  }
}

module.exports = new EquipeService();
