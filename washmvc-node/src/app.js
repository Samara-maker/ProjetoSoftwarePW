require('dotenv').config();
const express        = require('express');
const path           = require('path');
const session        = require('express-session');
const flash          = require('connect-flash');
const methodOverride = require('method-override');
const AppDataSource  = require('./database');

const app = express();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(session({
  secret: 'washmvc-secret',
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

// Routes
app.use('/',            require('./routes/home'));
app.use('/clientes',    require('./routes/clientes'));
app.use('/funcionarios',require('./routes/funcionarios'));
app.use('/equipes',     require('./routes/equipes'));
app.use('/categorias',  require('./routes/categorias'));
app.use('/servicos',    require('./routes/servicos'));
app.use('/agendamentos',require('./routes/agendamentos'));

// Start
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Banco de dados conectado');
    app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ Erro ao conectar com o banco:', err.message);
    process.exit(1);
  });
