const { Pool } = require('pg');
const pool = require('./database');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const query = 'SELECT * FROM stations';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao obter as estações', error);
    res.status(500).json({ message: 'Erro ao obter as estações' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const query = 'SELECT * FROM stations WHERE id = $1';
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Estação não encontrada' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao obter a estação', error);
    res.status(500).json({ message: 'Erro ao obter a estação' });
  }
});

router.post('/', async (req, res) => {
  const { id, name, location } = req.body;

  if (!id || !name || !location) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const query = 'INSERT INTO stations (id, name, location) VALUES ($1, $2, $3)';
    await pool.query(query, [id, name, location]);
    res.status(201).json({ message: 'Estação criada com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar a estação', error);
    res.status(500).json({ message: 'Erro ao adicionar a estação' });
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, location } = req.body;

  try {
    const query = 'UPDATE stations SET name = $1, location = $2 WHERE id = $3';
    await pool.query(query, [name, location, id]);

    res.json({ message: 'Estação atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar a estação', error);
    res.status(500).json({ message: 'Erro ao atualizar a estação' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const query = 'DELETE FROM stations WHERE id = $1';
    await pool.query(query, [id]);

    res.json({ message: 'Estação removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover a estação', error);
    res.status(500).json({ message: 'Erro ao remover a estação' });
  }
});

module.exports = router;
