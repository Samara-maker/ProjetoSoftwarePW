const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'AgendamentoServico',
  tableName: 'agendamento_servico',
  columns: {
    agendamentoId: { primary: true, type: 'int', name: 'agendamento_id' },
    servicoId: { primary: true, type: 'int', name: 'servico_id' },
  },
  relations: {
    agendamento: {
      type: 'many-to-one',
      target: 'Agendamento',
      joinColumn: { name: 'agendamento_id' },
      inverseSide: 'agendamentoServicos',
    },
    servico: {
      type: 'many-to-one',
      target: 'Servico',
      joinColumn: { name: 'servico_id' },
      inverseSide: 'agendamentoServicos',
    },
  },
});
