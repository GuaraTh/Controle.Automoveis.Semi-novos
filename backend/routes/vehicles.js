const express = require('express');
const mysql = require('mysql2/promise');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Pool de conexões
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'controle_automoveis',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

// GET /api/vehicles/:id - Obter veículo específico
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM vehicles WHERE id = ?', [id]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Veículo não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao obter veículo:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// POST /api/vehicles - Criar veículo
router.post('/', authenticateToken, async (req, res) => {
  const { placa, modelo, motor, observacoes } = req.body;

  if (!placa || !modelo) {
    return res.status(400).json({ message: 'Placa e modelo são obrigatórios' });
  }

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO vehicles (placa, modelo, motor, observacoes) VALUES (?, ?, ?, ?)',
      [placa, modelo, motor || '', observacoes || '']
    );
    connection.release();
    res.status(201).json({ id: result.insertId, message: 'Veículo criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// PUT /api/vehicles/:id - Atualizar veículo
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { placa, modelo, motor, observacoes } = req.body;

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE vehicles SET placa = ?, modelo = ?, motor = ?, observacoes = ? WHERE id = ?',
      [placa, modelo, motor, observacoes, id]
    );
    connection.release();
    res.json({ message: 'Veículo atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// DELETE /api/vehicles/:id - Deletar veículo
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    await connection.execute('DELETE FROM vehicles WHERE id = ?', [id]);
    connection.release();
    res.json({ message: 'Veículo deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar veículo:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;