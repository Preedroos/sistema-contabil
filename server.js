import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com SQLite
const db = new sqlite3.Database('./database.db');

// Criar tabelas (se não existirem)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS atividades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      titulo TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Pendente',
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
  `);
});

// Rota de login simples
app.post('/login', (req, res) => {
  const { email } = req.body; // podemos usar apenas email por enquanto
  db.get('SELECT * FROM usuarios WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json(err);
    if (!row) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(row); // retorna dados do usuário
  });
});

// Rota backend de cadastro de usuário
app.post('/register', (req, res) => {
  const { nome, email } = req.body;
  db.run(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email],
    function(err) {
      if (err) return res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
      res.json({ id: this.lastID, nome, email });
    }
  );
});

// Rotas de atividades
app.get('/atividades', (req, res) => {
  db.all('SELECT * FROM atividades', (err, rows) => {
    if (err) res.status(500).json(err);
    else res.json(rows);
  });
});

app.post('/atividades', (req, res) => {
  const { usuario_id, titulo, status } = req.body;
  db.run(
    'INSERT INTO atividades (usuario_id, titulo, status) VALUES (?, ?, ?)',
    [usuario_id, titulo, status || 'Pendente'],
    function(err) {
      if (err) res.status(500).json(err);
      else res.json({ id: this.lastID });
    }
  );
});

app.put('/atividades/:id', (req, res) => {
  const { titulo, status } = req.body;
  db.run(
    'UPDATE atividades SET titulo = ?, status = ? WHERE id = ?',
    [titulo, status, req.params.id],
    function(err) {
      if (err) res.status(500).json(err);
      else res.json({ changes: this.changes });
    }
  );
});

app.delete('/atividades/:id', (req, res) => {
  db.run('DELETE FROM atividades WHERE id = ?', [req.params.id], function(err) {
    if (err) res.status(500).json(err);
    else res.json({ changes: this.changes });
  });
});

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});
