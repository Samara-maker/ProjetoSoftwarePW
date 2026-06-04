const AppDataSource = require('../database');

class ServicoService {
  get repo() { return AppDataSource.getRepository('Servico'); }

  findAll() {
    return this.repo.find({ relations: ['categoria'] });
  }

  async findById(id) {
    const s = await this.repo.findOne({ where: { id }, relations: ['categoria'] });
    if (!s) throw new Error(`Serviço #${id} não encontrado`);
    return s;
  }

  async create(data) {
    const catRepo = AppDataSource.getRepository('CategoriaServico');
    const cat = await catRepo.findOneBy({ id: Number(data.categoriaId) });
    if (!cat) throw new Error(`Categoria #${data.categoriaId} não encontrada`);
    return this.repo.save(this.repo.create({ ...data, categoriaId: Number(data.categoriaId), valor: parseFloat(data.valor) }));
  }

  async update(id, data) {
    const s = await this.findById(id);
    const catRepo = AppDataSource.getRepository('CategoriaServico');
    const cat = await catRepo.findOneBy({ id: Number(data.categoriaId) });
    if (!cat) throw new Error(`Categoria #${data.categoriaId} não encontrada`);
    Object.assign(s, { ...data, categoriaId: Number(data.categoriaId), valor: parseFloat(data.valor) });
    return this.repo.save(s);
  }

  async remove(id) {
    const s = await this.findById(id);
    const asRepo = AppDataSource.getRepository('AgendamentoServico');
    const possui = await asRepo.findOneBy({ servicoId: id });
    if (possui) throw new Error('Serviço não pode ser excluído pois está vinculado a agendamentos.');
    return this.repo.remove(s);
  }
}

module.exports = new ServicoService();
