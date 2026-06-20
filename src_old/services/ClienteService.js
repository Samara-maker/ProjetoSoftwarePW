const AppDataSource = require('../database');

class ClienteService {
  get repo() {
    return AppDataSource.getRepository('Cliente');
  }

  findAll() {
    return this.repo.find();
  }

  async findById(id) {
    const c = await this.repo.findOneBy({ id });
    if (!c) throw new Error(`Cliente #${id} não encontrado`);
    return c;
  }

  async create(data) {
    const c = this.repo.create(data);
    return this.repo.save(c);
  }

  async update(id, data) {
    const c = await this.findById(id);
    Object.assign(c, data);
    return this.repo.save(c);
  }

  async remove(id) {
    const c = await this.findById(id);
    const agRepo = AppDataSource.getRepository('Agendamento');
    const possui = await agRepo.findOneBy({ clienteId: id });
    if (possui) throw new Error('Cliente não pode ser excluído pois possui agendamentos vinculados.');
    return this.repo.remove(c);
  }
}

module.exports = new ClienteService();
