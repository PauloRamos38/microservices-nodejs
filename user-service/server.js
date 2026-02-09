const express = require('express');

const app = express();
app.use(express.json());

// Banco de dados simulado em memoria
let users = [
  { id: 1, name: 'Joao Silva', email: 'joao@example.com' },
  { id: 2, name: 'Maria Souza', email: 'maria@example.com' }
];

let nextId = 3;

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'User Service esta rodando!' });
});

// Listar todos os usuarios
app.get('/users', (req, res) => {
  res.json(users);
});

// Buscar usuario por ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'Usuario nao encontrado' });
  }
  res.json(user);
});

// Criar novo usuario
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email sao obrigatorios' });
  }

  const newUser = {
    id: nextId++,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Atualizar usuario
app.put('/users/:id', (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario nao encontrado' });
  }

  users[userIndex] = { ...users[userIndex], name, email };
  res.json(users[userIndex]);
});

// Deletar usuario
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario nao encontrado' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`User Service rodando na porta ${PORT}`);
});