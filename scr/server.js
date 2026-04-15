const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.redirect('/clientes');
});

app.get('/clientes', async (req, res) => {
  const [clientes] = await db.query("SELECT * FROM clientes");
  res.render('clientes/lista', { clientes });
});

app.get('/clientes/novo', (req, res) => {
  res.render('clientes/novo');
});

app.post('/clientes', async (req, res) => {
  const { nome, cpf } = req.body;

  await db.query(
    "INSERT INTO clientes (nome, cpf) VALUES (?, ?)",
    [nome, cpf]
  );

  res.redirect('/clientes');
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});