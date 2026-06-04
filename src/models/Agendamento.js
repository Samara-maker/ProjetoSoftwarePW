const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Agendamento',
  tableName: 'agendamento',
  columns: {
    id:            { primary: true, type: 'int', generated: true, name: 'id' },
    clienteId:     { type: 'int', name: 'cliente_id' },
    data:          { type: 'date', name: 'data' },
    horarioInicio: { type: 'time', name: 'horario_inicio' },
    horarioFim:    { type: 'time', name: 'horario_fim' },
    observacao:    { type: 'varchar', nullable: true, name: 'observacao' },
    status:        { type: 'varchar', name: 'status' },
    funcionarioId: { type: 'int', nullable: true, name: 'funcionario_id' },
    equipeId:      { type: 'int', nullable: true, name: 'equipe_id' },
  },
  relations: {
    cliente: {
      type: 'many-to-one',
      target: 'Cliente',
      joinColumn: { name: 'cliente_id' },
      inverseSide: 'agendamentos',
    },
    funcionario: {
      type: 'many-to-one',
      target: 'Funcionario',
      joinColumn: { name: 'funcionario_id' },
      nullable: true,
    },
    equipe: {
      type: 'many-to-one',
      target: 'Equipe',
      joinColumn: { name: 'equipe_id' },
      nullable: true,
    },
    agendamentoServicos: {
      type: 'one-to-many',
      target: 'AgendamentoServico',
      inverseSide: 'agendamento',
    },
  },
});
