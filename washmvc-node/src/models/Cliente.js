const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Cliente',
  tableName: 'cliente',
  columns: {
    id:       { primary: true, type: 'int', generated: true, name: 'id' },
    nome:     { type: 'varchar', name: 'nome' },
    email:    { type: 'varchar', name: 'email' },
    telefone: { type: 'varchar', name: 'telefone' },
  },
  relations: {
    agendamentos: {
      type: 'one-to-many',
      target: 'Agendamento',
      inverseSide: 'cliente',
    },
  },
});
