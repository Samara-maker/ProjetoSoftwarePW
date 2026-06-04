const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'CategoriaServico',
  tableName: 'categoria_servico',
  columns: {
    id: { primary: true, type: 'int', generated: true, name: 'id' },
    nome: { type: 'varchar', name: 'nome' },
  },
  relations: {
    servicos: {
      type: 'one-to-many',
      target: 'Servico',
      inverseSide: 'categoria',
    },
  },
});
