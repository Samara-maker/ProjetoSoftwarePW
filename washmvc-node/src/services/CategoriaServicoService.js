const AppDataSource = require('../database');

class CategoriaServicoService {
  get repo() { return AppDataSource.getRepository('CategoriaServico'); }

  findAll() { return this.repo.find(); }

  async findById(id) {
    const c = await this.repo.findOneBy({ id });
    if (!c) throw new Error(`Categoria #${id} não encontrada`);
    return c;
  }

  async create(data) {
    const existe = await this.repo.findOneBy({ nome: data.nome });
    if (existe) throw new Error(`Já existe uma categoria com o nome '${data.nome}'`);
    return this.repo.save(this.repo.create(data));
  }

  async update(id, data) {
    const c = await this.findById(id);
    const existe = await this.repo.findOneBy({ nome: data.nome });
    if (existe && existe.id !== id) throw new Error(`Já existe outra categoria com o nome '${data.nome}'`);
    Object.assign(c, data);
    return this.repo.save(c);
  }

  async remove(id) {
    const c = await this.findById(id);
    const sRepo = AppDataSource.getRepository('Servico');
    const possui = await sRepo.findOneBy({ categoriaId: id });
    if (possui) throw new Error('Categoria não pode ser excluída pois possui serviços vinculados.');
    return this.repo.remove(c);
  }
}

module.exports = new CategoriaServicoService();
