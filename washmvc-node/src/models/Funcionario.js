const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Funcionario',
  tableName: 'funcionario',
  columns: {
    id:    { primary: true, type: 'int', generated: true, name: 'id' },
    nome:  { type: 'varchar', name: 'nome' },
    cargo: { type: 'varchar', name: 'cargo' },
  },
  relations: {
    funcionarioEquipes: {
      type: 'one-to-many',
      target: 'FuncionarioEquipe',
      inverseSide: 'funcionario',
    },
  },
});
