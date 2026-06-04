const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pw2_app_web',
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  entities: [
    require('./models/Cliente'),
    require('./models/Funcionario'),
    require('./models/Equipe'),
    require('./models/FuncionarioEquipe'),
    require('./models/CategoriaServico'),
    require('./models/Servico'),
    require('./models/Agendamento'),
    require('./models/AgendamentoServico'),
  ],
});

module.exports = AppDataSource;
