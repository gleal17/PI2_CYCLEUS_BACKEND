const pool = require('./database');

let users = [];

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const users = require('./users');

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  res.json(user);
});


app.post('/users', (req, res) => {
    const { id, name, email } = req.body;
  
    if (!id || !name || !email) {
      return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
    }
  
    const newUser = { id, name, email };
    users.push(newUser);
  
    res.status(201).json({ message: 'Usuário criado com sucesso' });
  });

  app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
  
    const userIndex = users.findIndex(user => user.id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    users[userIndex] = { id, name, email };
  
    res.json({ message: 'Usuário atualizado com sucesso' });
  });

  app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
  
    const userIndex = users.findIndex(user => user.id === id);
  
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
  
    users.splice(userIndex, 1);
  
    res.json({ message: 'Usuário removido com sucesso' });
  });
  
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

  module.exports = users;