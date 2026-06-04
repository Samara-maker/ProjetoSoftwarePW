const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Equipe',
  tableName: 'equipe',
  columns: {
    id:   { primary: true, type: 'int', generated: true, name: 'id' },
    nome: { type: 'varchar', name: 'nome' },
  },
  relations: {
    funcionarioEquipes: {
      type: 'one-to-many',
      target: 'FuncionarioEquipe',
      inverseSide: 'equipe',
    },
  },
});
