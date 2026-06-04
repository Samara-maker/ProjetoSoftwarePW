const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Servico',
  tableName: 'servico',
  columns: {
    id:          { primary: true, type: 'int', generated: true, name: 'id' },
    descricao:   { type: 'varchar', name: 'descricao' },
    valor:       { type: 'decimal', precision: 10, scale: 2, name: 'valor' },
    categoriaId: { type: 'int', name: 'categoria_id' },
  },
  relations: {
    categoria: {
      type: 'many-to-one',
      target: 'CategoriaServico',
      joinColumn: { name: 'categoria_id' },
      inverseSide: 'servicos',
    },
    agendamentoServicos: {
      type: 'one-to-many',
      target: 'AgendamentoServico',
      inverseSide: 'servico',
    },
  },
});
