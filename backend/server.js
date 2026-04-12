const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../views')));

// подключение к PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auth_project',
  password: '1234',
  port: 5432,
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2)',
      [email, hashedPassword]
    );

    res.json({ message: 'Пользователь создан' });

  } catch (err) {
    console.error('ОШИБКА РЕГИСТРАЦИИ:', err); // ← ВАЖНО
    res.status(500).json({ error: 'Ошибка регистрации' });
  }
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Пользователь не найден' });
      
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Неверный пароль' });
    }

    res.json({ message: 'Успешный вход' });
  } catch (err) {
    res.status(500).json({ error: 'Ошибка входа' });
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на http://localhost:3000');
});