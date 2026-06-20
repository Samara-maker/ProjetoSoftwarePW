const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'FuncionarioEquipe',
  tableName: 'funcionario_equipe',
  columns: {
    funcionarioId: { primary: true, type: 'int', name: 'funcionario_id' },
    equipeId: { primary: true, type: 'int', name: 'equipe_id' },
  },
  relations: {
    funcionario: {
      type: 'many-to-one',
      target: 'Funcionario',
      joinColumn: { name: 'funcionario_id' },
      inverseSide: 'funcionarioEquipes',
    },
    equipe: {
      type: 'many-to-one',
      target: 'Equipe',
      joinColumn: { name: 'equipe_id' },
      inverseSide: 'funcionarioEquipes',
    },
  },
});
