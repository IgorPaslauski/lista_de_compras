//cria um servidor express, com endpoint para login e rigister em um banco postgres

const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'listadecompras',
    password: '123456',
    port: 5432,
});

app.use(express.json());

app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const user = await pool.query('INSERT INTO usuarios (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
        res.json(user.rows[0]);
    }
    catch (err) {
        console.error(err.message);
    }
}

);

app.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND password = $2', [email, password]);
        if (user.rows.length > 0) {
            res.json(user.rows[0]);
        }
        else {
            res.json('User not found');
        }
    }
    catch (err) {
        console.error(err.message);
    }
});

app.get('/', async (req, res) => {
    try {
        const allUsers = await pool.query('SELECT * FROM usuarios');
        res.json(allUsers.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.listen(80, () => {
    console.log('App running on port 80.');
});